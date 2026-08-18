// 打包入口: 聚合 app + Blob 适配, 输出到 functions/index.js
import { createBlobKv } from './src/blob-kv';
import app from './src/index';

export { app, createBlobKv };
