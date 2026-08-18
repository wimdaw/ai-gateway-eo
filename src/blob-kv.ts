// Blob 存储的 KV 兼容适配层
// 把 ai-gateway 的 env.KV.get/put/delete/list 映射到 EdgeOne Pages Blob。
// 在 Functions 环境内, getStore() 自动使用部署凭证, 无需申请/绑定。
import { getStore } from '@edgeone/pages-blob';

const STORE_NAME = 'ai-gateway';

// 单例 store
let _store: any = null;
function store(): any {
  if (!_store) {
    _store = getStore(STORE_NAME);
  }
  return _store;
}

export interface KvLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  list(config?: { prefix?: string }): Promise<{ keys: Array<{ key: string }> }>;
}

export function createBlobKv(): KvLike {
  return {
    async get(key: string): Promise<string | null> {
      try {
        const val = await store().get(key, { type: 'text' });
        return val as string | null;
      } catch (e: any) {
        // key 不存在时 SDK 返回 null; 其他错误抛出前先检查
        if (e && e.code === 'INVALID_KEY') return null;
        console.error('[blob-kv] get error:', e?.message || e);
        return null;
      }
    },

    async put(key: string, value: string): Promise<void> {
      try {
        await store().set(key, value);
      } catch (e: any) {
        console.error('[blob-kv] put error:', e?.message || e);
        throw e;
      }
    },

    async delete(key: string): Promise<void> {
      try {
        await store().delete(key);
      } catch (e: any) {
        console.error('[blob-kv] delete error:', e?.message || e);
      }
    },

    async list(config?: { prefix?: string }): Promise<{ keys: Array<{ key: string }> }> {
      try {
        const res = await store().list({ prefix: config?.prefix || '' });
        const blobs = (res && res.blobs) || [];
        return { keys: blobs.map((b: any) => ({ key: b.key })) };
      } catch (e: any) {
        console.error('[blob-kv] list error:', e?.message || e);
        return { keys: [] };
      }
    },
  };
}
