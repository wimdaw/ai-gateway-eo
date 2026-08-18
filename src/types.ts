// EdgeOne KV 的最小类型声明 (ef-types 不声明 KVNamespace, 参考官方模板 env.ts)
interface ListResult {
  complete: boolean;
  cursor: string;
  keys: Array<{ key: string }>;
}
interface ListKey {
  key: string;
}
declare class KVNamespace {
  put(key: string, value: string | ArrayBuffer | ArrayBufferView | ReadableStream, options?: Record<string, unknown>): Promise<void>;
  get(key: string, object?: { type: string }): Promise<string | null>;
  delete(key: string): Promise<void>;
  list(config?: { prefix?: string; limit?: number; cursor?: string }): Promise<ListResult>;
}

export interface Model {
  id: string
  enabled: boolean
}

export interface ApiKeyEntry {
  key: string
  enabled: boolean
}

export interface Provider {
  id: string
  name: string
  baseUrl: string
  apiType?: 'openai' | 'anthropic'
  apiKeys: ApiKeyEntry[]
  models: Model[]
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export interface ProxyKey {
  id: string
  key: string
  name: string
  enabled: boolean
  createdAt: string
  expiresAt?: string | null
}

export interface Session {
  username: string
  expiresAt: number
}

export interface ProxyRequestBody {
  model?: string
  messages?: Array<{ role: string; content: string }>
  [key: string]: unknown
}

export interface TestModelRequest {
  modelId: string
}

export interface CreateProviderRequest {
  id: string
  name: string
  baseUrl: string
  apiType?: 'openai' | 'anthropic'
  apiKeys?: Array<{ key: string; enabled: boolean }>
  models?: Array<{ id: string; enabled: boolean }> | string[]
  enabled?: boolean
}

export interface UpdateProviderRequest {
  name?: string
  baseUrl?: string
  apiType?: 'openai' | 'anthropic'
  apiKeys?: Array<{ key: string; enabled: boolean }>
  models?: Array<{ id: string; enabled: boolean }> | string[]
  enabled?: boolean
}

export interface CreateProxyKeyRequest {
  name?: string
  expiresIn?: string // '30d' | '90d' | '180d' | '1y' | 'forever'
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
}

export interface Env {
  KV: KVNamespace
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
  OPENCODE_MIRRORS_URL?: string
}
