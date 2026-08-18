// 单文件打包入口: app + Blob 适配 + KV 解析逻辑, 输出到 [[default]].js
import { createBlobKv } from './src/blob-kv';
import app from './src/index';

// 内存 KV 兜底
function createMemoryKv() {
  const store = new Map();
  return {
    async get(key) { return store.has(key) ? store.get(key) : null; },
    async put(key, value) { store.set(key, value); },
    async delete(key) { store.delete(key); },
    async list() { return { keys: [...store.keys()].map(k => ({ key: k })), complete: true }; },
  };
}

function makeKvCompatible(kv) {
  if (!kv || kv.__eoPatched) return kv;
  const p = { ...kv, put(k, v) { return kv.put(k, v); }, get(k, o) { try { return kv.get(k, o); } catch { return kv.get(k); } }, delete(k) { return kv.delete(k); }, list(c) { return kv.list(c); } };
  Object.defineProperty(p, '__eoPatched', { value: true, enumerable: false });
  return p;
}

function resolveKv(env) {
  const rk = env.KV || env.STORE || env.KV_STORAGE;
  if (rk) return makeKvCompatible(rk);
  try { console.warn('[ai-gateway] Using Pages Blob storage.'); return createBlobKv(); } catch (e) { console.warn('[ai-gateway] Blob fallback to memory:', e && e.message); }
  return createMemoryKv();
}

function onRequest(context) {
  const env = context.env || {};
  env.KV = resolveKv(env);
  try { return app.fetch(context.request, env); } catch (err) {
    return new Response(JSON.stringify({ error: { message: 'Internal: ' + String(err && err.message || err) } }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}

export { onRequest };
