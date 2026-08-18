// EdgeOne Pages Functions 默认路由 (catch-all)
// 把 ai-gateway 的 Hono app 挂载到 EdgeOne 运行时。
// EdgeOne 入口: export function onRequest(context) => Response
// context.env 含 KV namespace 绑定(由控制台绑定, 绑定名可配置) 与 vars。

import app from '../src/index';

// 内存 KV 兜底: 当控制台未绑定 KV namespace 时, 用进程内 Map 模拟,
// 保证项目能启动运行 (数据不持久, 重启即失)。绑定 KV 后自动用真实 KV。
function createMemoryKv(): any {
  const store = new Map<string, string>();
  return {
    async get(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    async put(key: string, value: string) {
      store.set(key, value);
    },
    async delete(key: string) {
      store.delete(key);
    },
    async list() {
      return { keys: [...store.keys()].map((k) => ({ key: k })), complete: true };
    },
  };
}

// EdgeOne KV 的 put 签名可能不支持 Cloudflare 的 { expirationTtl } 选项。
// 这里对 KV 做一层兼容包装:
//  - put 时剥离 expirationTtl (会话过期已由 getSession 的 expiresAt 逻辑兜底)
//  - get 时剥离 { type } 选项中的未知值, 只传 'text' (默认)
function makeKvCompatible(kv: any): any {
  if (!kv) return kv;
  if (kv.__eoPatched) return kv;
  const patched = {
    ...kv,
    put(key: string, value: any, options?: any) {
      // 剥离 expirationTtl: EdgeOne put 只接受 (key, value)
      return kv.put(key, value);
    },
    get(key: string, options?: any) {
      // EdgeOne get 只接受 { type: 'text'|'json'|'arrayBuffer'|'stream' }
      // 默认 text; 若上层传了不支持的类型, 回退 text
      try {
        return kv.get(key, options);
      } catch (e) {
        return kv.get(key);
      }
    },
    delete(key: string) {
      return kv.delete(key);
    },
    list(config?: any) {
      return kv.list(config);
    },
  };
  Object.defineProperty(patched, '__eoPatched', { value: true, enumerable: false });
  return patched;
}

// 解析 KV: 优先真实绑定, 否则内存兜底
function resolveKv(env: Record<string, any>): any {
  let kv = env.KV || env.STORE || env.KV_STORAGE;
  if (kv) {
    return makeKvCompatible(kv);
  }
  console.warn('[ai-gateway] KV binding not found (KV/STORE/KV_STORAGE). Using in-memory fallback.');
  return createMemoryKv();
}

export function onRequest(context: {
  request: Request;
  params: Record<string, string>;
  env: Record<string, any>;
}): Response | Promise<Response> {
  const env = context.env || {};
  env.KV = resolveKv(env);

  try {
    return app.fetch(context.request, env);
  } catch (err: any) {
    console.error('[ai-gateway] unhandled error:', err);
    return new Response(
      JSON.stringify({ error: { message: '服务器内部错误: ' + String(err?.message || err), type: 'server_error' } }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
