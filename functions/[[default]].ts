// EdgeOne Pages Functions 默认路由 (catch-all)
// 入口: export function onRequest(context) => Response
// app 与 blob 适配均来自预打包的 bundle (index.js)

import { app, createBlobKv } from './index.js';

// 内存 KV 兜底: Blob 与 KV 都不可用时, 用进程内 Map 模拟 (数据不持久)
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
function makeKvCompatible(kv: any): any {
  if (!kv) return kv;
  if (kv.__eoPatched) return kv;
  const patched = {
    ...kv,
    put(key: string, value: any, options?: any) {
      return kv.put(key, value);
    },
    get(key: string, options?: any) {
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

// 解析 KV: 真实 KV 绑定 → Blob 存储(开箱即用) → 内存兜底
function resolveKv(env: Record<string, any>): any {
  const realKv = env.KV || env.STORE || env.KV_STORAGE;
  if (realKv) {
    return makeKvCompatible(realKv);
  }
  try {
    console.warn('[ai-gateway] Using Pages Blob as storage backend.');
    return createBlobKv();
  } catch (e: any) {
    console.warn('[ai-gateway] Blob unavailable, falling back to in-memory:', e?.message || e);
  }
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
