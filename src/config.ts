import type { Provider } from './types'

export const SITE_CONFIG = {
  title: 'AI Gateway',
  subtitle: '统一的 AI 管理平台',
  author: 'QingYun',
  authorUrl: 'https://github.com/yutian81/ai-gateway',
  blogUrl: 'https://blog.notett.com',
  description: 'AI 提供商 API 代理网关 — 统一 /v1 接口转发',
  favicon: 'https://pan.811520.xyz/icon/ai.webp',
  faCdn: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
}

export const SESSION_TTL = 7 * 24 * 60 * 60

export const PROXY_KEY_PREFIX = 'sk_cf_'

export const OPENCODE_DEFAULT_URL = 'https://opencode.ai/zen/v1'

// Key 降权后自动恢复的冷却时间 (毫秒)
export const KEY_HEALTH_COOLDOWN_MS = 5 * 60 * 1000

// 连续失败多少次后降权
export const KEY_HEALTH_MAX_FAILURES = 5

export const KV_KEYS = {
  PROVIDERS: 'providers',
  PROXY_KEYS: 'proxy:keys',
  SESSION_PREFIX: 'admin:session:',
  KEY_HEALTH_PREFIX: 'key:health:',
  OPENCODE_MIGRATION: 'migration:opencode-default:v1',
} as const

// 有效期选项（秒）
export const EXPIRY_OPTIONS: Record<string, number | null> = {
  '30d': 30 * 24 * 60 * 60,
  '90d': 90 * 24 * 60 * 60,
  '180d': 180 * 24 * 60 * 60,
  '1y': 365 * 24 * 60 * 60,
  'forever': null,
}

const now = () => new Date().toISOString()

export const DEFAULT_PROVIDERS: Provider[] = [
  // ===== OpenCode 免费网关 (免 key, 含 CDN 镜像) =====
  {
    id: 'opencode',
    name: 'OpenCode (Free)',
    baseUrl: 'https://opencode.ai/zen/v1',
    apiType: 'openai',
    apiKeys: [],
    models: [
      { id: 'big-pickle', enabled: true },
      { id: 'deepseek-v4-flash-free', enabled: true },
      { id: 'hy3-free', enabled: true },
      { id: 'laguna-s-2.1-free', enabled: true },
      { id: 'mimo-v2.5-free', enabled: true },
      { id: 'nemotron-3-ultra-free', enabled: true },
      { id: 'nemotron-3.5-lightning-free', enabled: true },
    ],
    enabled: true,
    createdAt: now(),
    updatedAt: now(),
  },
  // ===== Kilo Gateway 免费后端 (Kilo Code 官方网关, 免 key) =====
  {
    id: 'kilo',
    name: 'Kilo Gateway (Free)',
    baseUrl: 'https://api.kilo.ai/api/gateway',
    apiType: 'openai',
    apiKeys: [],
    models: [
      { id: 'kilo-auto/free', enabled: true },
      { id: 'cohere/north-mini-code:free', enabled: true },
      { id: 'dots-studio/dots-3-note-preview:free', enabled: true },
      { id: 'liquid/lfm-2.5-2.6b:free', enabled: true },
      { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', enabled: true },
      { id: 'nvidia/nemotron-3-super-120b-a12b:free', enabled: true },
      { id: 'nvidia/nemotron-3-ultra-550b-a55b:free', enabled: true },
      { id: 'nvidia/nemotron-3.5-content-safety:free', enabled: true },
      { id: 'nvidia/nemotron-3.5-lightning:free', enabled: true },
      { id: 'poolside/laguna-s-2.1:free', enabled: true },
      { id: 'poolside/laguna-xs-2.1:free', enabled: true },
      { id: 'stepfun/step-3.7-flash:free', enabled: true },
      { id: 'tencent/hy3:free', enabled: true },
    ],
    enabled: true,
    createdAt: now(),
    updatedAt: now(),
  },
  // ===== Azure TTS 免费语音 (微软 Edge 在线语音, 免 key) =====
  {
    id: 'azure-tts',
    name: 'Azure TTS (Free)',
    baseUrl: 'https://speech.platform.bing.com',
    apiType: 'openai',
    apiKeys: [],
    models: [
      { id: 'azure-tts', enabled: true },
    ],
    enabled: true,
    createdAt: now(),
    updatedAt: now(),
  },
]
