// EdgeOne Pages Functions 默认路由 (catch-all)
// 把 ai-gateway 的 Hono app 挂载到 EdgeOne 运行时。
// EdgeOne 入口: export function onRequest(context) => Response
// context.env 含 KV namespace 绑定(由控制台绑定, 绑定名可配置) 与 vars。

import app from '../src/index';

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

export function onRequest(context: {
  request: Request;
  params: Record<string, string>;
  env: Record<string, any>;
}): Response | Promise<Response> {
  const env = context.env || {};

  // 归一化 KV binding: 支持 KV / STORE / KV_STORAGE 三种绑定名
  if (!env.KV) {
    const kvBinding = env.STORE || env.KV_STORAGE;
    if (kvBinding) {
      env.KV = makeKvCompatible(kvBinding);
    }
  } else {
    env.KV = makeKvCompatible(env.KV);
  }

  return app.fetch(context.request, env);
}
