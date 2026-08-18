
      let global = globalThis;
      globalThis.global = globalThis;

      if (typeof global.navigator === 'undefined') {
        global.navigator = {
          userAgent: 'edge-runtime',
          language: 'en-US',
          languages: ['en-US'],
        };
      } else {
        if (typeof global.navigator.language === 'undefined') {
          global.navigator.language = 'en-US';
        }
        if (!global.navigator.languages || global.navigator.languages.length === 0) {
          global.navigator.languages = [global.navigator.language];
        }
        if (typeof global.navigator.userAgent === 'undefined') {
          global.navigator.userAgent = 'edge-runtime';
        }
      }

      class MessageChannel {
        constructor() {
          this.port1 = new MessagePort();
          this.port2 = new MessagePort();
        }
      }
      class MessagePort {
        constructor() {
          this.onmessage = null;
        }
        postMessage(data) {
          if (this.onmessage) {
            setTimeout(() => this.onmessage({ data }), 0);
          }
        }
      }
      global.MessageChannel = MessageChannel;

      '__MIDDLEWARE_BUNDLE_CODE__'

      function recreateRequest(request, overrides = {}) {
        const cloned = typeof request.clone === 'function' ? request.clone() : request;
        const headers = new Headers(cloned.headers);

        if (overrides.headerPatches) {
          Object.keys(overrides.headerPatches).forEach((key) => {
            const value = overrides.headerPatches[key];
            if (value === null || typeof value === 'undefined') {
              headers.delete(key);
            } else {
              headers.set(key, value);
            }
          });
        }

        if (overrides.headers) {
          const extraHeaders = new Headers(overrides.headers);
          extraHeaders.forEach((value, key) => headers.set(key, value));
        }

        const url = overrides.url || cloned.url;
        const method = overrides.method || cloned.method || 'GET';
        const canHaveBody = method && method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD';
        const body = overrides.body !== undefined ? overrides.body : canHaveBody ? cloned.body : undefined;

        // 如果rewrite传入的是完整URL（第三方地址），需要更新host
        if (overrides.url) {
          try {
            const newUrl = new URL(overrides.url, cloned.url);
            // 只有当新URL是绝对路径（包含协议和host）时才更新host
            if (overrides.url.startsWith('http://') || overrides.url.startsWith('https://')) {
              headers.set('host', newUrl.host);
            }
            // 相对路径时保持原有host不变
          } catch (e) {
            // URL解析失败时保持原有host
          }
        }

        const init = {
          method,
          headers,
          redirect: cloned.redirect,
          credentials: cloned.credentials,
          cache: cloned.cache,
          mode: cloned.mode,
          referrer: cloned.referrer,
          referrerPolicy: cloned.referrerPolicy,
          integrity: cloned.integrity,
          keepalive: cloned.keepalive,
          signal: cloned.signal,
        };

        if (canHaveBody && body !== undefined) {
          init.body = body;
        }

        if ('duplex' in cloned) {
          init.duplex = cloned.duplex;
        }

        return new Request(url, init);

      }

      

      function usercode(ev, hookCtx) {
        hookCtx = hookCtx || { fetch: globalThis.fetch };
        const { fetch } = hookCtx;
        const globalthis = hookCtx;
        "use strict";
        // ↓ 用户原始代码
        return (async function handleRequest(context) {
          let routeParams = {};
          let pagesFunctionResponse = null;
          let request = context.request;
          const waitUntil = context.waitUntil;
          let urlInfo = new URL(request.url);
          const eo = request.eo || {};


          const normalizePathname = () => {
            if (urlInfo.pathname !== '/' && urlInfo.pathname.endsWith('/')) {
              urlInfo.pathname = urlInfo.pathname.slice(0, -1);
            }
          };

          function getSuffix(pathname = '') {
            // Use a regular expression to extract the file extension from the URL
            const suffix = pathname.match(/\.([^\.]+)$/);
            // If an extension is found, return it, otherwise return an empty string
            return suffix ? '.' + suffix[1] : null;
          }

          normalizePathname();

          let matchedFunc = false;

          
        const runEdgeFunctions = () => {
          
          if(!matchedFunc && /^\/(.+?)$/.test(urlInfo.pathname)) {
            routeParams = {"id":"default","mode":2,"left":"/"};
            matchedFunc = true;
            "use strict";
(() => {
  // functions/index.js
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var require_dist = __commonJS({
    "node_modules/@edgeone/pages-blob/dist/index.js"(exports, module) {
      "use strict";
      var U = Object.defineProperty;
      var le = Object.getOwnPropertyDescriptor;
      var ue = Object.getOwnPropertyNames;
      var ge = Object.prototype.hasOwnProperty;
      var fe = (t, e) => {
        for (var r in e)
          U(t, r, { get: e[r], enumerable: true });
      };
      var he = (t, e, r, n) => {
        if (e && typeof e == "object" || typeof e == "function")
          for (let s of ue(e))
            !ge.call(t, s) && s !== r && U(t, s, { get: () => e[s], enumerable: !(n = le(e, s)) || n.enumerable });
        return t;
      };
      var me = (t) => he(U({}, "__esModule", { value: true }), t);
      var Oe = {};
      fe(Oe, { InvalidKeyError: () => w, InvalidStoreNameError: () => y, MissingProjectIdError: () => T, PagesBlobError: () => h, PreconditionFailedError: () => x, QuotaExceededError: () => O, RateLimitedError: () => j, Store: () => E, getStore: () => Me, listStores: () => De });
      module.exports = me(Oe);
      var h = class extends Error {
        code;
        constructor(e, r) {
          super(`PagesBlob: ${r}`), this.name = "PagesBlobError", this.code = e;
        }
      };
      var w = class extends h {
        constructor(e) {
          super("INVALID_KEY", e);
        }
      };
      var y = class extends h {
        constructor(e) {
          super("INVALID_STORE_NAME", e);
        }
      };
      var b = class extends h {
        constructor(e) {
          super("MISSING_ENVIRONMENT", `Environment not configured for Pages Blob. Missing: ${e.join(", ")}. Supply these properties when creating a store, or ensure the function is running in a Pages environment.`);
        }
      };
      var O = class extends h {
        constructor() {
          super("QUOTA_EXCEEDED", "storage quota exceeded");
        }
      };
      var j = class extends h {
        constructor() {
          super("RATE_LIMITED", "request rate limited, please retry later");
        }
      };
      var T = class extends h {
        constructor() {
          super("MISSING_PROJECT_ID", "projectId is required when using API token mode. Please supply { name, projectId, token } to getStore() / listStores().");
        }
      };
      var m = class extends h {
        constructor(e) {
          super("CREDENTIAL_ERROR", e);
        }
      };
      var f = class extends h {
        constructor(e, r) {
          super("COS_ERROR", `COS returned ${e}: ${r}`);
        }
      };
      var x = class extends h {
        constructor() {
          super("PRECONDITION_FAILED", "conditional write failed (key already exists)");
        }
      };
      function C(t) {
        if (t === "")
          throw new w("Blob key must not be empty.");
        if (t.startsWith("/") || t.startsWith("%2F"))
          throw new w("Blob key must not start with forward slash (/).");
        if (new TextEncoder().encode(t).length > 600)
          throw new w("Blob key must be a sequence of Unicode characters whose UTF-8 encoding is at most 600 bytes long.");
      }
      function z(t) {
        if (t === "")
          throw new y("Store name must not be empty.");
        if (t.includes("/") || t.includes(":"))
          throw new y("Store name must not contain forward slashes (/) or colons (:).");
        if (!/^[a-zA-Z0-9_-]+$/.test(t))
          throw new y("Store name must only contain letters, digits, underscores, and hyphens.");
        if (new TextEncoder().encode(t).length > 64)
          throw new y("Store name must be a sequence of Unicode characters whose UTF-8 encoding is at most 64 bytes long.");
      }
      var E = class {
        cosClient;
        storeName;
        defaultConsistency;
        constructor(e, r, n = "eventual") {
          this.cosClient = e, this.storeName = r, this.defaultConsistency = n;
        }
        resolveConsistency(e) {
          return e ?? this.defaultConsistency;
        }
        async set(e, r, n) {
          C(e);
          let s = await this.cosClient.putObject(this.storeName, e, r, { onlyIfNew: n?.onlyIfNew, cacheControl: n?.cacheControl });
          if (n?.onlyIfNew && s.statusCode === 412)
            throw new x();
        }
        async setJSON(e, r, n) {
          C(e);
          let s = JSON.stringify(r), i = await this.cosClient.putObject(this.storeName, e, s, { onlyIfNew: n?.onlyIfNew, contentType: "application/json", cacheControl: n?.cacheControl });
          if (n?.onlyIfNew && i.statusCode === 412)
            throw new x();
        }
        async createUploadUrl(e, r) {
          C(e);
          let { url: n, expiresAt: s } = await this.cosClient.createPresignedPutUrl(this.storeName, e, { expireSeconds: r?.expireSeconds, contentType: r?.contentType });
          return { url: n, key: e, expiresAt: s };
        }
        async get(e, r) {
          C(e);
          let n = this.resolveConsistency(r?.consistency), s = await this.cosClient.getObject(this.storeName, e, n);
          if (s === null)
            return null;
          let { body: i } = s, a = r?.type ?? "text", o = new TextDecoder("utf-8");
          switch (a) {
            case "text":
              return o.decode(i);
            case "json":
              return JSON.parse(o.decode(i));
            case "arrayBuffer":
              return i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength);
            case "blob":
              return new Blob([i]);
            case "stream":
              return new ReadableStream({ start(c) {
                c.enqueue(i), c.close();
              } });
            default:
              return o.decode(i);
          }
        }
        async getMetadata(e, r) {
          C(e);
          let n = this.resolveConsistency(r?.consistency);
          return this.cosClient.headObject(this.storeName, e, n);
        }
        async getWithHeaders(e, r) {
          C(e);
          let n = this.resolveConsistency(r?.consistency), s = await this.cosClient.getObject(this.storeName, e, n);
          return s ? { body: new TextDecoder("utf-8").decode(s.body), headers: s.headers || {} } : null;
        }
        async delete(e) {
          C(e), await this.cosClient.deleteObject(this.storeName, e);
        }
        async list(e) {
          let r = e?.paginate !== false, n = e?.limit, s = [], i = [], a = this.resolveConsistency(e?.consistency), o = e?.cursor || "", c = true, d;
          for (; c; ) {
            let u = n !== void 0 ? n - s.length : 1e3, l = Math.min(u, 1e3);
            if (l <= 0)
              break;
            let g = await this.cosClient.listObjects(this.storeName, { prefix: e?.prefix, delimiter: e?.directories ? "/" : void 0, marker: o || void 0, maxKeys: l, consistency: a });
            for (let p of g.contents)
              s.push({ key: p.key, etag: p.etag });
            i.push(...g.commonPrefixes), n !== void 0 && s.length >= n ? (s.length = n, (g.isTruncated || g.contents.length === l) && (d = g.nextMarker), c = false) : g.isTruncated ? !r && n === void 0 ? (d = g.nextMarker, c = false) : o = g.nextMarker : c = false;
          }
          return { blobs: s, directories: i, ...d ? { cursor: d } : {} };
        }
      };
      var ye = new TextEncoder();
      function _(t) {
        let e = ye.encode(t), r = new ArrayBuffer(e.byteLength), n = new Uint8Array(r);
        return n.set(e), n;
      }
      function G(t) {
        let e = t instanceof Uint8Array ? t : new Uint8Array(t), r = "";
        for (let n = 0; n < e.length; n++)
          r += e[n].toString(16).padStart(2, "0");
        return r;
      }
      async function H2(t, e) {
        let r = await crypto.subtle.importKey("raw", _(t), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]), n = await crypto.subtle.sign("HMAC", r, _(e));
        return G(n);
      }
      async function pe(t) {
        let e = await crypto.subtle.digest("SHA-1", _(t));
        return G(e);
      }
      function $(t) {
        return encodeURIComponent(t).replace(/[!'()*]/g, (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase());
      }
      function P(t) {
        try {
          return decodeURIComponent(t);
        } catch {
          return t;
        }
      }
      function we(t) {
        return t.split("/").map((e) => P(e)).join("/");
      }
      function I(t) {
        return we(P(t));
      }
      function W(t) {
        return t.split("/").map((e) => $(P(e))).join("/");
      }
      var Ce = /* @__PURE__ */ new Set(["cache-control", "content-disposition", "content-encoding", "content-length", "content-md5", "content-type", "expect", "expires", "if-match", "if-modified-since", "if-none-match", "if-unmodified-since", "origin", "range", "transfer-encoding"]);
      function xe(t) {
        return t === "host" || t === "x-cos-security-token" ? false : !!(Ce.has(t) || t.startsWith("x-cos-"));
      }
      function X(t) {
        if (!t)
          return [];
        let e = [];
        for (let [r, n] of Object.entries(t))
          n != null && e.push([r.toLowerCase(), String(n)]);
        return e.sort(([r], [n]) => r < n ? -1 : r > n ? 1 : 0), e;
      }
      function Y(t) {
        return t.map(([e, r]) => `${$(e)}=${$(r)}`).join("&");
      }
      function F(t) {
        return t.map(([e]) => $(e)).join(";");
      }
      async function V(t) {
        let e = t.method.toLowerCase(), r = t.pathname.startsWith("/") ? t.pathname : `/${t.pathname}`, n = Math.floor(Date.now() / 1e3), s = n + (t.expireSeconds ?? 3600), i = `${n};${s}`, o = X(t.headers).filter(([N]) => xe(N)), c = F(o), d = Y(o), u = X(t.query), l = F(u), g = Y(u), p = `${e}
${r}
${g}
${d}
`, oe = `sha1
${i}
${await pe(p)}
`, ie = await H2(t.secretKey, i), ae = await H2(ie, oe), ce = ["q-sign-algorithm=sha1", `q-ak=${t.secretId}`, `q-sign-time=${i}`, `q-key-time=${i}`, `q-header-list=${c}`, `q-url-param-list=${l}`, `q-signature=${ae}`].join("&"), q = {};
        for (let [N, de] of o)
          q[N] = de;
        return { authorization: ce, signedHeaders: q };
      }
      async function J(t) {
        let e = new URL(t.domain), r = P(t.key), n = `/${I(t.key)}`, s = `/${W(r)}`;
        e.pathname = s;
        let { authorization: i } = await V({ method: t.method, pathname: n, query: t.query, headers: t.headers, secretId: t.credential.secretId, secretKey: t.credential.secretKey, expireSeconds: t.expireSeconds });
        if (t.query)
          for (let [a, o] of Object.entries(t.query))
            o != null && e.searchParams.set(a, String(o));
        for (let a of i.split("&")) {
          let o = a.indexOf("=");
          if (o === -1)
            continue;
          let c = a.slice(0, o), d = a.slice(o + 1);
          e.searchParams.set(c, d);
        }
        return t.credential.sessionToken && e.searchParams.set("x-cos-security-token", t.credential.sessionToken), e.toString();
      }
      async function S(t) {
        let e = new URL(t.domain), r = t.key ? P(t.key) : "", n = t.key ? `/${I(t.key)}` : "/", s = r ? `/${W(r)}` : "/";
        if (e.pathname = s, t.query)
          for (let [l, g] of Object.entries(t.query))
            g != null && e.searchParams.set(l, String(g));
        let { authorization: i } = await V({ method: t.method, pathname: n, query: t.query, headers: t.headers, secretId: t.credential.secretId, secretKey: t.credential.secretKey }), a = new Headers();
        if (t.headers)
          for (let [l, g] of Object.entries(t.headers))
            g != null && a.set(l, String(g));
        a.set("Authorization", i), t.credential.sessionToken && a.set("x-cos-security-token", t.credential.sessionToken);
        let o = e.toString(), c = { method: t.method, headers: a, body: t.body ?? void 0, signal: t.signal }, d = 2, u;
        for (let l = 0; l <= d; l++)
          try {
            return await fetch(o, c);
          } catch (g) {
            if (u = g, g instanceof DOMException && g.name === "AbortError")
              throw g;
            l < d && await new Promise((p) => setTimeout(p, 1e3 * (l + 1)));
          }
        throw u;
      }
      var be = "blob.edgeone.site";
      var Te = "blob-nocache.edgeone.site";
      var M = class t {
        credentialManager;
        bucket = "";
        region = "";
        keyPrefix = "";
        cachedDomain = "";
        uncachedDomain = "";
        initialized = false;
        static buildErrorDetail(e, r, n, s, i) {
          let a = n ? `${r}/${n}` : r, o = i ? ` [request-id: ${i}]` : "";
          return `${e} ${a} - ${Ee(s)}${o}`;
        }
        constructor(e) {
          this.credentialManager = e;
        }
        computeSubdomain(e) {
          let r = [];
          if (e.appId && r.push(e.appId), e.zoneId && r.push(e.zoneId), e.projectId && r.push(e.projectId), r.length >= 2)
            return r.join("-");
          if (e.resourcePrefix) {
            let s = e.resourcePrefix.replace(/\/?\*$/, "").split("/").filter(Boolean);
            if (s.length >= 2)
              return s.slice(0, Math.min(s.length, 3)).join("-");
          }
          return "";
        }
        async ensureInitialized() {
          if (this.initialized)
            return;
          let e = await this.credentialManager.getCredential();
          !this.keyPrefix && e.resourcePrefix && (this.keyPrefix = e.resourcePrefix.replace(/\/?\*$/, ""));
          let r = e.edgeRegion === "CN", n = e.cosMainland, s = e.cosOverseas, i = r ? n || s : s || n;
          !this.bucket && i && (this.bucket = i.bucket, this.region = i.region);
          let a = this.computeSubdomain(e);
          if (!a)
            throw new f(0, "unable to derive tenant subdomain from credential; missing appId/zoneId/projectId or resourcePrefix");
          this.cachedDomain = `https://${a}.${be}`, this.uncachedDomain = `https://${a}.${Te}`, this.initialized = true;
        }
        async resolveDomain(e) {
          return await this.ensureInitialized(), e === "strong" ? this.uncachedDomain : this.cachedDomain;
        }
        async resolveCredential() {
          let e = await this.credentialManager.getCredential();
          return { secretId: e.tmpSecretId, secretKey: e.tmpSecretKey, sessionToken: e.sessionToken };
        }
        buildCosKey(e, r) {
          return `${this.keyPrefix}/${e}/${r}`;
        }
        async getDomains() {
          return await this.ensureInitialized(), { cached: this.cachedDomain, uncached: this.uncachedDomain };
        }
        async putObject(e, r, n, s) {
          let i = await this.resolveDomain("strong"), a = await this.resolveCredential(), o = this.buildCosKey(e, r), d = s?.cacheControl === null ? void 0 : s?.cacheControl ?? "max-age=0, stale-while-revalidate=60", u = {};
          s?.onlyIfNew && (u["If-None-Match"] = "*"), d && (u["Cache-Control"] = d), s?.contentType && (u["Content-Type"] = s.contentType);
          try {
            let l = await S({ domain: i, method: "PUT", key: o, headers: u, body: n, credential: a });
            if (l.status === 412)
              return await l.arrayBuffer().catch(() => {
              }), { etag: "", statusCode: 412 };
            if (!l.ok) {
              let p = await k(l);
              throw new f(l.status, t.buildErrorDetail("PUT", i, o, p || `status ${l.status}`, R(l)));
            }
            let g = l.headers.get("etag") || "";
            return await l.arrayBuffer().catch(() => {
            }), { etag: g, statusCode: l.status };
          } catch (l) {
            throw l instanceof f ? l : new f(0, t.buildErrorDetail("PUT", i, o, A(l)));
          }
        }
        async createPresignedPutUrl(e, r, n) {
          let s = await this.resolveDomain("strong"), i = await this.resolveCredential(), a = this.buildCosKey(e, r), o = {};
          n?.contentType && (o["Content-Type"] = n.contentType);
          let c = n?.expireSeconds ?? 3600, d = await J({ domain: s, method: "PUT", key: a, headers: o, credential: i, expireSeconds: c }), u = Math.floor(Date.now() / 1e3) + c;
          return { url: d, expiresAt: u };
        }
        async getObject(e, r, n) {
          let s = await this.resolveDomain(n), i = await this.resolveCredential(), a = this.buildCosKey(e, r);
          try {
            let o = await S({ domain: s, method: "GET", key: a, credential: i });
            if (o.status === 404)
              return await o.arrayBuffer().catch(() => {
              }), null;
            if (!o.ok) {
              let u = await k(o);
              throw new f(o.status, t.buildErrorDetail("GET", s, a, u || `status ${o.status}`, R(o)));
            }
            let c = new Uint8Array(await o.arrayBuffer()), d = Z(o.headers);
            return { body: c, contentType: d["content-type"], headers: d };
          } catch (o) {
            throw o instanceof f ? o : new f(0, t.buildErrorDetail("GET", s, a, A(o)));
          }
        }
        async headObject(e, r, n) {
          let s = await this.resolveDomain(n), i = await this.resolveCredential(), a = this.buildCosKey(e, r);
          try {
            let o = await S({ domain: s, method: "HEAD", key: a, credential: i });
            if (o.status === 404)
              return null;
            if (!o.ok) {
              let d = await k(o);
              throw new f(o.status, t.buildErrorDetail("HEAD", s, a, d || `status ${o.status}`, R(o)));
            }
            let c = Z(o.headers);
            return { cacheControl: c["cache-control"], contentType: c["content-type"], etag: c.etag, headers: c };
          } catch (o) {
            throw o instanceof f ? o : new f(0, t.buildErrorDetail("HEAD", s, a, A(o)));
          }
        }
        async deleteObject(e, r) {
          let n = await this.resolveDomain("strong"), s = await this.resolveCredential(), i = this.buildCosKey(e, r);
          try {
            let a = await S({ domain: n, method: "DELETE", key: i, credential: s });
            if (a.status === 204 || a.status === 404 || a.ok) {
              await a.arrayBuffer().catch(() => {
              });
              return;
            }
            let o = await k(a);
            throw new f(a.status, t.buildErrorDetail("DELETE", n, i, o || `status ${a.status}`, R(a)));
          } catch (a) {
            throw a instanceof f ? a : new f(0, t.buildErrorDetail("DELETE", n, i, A(a)));
          }
        }
        async listObjects(e, r) {
          await this.ensureInitialized();
          let n = `${this.keyPrefix}/${e}/`, s = r?.prefix ? n + r.prefix : n, i = await this.getBucketRaw({ prefix: s, delimiter: r?.delimiter, marker: r?.marker, maxKeys: r?.maxKeys, consistency: r?.consistency }), a = i.contents.map((c) => {
            let d = c.key, u = d.startsWith(n) ? d.slice(n.length) : d;
            return u ? { key: u, etag: c.etag } : null;
          }).filter((c) => c !== null), o = i.commonPrefixes.map((c) => c.startsWith(n) ? c.slice(n.length) : c).filter((c) => !!c);
          return { contents: a, commonPrefixes: o, isTruncated: i.isTruncated, nextMarker: i.nextMarker };
        }
        async listStores(e) {
          let r = [], n = "", s = true;
          for (; s; ) {
            await this.ensureInitialized();
            let i = `${this.keyPrefix}/`, a = await this.getBucketRaw({ prefix: i, delimiter: "/", maxKeys: 1e3, marker: n || void 0, consistency: e });
            for (let o of a.commonPrefixes) {
              let c = o.startsWith(i) ? o.slice(i.length, -1) : o.slice(0, -1);
              c && r.push(c);
            }
            if (s = a.isTruncated, n = a.nextMarker, !s || !n)
              break;
          }
          return r;
        }
        async getBucketRaw(e) {
          let r = await this.resolveDomain(e.consistency), n = await this.resolveCredential(), s = { prefix: I(e.prefix) };
          e.delimiter && (s.delimiter = e.delimiter), e.marker && (s.marker = I(e.marker)), e.maxKeys && (s["max-keys"] = e.maxKeys);
          try {
            let i = await S({ domain: r, method: "GET", query: s, credential: n });
            if (!i.ok) {
              let o = await k(i);
              throw new f(i.status, t.buildErrorDetail("LIST", r, e.prefix, o || `status ${i.status}`, R(i)));
            }
            let a = await i.text();
            return Se(a);
          } catch (i) {
            throw i instanceof f ? i : new f(0, t.buildErrorDetail("LIST", r, e.prefix, A(i)));
          }
        }
      };
      function Ee(t) {
        return t.replace(/[a-zA-Z0-9\-]+\.cos\.[a-zA-Z0-9\-.]+\.myqcloud\.com/gi, "[cos-origin]").replace(/[a-zA-Z0-9\-]+\.cos\.[a-zA-Z0-9\-.]+\.tencentcos\.cn/gi, "[cos-origin]");
      }
      async function k(t) {
        try {
          return await t.text();
        } catch {
          return "";
        }
      }
      function R(t) {
        return t.headers.get("x-cos-request-id") || t.headers.get("x-eo-log-id") || void 0;
      }
      function A(t) {
        let e = t, r = e.message || String(t), n = e.cause;
        if (n) {
          let s = n.message || n.code || "";
          return s ? `${r} (${s})` : r;
        }
        return r;
      }
      function Z(t) {
        let e = {};
        return t.forEach((r, n) => {
          e[n.toLowerCase()] = r;
        }), e;
      }
      function Se(t) {
        let e = [], r = /<Contents>([\s\S]*?)<\/Contents>/g, n;
        for (; (n = r.exec(t)) !== null; ) {
          let d = n[1], u = v(d, "Key"), l = v(d, "ETag");
          u !== null && e.push({ key: L(u), etag: l || "" });
        }
        let s = [], i = /<CommonPrefixes>([\s\S]*?)<\/CommonPrefixes>/g;
        for (; (n = i.exec(t)) !== null; ) {
          let d = n[1], u = v(d, "Prefix");
          u !== null && s.push(L(u));
        }
        let o = v(t, "IsTruncated") === "true", c = v(t, "NextMarker") || "";
        return { contents: e, commonPrefixes: s, isTruncated: o, nextMarker: L(c) };
      }
      function v(t, e) {
        let n = new RegExp(`<${e}>([\\s\\S]*?)<\\/${e}>`).exec(t);
        return n ? n[1] : null;
      }
      function L(t) {
        return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
      }
      var Pe = "X-RateLimit-Reset";
      async function B(t, e, r = 2) {
        e.signal?.throwIfAborted?.();
        try {
          let n = await fetch(t, e);
          if (r > 0 && (n.status === 429 || n.status >= 500)) {
            let s = Q(n.headers.get(Pe));
            return await ee(s, e.signal), B(t, e, r - 1);
          }
          return n;
        } catch (n) {
          if (r === 0 || n instanceof DOMException && n.name === "AbortError")
            throw n;
          let s = Q();
          return await ee(s, e.signal), B(t, e, r - 1);
        }
      }
      function Q(t) {
        return t ? Math.max(Number(t) * 1e3 - Date.now(), 500) : 1500;
      }
      function ee(t, e) {
        return new Promise((r, n) => {
          if (e?.aborted)
            return n(e.reason);
          let s = setTimeout(() => {
            e?.removeEventListener("abort", i), r();
          }, t), i = () => {
            clearTimeout(s), n(e.reason);
          };
          e?.addEventListener("abort", i, { once: true });
        });
      }
      var Ie = "prod";
      function te() {
        let t = typeof process < "u" ? process.env.PAGES_BLOB_STS_ENV : void 0;
        return t === "test" || t === "prod" ? t : Ie;
      }
      var ke = 300;
      var Re = "https://blob-sts.edgeone.site/";
      var D = class {
        authToken;
        projectId;
        cached = null;
        constructor(e, r) {
          this.authToken = e, this.projectId = r;
        }
        async getCredential() {
          if (this.cached && !this.isExpired(this.cached))
            return this.cached;
          let e = await this.fetchCredential();
          return this.cached = e, e;
        }
        clearCache() {
          this.cached = null;
        }
        isExpired(e) {
          let r = Math.floor(Date.now() / 1e3);
          return e.expiredTime - r < ke;
        }
        async fetchCredential() {
          for (let n = 1; n <= 3; n++) {
            let s = new AbortController(), i = setTimeout(() => s.abort(), 1e4), a;
            try {
              a = await B(Re, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.authToken}`, "X-Env": te() }, body: JSON.stringify(this.projectId ? { ProjectId: this.projectId } : {}), signal: s.signal });
            } catch (d) {
              if (n < 3) {
                await K(500 * n);
                continue;
              }
              throw new m(`failed to obtain STS credential: ${d.message || "timeout"}`);
            } finally {
              clearTimeout(i);
            }
            if (a.status === 413)
              throw new m("storage quota exceeded");
            if (a.status === 429)
              throw new m("rate limited, please retry later");
            if (!a.ok) {
              if (a.status >= 500 && n < 3) {
                await K(500 * n);
                continue;
              }
              let d = await a.text().catch(() => "unknown error");
              throw new m(`failed to obtain STS credential: ${a.status} ${d}`);
            }
            let o = await a.json(), c = o.data && typeof o.data == "object" ? o.data : o;
            if (c.tmpSecretId && c.tmpSecretKey && c.sessionToken && c.expiredTime) {
              let d = c.cosMainland, u = c.cosOverseas, l = a.headers.get("X-Edge-Region") || void 0;
              return { tmpSecretId: c.tmpSecretId, tmpSecretKey: c.tmpSecretKey, sessionToken: c.sessionToken, expiredTime: c.expiredTime, appId: c.appId || void 0, zoneId: c.zoneId || void 0, projectId: c.projectId || void 0, resourcePrefix: c.resourcePrefix || void 0, cosMainland: d || void 0, cosOverseas: u || void 0, edgeRegion: l };
            }
            if (c.code !== void 0 && c.code !== 0) {
              let d = c.msg || c.message || "unknown error";
              throw new m(`credential exchange failed (code=${c.code}): ${d}`);
            }
            if (o.code !== void 0 && o.code !== 0) {
              let d = o.msg || o.message || "unknown error";
              throw new m(`credential exchange failed (code=${o.code}): ${d}`);
            }
            if (n < 3) {
              await K(500 * n);
              continue;
            }
            throw new m("invalid STS credential response");
          }
          throw new m("invalid STS credential response");
        }
      };
      function K(t) {
        return new Promise((e) => setTimeout(e, t));
      }
      var Ae = "{{PAGES_BLOB_DEPLOY_CREDENTIAL}}";
      function re() {
        let t = {}, e = ve();
        if (e)
          t.deployCredential = e;
        else {
          let n = ne("PAGES_BLOB_DEPLOY_CREDENTIAL");
          n && (t.deployCredential = n);
        }
        let r = ne("PAGES_PROJECT_ID");
        return r && (t.projectId = r), t;
      }
      function ve() {
        let t = Ae;
        if (!(t.startsWith("{{") && t.endsWith("}}")))
          return t || void 0;
      }
      function ne(t) {
        if (typeof process < "u" && process.env)
          return process.env[t];
      }
      function Me(t) {
        let e = typeof t == "string" ? t : t.name;
        z(e);
        let r = se(typeof t == "string" ? void 0 : t), n = new D(r.authToken, r.projectId), s = new M(n);
        return new E(s, e, r.consistency ?? "eventual");
      }
      async function De(t) {
        let e = se(t ? { name: "__list__", projectId: t.projectId, token: t.token, consistency: t.consistency } : void 0), r = new D(e.authToken, e.projectId);
        return { stores: (await new M(r).listStores(e.consistency)).map((i) => ({ name: i })) };
      }
      function se(t) {
        let e = re(), r = t?.token || e.deployCredential, n = t?.projectId || e.projectId;
        if (t?.token || e.projectId) {
          if (!n)
            throw new T();
          if (!r)
            throw new b(["token"]);
          return { authToken: r, projectId: n, consistency: t?.consistency };
        }
        if (t?.projectId && !r)
          throw new b(["token"]);
        if (!e.deployCredential)
          throw new b(["deployCredential"]);
        return { authToken: e.deployCredential, consistency: t?.consistency };
      }
    }
  });
  var splitPath;
  var splitRoutingPath;
  var extractGroupsFromPath;
  var replaceGroupMarks;
  var patternCache;
  var getPattern;
  var tryDecode;
  var tryDecodeURI;
  var getPath;
  var getPathNoStrict;
  var mergePath;
  var checkOptionalParameter;
  var tryDecodeURIComponent;
  var _decodeURI;
  var _getQueryParam;
  var getQueryParam;
  var getQueryParams;
  var decodeURIComponent_;
  var init_url = __esm({
    "node_modules/hono/dist/utils/url.js"() {
      splitPath = (path) => {
        const paths = path.split("/");
        if (paths[0] === "") {
          paths.shift();
        }
        return paths;
      };
      splitRoutingPath = (routePath) => {
        const { groups, path } = extractGroupsFromPath(routePath);
        const paths = splitPath(path);
        return replaceGroupMarks(paths, groups);
      };
      extractGroupsFromPath = (path) => {
        const groups = [];
        path = path.replace(/\{[^}]+\}/g, (match2, index) => {
          const mark = `@${index}`;
          groups.push([mark, match2]);
          return mark;
        });
        return { groups, path };
      };
      replaceGroupMarks = (paths, groups) => {
        for (let i = groups.length - 1; i >= 0; i--) {
          const [mark] = groups[i];
          for (let j = paths.length - 1; j >= 0; j--) {
            if (paths[j].includes(mark)) {
              paths[j] = paths[j].replace(mark, groups[i][1]);
              break;
            }
          }
        }
        return paths;
      };
      patternCache = {};
      getPattern = (label, next) => {
        if (label === "*") {
          return "*";
        }
        const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
        if (match2) {
          const cacheKey = `${label}#${next}`;
          if (!patternCache[cacheKey]) {
            if (match2[2]) {
              patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
            } else {
              patternCache[cacheKey] = [label, match2[1], true];
            }
          }
          return patternCache[cacheKey];
        }
        return null;
      };
      tryDecode = (str, decoder) => {
        try {
          return decoder(str);
        } catch {
          return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
            try {
              return decoder(match2);
            } catch {
              return match2;
            }
          });
        }
      };
      tryDecodeURI = (str) => tryDecode(str, decodeURI);
      getPath = (request) => {
        const url = request.url;
        const start = url.indexOf("/", url.indexOf(":") + 4);
        let i = start;
        for (; i < url.length; i++) {
          const charCode = url.charCodeAt(i);
          if (charCode === 37) {
            const queryIndex = url.indexOf("?", i);
            const hashIndex = url.indexOf("#", i);
            const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
            const path = url.slice(start, end);
            return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
          } else if (charCode === 63 || charCode === 35) {
            break;
          }
        }
        return url.slice(start, i);
      };
      getPathNoStrict = (request) => {
        const result = getPath(request);
        return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
      };
      mergePath = (base, sub, ...rest) => {
        if (rest.length) {
          sub = mergePath(sub, ...rest);
        }
        return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
      };
      checkOptionalParameter = (path) => {
        if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
          return null;
        }
        const segments = path.split("/");
        const results = [];
        let basePath = "";
        segments.forEach((segment) => {
          if (segment !== "" && !/\:/.test(segment)) {
            basePath += "/" + segment;
          } else if (/\:/.test(segment)) {
            if (segment.charCodeAt(segment.length - 1) === 63) {
              if (results.length === 0 && basePath === "") {
                results.push("/");
              } else {
                results.push(basePath);
              }
              const optionalSegment = segment.slice(0, -1);
              basePath += "/" + optionalSegment;
              results.push(basePath);
            } else {
              basePath += "/" + segment;
            }
          }
        });
        return results.filter((v, i, a) => a.indexOf(v) === i);
      };
      tryDecodeURIComponent = (str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str;
      _decodeURI = (value) => {
        if (value.indexOf("+") !== -1) {
          value = value.replace(/\+/g, " ");
        }
        return tryDecodeURIComponent(value);
      };
      _getQueryParam = (url, key, multiple) => {
        let encoded;
        if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
          let keyIndex2 = url.indexOf("?", 8);
          if (keyIndex2 === -1) {
            return void 0;
          }
          if (!url.startsWith(key, keyIndex2 + 1)) {
            keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
          }
          while (keyIndex2 !== -1) {
            const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
            if (trailingKeyCode === 61) {
              const valueIndex = keyIndex2 + key.length + 2;
              const endIndex = url.indexOf("&", valueIndex);
              return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
            } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
              return "";
            }
            keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
          }
          encoded = /[%+]/.test(url);
          if (!encoded) {
            return void 0;
          }
        }
        const results = /* @__PURE__ */ Object.create(null);
        encoded ??= /[%+]/.test(url);
        let keyIndex = url.indexOf("?", 8);
        while (keyIndex !== -1) {
          const nextKeyIndex = url.indexOf("&", keyIndex + 1);
          let valueIndex = url.indexOf("=", keyIndex);
          if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
            valueIndex = -1;
          }
          let name = url.slice(
            keyIndex + 1,
            valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
          );
          if (encoded) {
            name = _decodeURI(name);
          }
          keyIndex = nextKeyIndex;
          if (name === "") {
            continue;
          }
          let value;
          if (valueIndex === -1) {
            value = "";
          } else {
            value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
            if (encoded) {
              value = _decodeURI(value);
            }
          }
          if (multiple) {
            if (!(results[name] && Array.isArray(results[name]))) {
              results[name] = [];
            }
            ;
            results[name].push(value);
          } else {
            results[name] ??= value;
          }
        }
        return key ? results[key] : results;
      };
      getQueryParam = _getQueryParam;
      getQueryParams = (url, key) => {
        return _getQueryParam(url, key, true);
      };
      decodeURIComponent_ = decodeURIComponent;
    }
  });
  var algorithm;
  var getCryptoKey;
  var makeSignature;
  var verifySignature;
  var validCookieNameRegEx;
  var relaxedCookieNameRegEx;
  var validCookieValueRegEx;
  var trimCookieWhitespace;
  var parse;
  var parseSigned;
  var _serialize;
  var serialize;
  var serializeSigned;
  var init_cookie = __esm({
    "node_modules/hono/dist/utils/cookie.js"() {
      init_url();
      algorithm = { name: "HMAC", hash: "SHA-256" };
      getCryptoKey = async (secret) => {
        const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
        return await crypto.subtle.importKey("raw", secretBuf, algorithm, false, ["sign", "verify"]);
      };
      makeSignature = async (value, secret) => {
        const key = await getCryptoKey(secret);
        const signature = await crypto.subtle.sign(algorithm.name, key, new TextEncoder().encode(value));
        return btoa(String.fromCharCode(...new Uint8Array(signature)));
      };
      verifySignature = async (base64Signature, value, secret) => {
        try {
          const signatureBinStr = atob(base64Signature);
          const signature = new Uint8Array(signatureBinStr.length);
          for (let i = 0, len = signatureBinStr.length; i < len; i++) {
            signature[i] = signatureBinStr.charCodeAt(i);
          }
          return await crypto.subtle.verify(algorithm, secret, signature, new TextEncoder().encode(value));
        } catch {
          return false;
        }
      };
      validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
      relaxedCookieNameRegEx = /^[!#-:<>-[\]-~]+$/;
      validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
      trimCookieWhitespace = (value) => {
        let start = 0;
        let end = value.length;
        while (start < end) {
          const charCode = value.charCodeAt(start);
          if (charCode !== 32 && charCode !== 9) {
            break;
          }
          start++;
        }
        while (end > start) {
          const charCode = value.charCodeAt(end - 1);
          if (charCode !== 32 && charCode !== 9) {
            break;
          }
          end--;
        }
        return start === 0 && end === value.length ? value : value.slice(start, end);
      };
      parse = (cookie, name) => {
        if (name && cookie.indexOf(name) === -1) {
          return {};
        }
        const pairs = cookie.split(";");
        const parsedCookie = /* @__PURE__ */ Object.create(null);
        for (const pairStr of pairs) {
          const valueStartPos = pairStr.indexOf("=");
          if (valueStartPos === -1) {
            continue;
          }
          const cookieName = trimCookieWhitespace(pairStr.substring(0, valueStartPos));
          if (name && name !== cookieName || !relaxedCookieNameRegEx.test(cookieName) || cookieName in parsedCookie) {
            continue;
          }
          let cookieValue = trimCookieWhitespace(pairStr.substring(valueStartPos + 1));
          if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
            cookieValue = cookieValue.slice(1, -1);
          }
          if (validCookieValueRegEx.test(cookieValue)) {
            parsedCookie[cookieName] = tryDecodeURIComponent(cookieValue);
            if (name) {
              break;
            }
          }
        }
        return parsedCookie;
      };
      parseSigned = async (cookie, secret, name) => {
        const parsedCookie = /* @__PURE__ */ Object.create(null);
        const secretKey = await getCryptoKey(secret);
        for (const [key, value] of Object.entries(parse(cookie, name))) {
          const signatureStartPos = value.lastIndexOf(".");
          if (signatureStartPos < 1) {
            continue;
          }
          const signedValue = value.substring(0, signatureStartPos);
          const signature = value.substring(signatureStartPos + 1);
          if (signature.length !== 44 || !signature.endsWith("=")) {
            continue;
          }
          const isVerified = await verifySignature(signature, signedValue, secretKey);
          parsedCookie[key] = isVerified ? signedValue : false;
        }
        return parsedCookie;
      };
      _serialize = (name, value, opt = {}) => {
        if (!validCookieNameRegEx.test(name)) {
          throw new Error("Invalid cookie name");
        }
        let cookie = `${name}=${value}`;
        if (name.startsWith("__Secure-") && !opt.secure) {
          throw new Error("__Secure- Cookie must have Secure attributes");
        }
        if (name.startsWith("__Host-")) {
          if (!opt.secure) {
            throw new Error("__Host- Cookie must have Secure attributes");
          }
          if (opt.path !== "/") {
            throw new Error('__Host- Cookie must have Path attributes with "/"');
          }
          if (opt.domain) {
            throw new Error("__Host- Cookie must not have Domain attributes");
          }
        }
        for (const key of ["domain", "path", "sameSite", "priority"]) {
          if (opt[key] && /[;\r\n]/.test(opt[key])) {
            throw new Error(`${key} must not contain ";", "\\r", or "\\n"`);
          }
        }
        if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
          if (opt.maxAge > 3456e4) {
            throw new Error(
              "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration."
            );
          }
          cookie += `; Max-Age=${opt.maxAge | 0}`;
        }
        if (opt.domain && opt.prefix !== "host") {
          cookie += `; Domain=${opt.domain}`;
        }
        if (opt.path) {
          cookie += `; Path=${opt.path}`;
        }
        if (opt.expires) {
          if (opt.expires.getTime() - Date.now() > 3456e7) {
            throw new Error(
              "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future."
            );
          }
          cookie += `; Expires=${opt.expires.toUTCString()}`;
        }
        if (opt.httpOnly) {
          cookie += "; HttpOnly";
        }
        if (opt.secure) {
          cookie += "; Secure";
        }
        if (opt.sameSite) {
          cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
        }
        if (opt.priority) {
          cookie += `; Priority=${opt.priority.charAt(0).toUpperCase() + opt.priority.slice(1)}`;
        }
        if (opt.partitioned) {
          if (!opt.secure) {
            throw new Error("Partitioned Cookie must have Secure attributes");
          }
          cookie += "; Partitioned";
        }
        return cookie;
      };
      serialize = (name, value, opt) => {
        value = encodeURIComponent(value);
        return _serialize(name, value, opt);
      };
      serializeSigned = async (name, value, secret, opt = {}) => {
        const signature = await makeSignature(value, secret);
        value = `${value}.${signature}`;
        value = encodeURIComponent(value);
        return _serialize(name, value, opt);
      };
    }
  });
  var cookie_exports = {};
  __export(cookie_exports, {
    deleteCookie: () => deleteCookie,
    generateCookie: () => generateCookie,
    generateSignedCookie: () => generateSignedCookie,
    getCookie: () => getCookie,
    getSignedCookie: () => getSignedCookie,
    setCookie: () => setCookie,
    setSignedCookie: () => setSignedCookie
  });
  var getCookie;
  var getSignedCookie;
  var generateCookie;
  var setCookie;
  var generateSignedCookie;
  var setSignedCookie;
  var deleteCookie;
  var init_cookie2 = __esm({
    "node_modules/hono/dist/helper/cookie/index.js"() {
      init_cookie();
      getCookie = (c, key, prefix) => {
        const cookie = c.req.raw.headers.get("Cookie");
        if (typeof key === "string") {
          if (!cookie) {
            return void 0;
          }
          let finalKey = key;
          if (prefix === "secure") {
            finalKey = "__Secure-" + key;
          } else if (prefix === "host") {
            finalKey = "__Host-" + key;
          }
          const obj2 = parse(cookie, finalKey);
          return obj2[finalKey];
        }
        if (!cookie) {
          return {};
        }
        const obj = parse(cookie);
        return obj;
      };
      getSignedCookie = async (c, secret, key, prefix) => {
        const cookie = c.req.raw.headers.get("Cookie");
        if (typeof key === "string") {
          if (!cookie) {
            return void 0;
          }
          let finalKey = key;
          if (prefix === "secure") {
            finalKey = "__Secure-" + key;
          } else if (prefix === "host") {
            finalKey = "__Host-" + key;
          }
          const obj2 = await parseSigned(cookie, secret, finalKey);
          return obj2[finalKey];
        }
        if (!cookie) {
          return {};
        }
        const obj = await parseSigned(cookie, secret);
        return obj;
      };
      generateCookie = (name, value, opt) => {
        let cookie;
        if (opt?.prefix === "secure") {
          cookie = serialize("__Secure-" + name, value, { path: "/", ...opt, secure: true });
        } else if (opt?.prefix === "host") {
          cookie = serialize("__Host-" + name, value, {
            ...opt,
            path: "/",
            secure: true,
            domain: void 0
          });
        } else {
          cookie = serialize(name, value, { path: "/", ...opt });
        }
        return cookie;
      };
      setCookie = (c, name, value, opt) => {
        const cookie = generateCookie(name, value, opt);
        c.header("Set-Cookie", cookie, { append: true });
      };
      generateSignedCookie = async (name, value, secret, opt) => {
        let cookie;
        if (opt?.prefix === "secure") {
          cookie = await serializeSigned("__Secure-" + name, value, secret, {
            path: "/",
            ...opt,
            secure: true
          });
        } else if (opt?.prefix === "host") {
          cookie = await serializeSigned("__Host-" + name, value, secret, {
            ...opt,
            path: "/",
            secure: true,
            domain: void 0
          });
        } else {
          cookie = await serializeSigned(name, value, secret, { path: "/", ...opt });
        }
        return cookie;
      };
      setSignedCookie = async (c, name, value, secret, opt) => {
        const cookie = await generateSignedCookie(name, value, secret, opt);
        c.header("set-cookie", cookie, { append: true });
      };
      deleteCookie = (c, name, opt) => {
        const deletedCookie = getCookie(c, name, opt?.prefix);
        setCookie(c, name, "", { ...opt, maxAge: 0 });
        return deletedCookie;
      };
    }
  });
  var import_pages_blob = __toESM(require_dist());
  var STORE_NAME = "ai-gateway";
  var _store = null;
  function store() {
    if (!_store) {
      _store = (0, import_pages_blob.getStore)(STORE_NAME);
    }
    return _store;
  }
  function createBlobKv() {
    return {
      async get(key) {
        try {
          const val = await store().get(key, { type: "text" });
          return val;
        } catch (e) {
          if (e && e.code === "INVALID_KEY")
            return null;
          console.error("[blob-kv] get error:", e?.message || e);
          return null;
        }
      },
      async put(key, value) {
        try {
          await store().set(key, value);
        } catch (e) {
          console.error("[blob-kv] put error:", e?.message || e);
          throw e;
        }
      },
      async delete(key) {
        try {
          await store().delete(key);
        } catch (e) {
          console.error("[blob-kv] delete error:", e?.message || e);
        }
      },
      async list(config) {
        try {
          const res = await store().list({ prefix: config?.prefix || "" });
          const blobs = res && res.blobs || [];
          return { keys: blobs.map((b) => ({ key: b.key })) };
        } catch (e) {
          console.error("[blob-kv] list error:", e?.message || e);
          return { keys: [] };
        }
      }
    };
  }
  var compose = (middleware, onError, onNotFound) => {
    return (context, next) => {
      let index = -1;
      return dispatch(0);
      async function dispatch(i) {
        if (i <= index) {
          throw new Error("next() called multiple times");
        }
        index = i;
        let res;
        let isError = false;
        let handler;
        if (middleware[i]) {
          handler = middleware[i][0][0];
          context.req.routeIndex = i;
        } else {
          handler = i === middleware.length && next || void 0;
        }
        if (handler) {
          try {
            res = await handler(context, () => dispatch(i + 1));
          } catch (err) {
            if (err instanceof Error && onError) {
              context.error = err;
              res = await onError(err, context);
              isError = true;
            } else {
              throw err;
            }
          }
        } else {
          if (context.finalized === false && onNotFound) {
            res = await onNotFound(context);
          }
        }
        if (res && (context.finalized === false || isError)) {
          context.res = res;
        }
        return context;
      }
    };
  };
  var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();
  var bufferToFormData = (arrayBuffer, contentType) => {
    const response = new Response(arrayBuffer, {
      headers: {
        // Normalize the media type (case-insensitive) while keeping parameters like the boundary
        "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
      }
    });
    return response.formData();
  };
  var isRawRequest = (request) => "headers" in request;
  var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
    const { all = false, dot = false } = options;
    const headers = isRawRequest(request) ? request.headers : request.raw.headers;
    const contentType = headers.get("Content-Type");
    const mediaType = contentType?.split(";")[0].trim().toLowerCase();
    if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
      return parseFormData(request, { all, dot });
    }
    return {};
  };
  async function parseFormData(request, options) {
    if (!isRawRequest(request) && request.bodyCache.formData) {
      return convertFormDataToBodyData(
        await request.bodyCache.formData,
        options
      );
    }
    const headers = isRawRequest(request) ? request.headers : request.raw.headers;
    const arrayBuffer = await request.arrayBuffer();
    const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
    if (!isRawRequest(request)) {
      request.bodyCache.formData = formDataPromise;
    }
    const formData = await formDataPromise;
    if (formData) {
      return convertFormDataToBodyData(formData, options);
    }
    return {};
  }
  function convertFormDataToBodyData(formData, options) {
    const form = /* @__PURE__ */ Object.create(null);
    formData.forEach((value, key) => {
      const shouldParseAllValues = options.all || key.endsWith("[]");
      if (!shouldParseAllValues) {
        form[key] = value;
      } else {
        handleParsingAllValues(form, key, value);
      }
    });
    if (options.dot) {
      Object.entries(form).forEach(([key, value]) => {
        const shouldParseDotValues = key.includes(".");
        if (shouldParseDotValues) {
          handleParsingNestedValues(form, key, value);
          delete form[key];
        }
      });
    }
    return form;
  }
  var handleParsingAllValues = (form, key, value) => {
    if (form[key] !== void 0) {
      if (Array.isArray(form[key])) {
        ;
        form[key].push(value);
      } else {
        form[key] = [form[key], value];
      }
    } else {
      if (!key.endsWith("[]")) {
        form[key] = value;
      } else {
        form[key] = [value];
      }
    }
  };
  var handleParsingNestedValues = (form, key, value) => {
    if (/(?:^|\.)__proto__\./.test(key)) {
      return;
    }
    let nestedForm = form;
    const keys = key.split(".");
    keys.forEach((key2, index) => {
      if (index === keys.length - 1) {
        nestedForm[key2] = value;
      } else {
        if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
          nestedForm[key2] = /* @__PURE__ */ Object.create(null);
        }
        nestedForm = nestedForm[key2];
      }
    });
  };
  init_url();
  var HonoRequest = class {
    /**
     * `.raw` can get the raw Request object.
     *
     * @see {@link https://hono.dev/docs/api/request#raw}
     *
     * @example
     * ```ts
     * // For Cloudflare Workers
     * app.post('/', async (c) => {
     *   const metadata = c.req.raw.cf?.hostMetadata?
     *   ...
     * })
     * ```
     */
    raw;
    #validatedData;
    // Short name of validatedData
    #matchResult;
    routeIndex = 0;
    /**
     * `.path` can get the pathname of the request.
     *
     * @see {@link https://hono.dev/docs/api/request#path}
     *
     * @example
     * ```ts
     * app.get('/about/me', (c) => {
     *   const pathname = c.req.path // `/about/me`
     * })
     * ```
     */
    path;
    bodyCache = {};
    constructor(request, path = "/", matchResult = [[]]) {
      this.raw = request;
      this.path = path;
      this.#matchResult = matchResult;
    }
    param(key) {
      return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
    }
    #getDecodedParam(key) {
      const paramKey = this.#matchResult[0][this.routeIndex][1][key];
      const param = this.#getParamValue(paramKey);
      return param && tryDecodeURIComponent(param);
    }
    #getAllDecodedParams() {
      const decoded = {};
      const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
      for (const key of keys) {
        const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
        if (value !== void 0) {
          decoded[key] = tryDecodeURIComponent(value);
        }
      }
      return decoded;
    }
    #getParamValue(paramKey) {
      return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
    }
    query(key) {
      return getQueryParam(this.url, key);
    }
    queries(key) {
      return getQueryParams(this.url, key);
    }
    header(name) {
      if (name) {
        return this.raw.headers.get(name) ?? void 0;
      }
      const headerData = /* @__PURE__ */ Object.create(null);
      this.raw.headers.forEach((value, key) => {
        headerData[key] = value;
      });
      return headerData;
    }
    async parseBody(options) {
      return parseBody(this, options);
    }
    #cachedBody = (key) => {
      const { bodyCache, raw: raw2 } = this;
      const cachedBody = bodyCache[key];
      if (cachedBody) {
        return cachedBody;
      }
      for (const anyCachedKey in bodyCache) {
        return bodyCache[anyCachedKey].then((body) => {
          if (anyCachedKey === "json") {
            body = JSON.stringify(body);
          }
          return new Response(body)[key]();
        });
      }
      return bodyCache[key] = raw2[key]();
    };
    /**
     * `.json()` can parse Request body of type `application/json`
     *
     * @see {@link https://hono.dev/docs/api/request#json}
     *
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.json()
     * })
     * ```
     */
    json() {
      return this.#cachedBody("text").then((text) => JSON.parse(text));
    }
    /**
     * `.text()` can parse Request body of type `text/plain`
     *
     * @see {@link https://hono.dev/docs/api/request#text}
     *
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.text()
     * })
     * ```
     */
    text() {
      return this.#cachedBody("text");
    }
    /**
     * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
     *
     * @see {@link https://hono.dev/docs/api/request#arraybuffer}
     *
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.arrayBuffer()
     * })
     * ```
     */
    arrayBuffer() {
      return this.#cachedBody("arrayBuffer");
    }
    /**
     * `.bytes()` parses the request body as a `Uint8Array`.
     *
     * @see {@link https://hono.dev/docs/api/request#bytes}
     *
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.bytes()
     * })
     * ```
     */
    bytes() {
      return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
    }
    /**
     * Parses the request body as a `Blob`.
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.blob();
     * });
     * ```
     * @see https://hono.dev/docs/api/request#blob
     */
    blob() {
      return this.#cachedBody("blob");
    }
    /**
     * Parses the request body as `FormData`.
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.formData();
     * });
     * ```
     * @see https://hono.dev/docs/api/request#formdata
     */
    formData() {
      return this.#cachedBody("formData");
    }
    /**
     * Adds validated data to the request.
     *
     * @param target - The target of the validation.
     * @param data - The validated data to add.
     */
    addValidatedData(target, data) {
      ;
      (this.#validatedData ??= {})[target] = data;
    }
    valid(target) {
      return this.#validatedData?.[target];
    }
    /**
     * `.url()` can get the request url strings.
     *
     * @see {@link https://hono.dev/docs/api/request#url}
     *
     * @example
     * ```ts
     * app.get('/about/me', (c) => {
     *   const url = c.req.url // `http://localhost:8787/about/me`
     *   ...
     * })
     * ```
     */
    get url() {
      return this.raw.url;
    }
    /**
     * `.method()` can get the method name of the request.
     *
     * @see {@link https://hono.dev/docs/api/request#method}
     *
     * @example
     * ```ts
     * app.get('/about/me', (c) => {
     *   const method = c.req.method // `GET`
     * })
     * ```
     */
    get method() {
      return this.raw.method;
    }
    get [GET_MATCH_RESULT]() {
      return this.#matchResult;
    }
    /**
     * `.matchedRoutes()` can return a matched route in the handler
     *
     * @deprecated
     *
     * Use matchedRoutes helper defined in "hono/route" instead.
     *
     * @see {@link https://hono.dev/docs/api/request#matchedroutes}
     *
     * @example
     * ```ts
     * app.use('*', async function logger(c, next) {
     *   await next()
     *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
     *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
     *     console.log(
     *       method,
     *       ' ',
     *       path,
     *       ' '.repeat(Math.max(10 - path.length, 0)),
     *       name,
     *       i === c.req.routeIndex ? '<- respond from here' : ''
     *     )
     *   })
     * })
     * ```
     */
    get matchedRoutes() {
      return this.#matchResult[0].map(([[, route]]) => route);
    }
    /**
     * `routePath()` can retrieve the path registered within the handler
     *
     * @deprecated
     *
     * Use routePath helper defined in "hono/route" instead.
     *
     * @see {@link https://hono.dev/docs/api/request#routepath}
     *
     * @example
     * ```ts
     * app.get('/posts/:id', (c) => {
     *   return c.json({ path: c.req.routePath })
     * })
     * ```
     */
    get routePath() {
      return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
    }
  };
  var HtmlEscapedCallbackPhase = {
    Stringify: 1,
    BeforeStream: 2,
    Stream: 3
  };
  var raw = (value, callbacks) => {
    const escapedString = new String(value);
    escapedString.isEscaped = true;
    escapedString.callbacks = callbacks;
    return escapedString;
  };
  var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
    if (typeof str === "object" && !(str instanceof String)) {
      if (!(str instanceof Promise)) {
        str = str.toString();
      }
      if (str instanceof Promise) {
        str = await str;
      }
    }
    const callbacks = str.callbacks;
    if (!callbacks?.length) {
      return Promise.resolve(str);
    }
    if (buffer) {
      buffer[0] += str;
    } else {
      buffer = [str];
    }
    const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
      (res) => Promise.all(
        res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
      ).then(() => buffer[0])
    );
    if (preserveCallbacks) {
      return raw(await resStr, callbacks);
    } else {
      return resStr;
    }
  };
  var TEXT_PLAIN = "text/plain; charset=UTF-8";
  var setDefaultContentType = (contentType, headers) => {
    return {
      "Content-Type": contentType,
      ...headers
    };
  };
  var createResponseInstance = (body, init) => new Response(body, init);
  var Context = class {
    #rawRequest;
    #req;
    /**
     * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
     *
     * @see {@link https://hono.dev/docs/api/context#env}
     *
     * @example
     * ```ts
     * // Environment object for Cloudflare Workers
     * app.get('*', async c => {
     *   const counter = c.env.COUNTER
     * })
     * ```
     */
    env = {};
    #var;
    finalized = false;
    /**
     * `.error` can get the error object from the middleware if the Handler throws an error.
     *
     * @see {@link https://hono.dev/docs/api/context#error}
     *
     * @example
     * ```ts
     * app.use('*', async (c, next) => {
     *   await next()
     *   if (c.error) {
     *     // do something...
     *   }
     * })
     * ```
     */
    error;
    #status;
    #executionCtx;
    #res;
    #layout;
    #renderer;
    #notFoundHandler;
    #preparedHeaders;
    #matchResult;
    #path;
    /**
     * Creates an instance of the Context class.
     *
     * @param req - The Request object.
     * @param options - Optional configuration options for the context.
     */
    constructor(req, options) {
      this.#rawRequest = req;
      if (options) {
        this.#executionCtx = options.executionCtx;
        this.env = options.env;
        this.#notFoundHandler = options.notFoundHandler;
        this.#path = options.path;
        this.#matchResult = options.matchResult;
      }
    }
    /**
     * `.req` is the instance of {@link HonoRequest}.
     */
    get req() {
      this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
      return this.#req;
    }
    /**
     * @see {@link https://hono.dev/docs/api/context#event}
     * The FetchEvent associated with the current request.
     *
     * @throws Will throw an error if the context does not have a FetchEvent.
     */
    get event() {
      if (this.#executionCtx && "respondWith" in this.#executionCtx) {
        return this.#executionCtx;
      } else {
        throw Error("This context has no FetchEvent");
      }
    }
    /**
     * @see {@link https://hono.dev/docs/api/context#executionctx}
     * The ExecutionContext associated with the current request.
     *
     * @throws Will throw an error if the context does not have an ExecutionContext.
     */
    get executionCtx() {
      if (this.#executionCtx) {
        return this.#executionCtx;
      } else {
        throw Error("This context has no ExecutionContext");
      }
    }
    /**
     * @see {@link https://hono.dev/docs/api/context#res}
     * The Response object for the current request.
     */
    get res() {
      return this.#res ||= createResponseInstance(null, {
        headers: this.#preparedHeaders ??= new Headers()
      });
    }
    /**
     * Sets the Response object for the current request.
     *
     * @param _res - The Response object to set.
     */
    set res(_res) {
      if (this.#res && _res) {
        _res = createResponseInstance(_res.body, _res);
        for (const [k, v] of this.#res.headers.entries()) {
          if (k === "content-type") {
            continue;
          }
          if (k === "set-cookie") {
            const cookies = this.#res.headers.getSetCookie();
            _res.headers.delete("set-cookie");
            for (const cookie of cookies) {
              _res.headers.append("set-cookie", cookie);
            }
          } else {
            _res.headers.set(k, v);
          }
        }
      }
      this.#res = _res;
      this.finalized = true;
    }
    /**
     * `.render()` can create a response within a layout.
     *
     * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
     *
     * @example
     * ```ts
     * app.get('/', (c) => {
     *   return c.render('Hello!')
     * })
     * ```
     */
    render = (...args) => {
      this.#renderer ??= (content) => this.html(content);
      return this.#renderer(...args);
    };
    /**
     * Sets the layout for the response.
     *
     * @param layout - The layout to set.
     * @returns The layout function.
     */
    setLayout = (layout) => this.#layout = layout;
    /**
     * Gets the current layout for the response.
     *
     * @returns The current layout function.
     */
    getLayout = () => this.#layout;
    /**
     * `.setRenderer()` can set the layout in the custom middleware.
     *
     * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
     *
     * @example
     * ```tsx
     * app.use('*', async (c, next) => {
     *   c.setRenderer((content) => {
     *     return c.html(
     *       <html>
     *         <body>
     *           <p>{content}</p>
     *         </body>
     *       </html>
     *     )
     *   })
     *   await next()
     * })
     * ```
     */
    setRenderer = (renderer) => {
      this.#renderer = renderer;
    };
    /**
     * `.header()` can set headers.
     *
     * @see {@link https://hono.dev/docs/api/context#header}
     *
     * @example
     * ```ts
     * app.get('/welcome', (c) => {
     *   // Set headers
     *   c.header('X-Message', 'Hello!')
     *   c.header('Content-Type', 'text/plain')
     *
     *   // Append multiple headers using the append option (e.g. Vary)
     *   c.header('Vary', 'Accept-Encoding', { append: true })
     *   c.header('Vary', 'User-Agent', { append: true })
     *
     *   return c.body('Thank you for coming')
     * })
     * ```
     */
    header = (name, value, options) => {
      if (this.finalized) {
        this.#res = createResponseInstance(this.#res.body, this.#res);
      }
      const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
      if (value === void 0) {
        headers.delete(name);
      } else if (options?.append) {
        headers.append(name, value);
      } else {
        headers.set(name, value);
      }
    };
    status = (status) => {
      this.#status = status;
    };
    /**
     * `.set()` can set the value specified by the key.
     *
     * @see {@link https://hono.dev/docs/api/context#set-get}
     *
     * @example
     * ```ts
     * app.use('*', async (c, next) => {
     *   c.set('message', 'Hono is hot!!')
     *   await next()
     * })
     * ```
     */
    set = (key, value) => {
      this.#var ??= /* @__PURE__ */ new Map();
      this.#var.set(key, value);
    };
    /**
     * `.get()` can use the value specified by the key.
     *
     * @see {@link https://hono.dev/docs/api/context#set-get}
     *
     * @example
     * ```ts
     * app.get('/', (c) => {
     *   const message = c.get('message')
     *   return c.text(`The message is "${message}"`)
     * })
     * ```
     */
    get = (key) => {
      return this.#var ? this.#var.get(key) : void 0;
    };
    /**
     * `.var` can access the value of a variable.
     *
     * @see {@link https://hono.dev/docs/api/context#var}
     *
     * @example
     * ```ts
     * const result = c.var.client.oneMethod()
     * ```
     */
    // c.var.propName is a read-only
    get var() {
      if (!this.#var) {
        return {};
      }
      return Object.fromEntries(this.#var);
    }
    #newResponse(data, arg, headers) {
      let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
      if (typeof arg === "object" && arg.headers) {
        responseHeaders ??= new Headers();
        for (const [key, value] of new Headers(arg.headers)) {
          if (key === "set-cookie") {
            responseHeaders.append(key, value);
          } else {
            responseHeaders.set(key, value);
          }
        }
      }
      if (headers) {
        if (!responseHeaders) {
          let count = 0;
          for (const k in headers) {
            if (++count > 1 || typeof headers[k] !== "string") {
              responseHeaders = new Headers();
              break;
            }
          }
        }
        if (responseHeaders) {
          for (const k in headers) {
            const v = headers[k];
            if (typeof v === "string") {
              responseHeaders.set(k, v);
            } else {
              responseHeaders.delete(k);
              for (const v2 of v) {
                responseHeaders.append(k, v2);
              }
            }
          }
        }
      }
      const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
      return createResponseInstance(data, {
        status,
        headers: responseHeaders ?? headers
      });
    }
    newResponse = (...args) => this.#newResponse(...args);
    /**
     * `.body()` can return the HTTP response.
     * You can set headers with `.header()` and set HTTP status code with `.status`.
     * This can also be set in `.text()`, `.json()` and so on.
     *
     * @see {@link https://hono.dev/docs/api/context#body}
     *
     * @example
     * ```ts
     * app.get('/welcome', (c) => {
     *   // Set headers
     *   c.header('X-Message', 'Hello!')
     *   c.header('Content-Type', 'text/plain')
     *   // Set HTTP status code
     *   c.status(201)
     *
     *   // Return the response body
     *   return c.body('Thank you for coming')
     * })
     * ```
     */
    body = (data, arg, headers) => this.#newResponse(data, arg, headers);
    /**
     * `.text()` can render text as `Content-Type:text/plain`.
     *
     * @see {@link https://hono.dev/docs/api/context#text}
     *
     * @example
     * ```ts
     * app.get('/say', (c) => {
     *   return c.text('Hello!')
     * })
     * ```
     */
    text = (text, arg, headers) => {
      return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
        text,
        arg,
        setDefaultContentType(TEXT_PLAIN, headers)
      );
    };
    /**
     * `.json()` can render JSON as `Content-Type:application/json`.
     *
     * @see {@link https://hono.dev/docs/api/context#json}
     *
     * @example
     * ```ts
     * app.get('/api', (c) => {
     *   return c.json({ message: 'Hello!' })
     * })
     * ```
     */
    json = (object, arg, headers) => {
      return this.#newResponse(
        JSON.stringify(object),
        arg,
        setDefaultContentType("application/json", headers)
      );
    };
    html = (html, arg, headers) => {
      const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
      return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
    };
    /**
     * `.redirect()` can Redirect, default status code is 302.
     *
     * @see {@link https://hono.dev/docs/api/context#redirect}
     *
     * @example
     * ```ts
     * app.get('/redirect', (c) => {
     *   return c.redirect('/')
     * })
     * app.get('/redirect-permanently', (c) => {
     *   return c.redirect('/', 301)
     * })
     * ```
     */
    redirect = (location, status) => {
      const locationString = String(location);
      this.header(
        "Location",
        // Multibyes should be encoded
        // eslint-disable-next-line no-control-regex
        !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
      );
      return this.newResponse(null, status ?? 302);
    };
    /**
     * `.notFound()` can return the Not Found Response.
     *
     * @see {@link https://hono.dev/docs/api/context#notfound}
     *
     * @example
     * ```ts
     * app.get('/notfound', (c) => {
     *   return c.notFound()
     * })
     * ```
     */
    notFound = () => {
      this.#notFoundHandler ??= () => createResponseInstance();
      return this.#notFoundHandler(this);
    };
  };
  var METHOD_NAME_ALL = "ALL";
  var METHOD_NAME_ALL_LOWERCASE = "all";
  var METHODS = ["get", "post", "put", "delete", "options", "patch", "query"];
  var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
  var UnsupportedPathError = class extends Error {
  };
  var COMPOSED_HANDLER = "__COMPOSED_HANDLER";
  init_url();
  var notFoundHandler = (c) => {
    return c.text("404 Not Found", 404);
  };
  var errorHandler = (err, c) => {
    if ("getResponse" in err) {
      const res = err.getResponse();
      return c.newResponse(res.body, res);
    }
    console.error(err);
    return c.text("Internal Server Error", 500);
  };
  var Hono = class _Hono {
    get;
    post;
    put;
    delete;
    options;
    patch;
    query;
    all;
    on;
    use;
    /*
      This class is like an abstract class and does not have a router.
      To use it, inherit the class and implement router in the constructor.
    */
    router;
    getPath;
    // Cannot use `#` because it requires visibility at JavaScript runtime.
    _basePath = "/";
    #path = "/";
    routes = [];
    constructor(options = {}) {
      const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
      allMethods.forEach((method) => {
        this[method] = (args1, ...args) => {
          if (typeof args1 === "string") {
            this.#path = args1;
          } else {
            this.#addRoute(method, this.#path, args1);
          }
          args.forEach((handler) => {
            this.#addRoute(method, this.#path, handler);
          });
          return this;
        };
      });
      this.on = (method, path, ...handlers) => {
        for (const p of [path].flat()) {
          this.#path = p;
          for (const m of [method].flat()) {
            handlers.map((handler) => {
              this.#addRoute(m.toUpperCase(), this.#path, handler);
            });
          }
        }
        return this;
      };
      this.use = (arg1, ...handlers) => {
        if (typeof arg1 === "string") {
          this.#path = arg1;
        } else {
          this.#path = "*";
          handlers.unshift(arg1);
        }
        handlers.forEach((handler) => {
          this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
        });
        return this;
      };
      const { strict, ...optionsWithoutStrict } = options;
      Object.assign(this, optionsWithoutStrict);
      this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
    }
    #clone() {
      const clone = new _Hono({
        router: this.router,
        getPath: this.getPath
      });
      clone.errorHandler = this.errorHandler;
      clone.#notFoundHandler = this.#notFoundHandler;
      clone.routes = this.routes;
      return clone;
    }
    #notFoundHandler = notFoundHandler;
    // Cannot use `#` because it requires visibility at JavaScript runtime.
    errorHandler = errorHandler;
    /**
     * `.route()` allows grouping other Hono instance in routes.
     *
     * @see {@link https://hono.dev/docs/api/routing#grouping}
     *
     * @param {string} path - base Path
     * @param {Hono} app - other Hono instance
     * @returns {Hono} routed Hono instance
     *
     * @example
     * ```ts
     * const app = new Hono()
     * const app2 = new Hono()
     *
     * app2.get("/user", (c) => c.text("user"))
     * app.route("/api", app2) // GET /api/user
     * ```
     */
    route(path, app2) {
      const subApp = this.basePath(path);
      app2.routes.map((r) => {
        let handler;
        if (app2.errorHandler === errorHandler) {
          handler = r.handler;
        } else {
          handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
          handler[COMPOSED_HANDLER] = r.handler;
        }
        subApp.#addRoute(r.method, r.path, handler, r.basePath);
      });
      return this;
    }
    /**
     * `.basePath()` allows base paths to be specified.
     *
     * @see {@link https://hono.dev/docs/api/routing#base-path}
     *
     * @param {string} path - base Path
     * @returns {Hono} changed Hono instance
     *
     * @example
     * ```ts
     * const api = new Hono().basePath('/api')
     * ```
     */
    basePath(path) {
      const subApp = this.#clone();
      subApp._basePath = mergePath(this._basePath, path);
      return subApp;
    }
    /**
     * `.onError()` handles an error and returns a customized Response.
     *
     * @see {@link https://hono.dev/docs/api/hono#error-handling}
     *
     * @param {ErrorHandler} handler - request Handler for error
     * @returns {Hono} changed Hono instance
     *
     * @example
     * ```ts
     * app.onError((err, c) => {
     *   console.error(`${err}`)
     *   return c.text('Custom Error Message', 500)
     * })
     * ```
     */
    onError = (handler) => {
      this.errorHandler = handler;
      return this;
    };
    /**
     * `.notFound()` allows you to customize a Not Found Response.
     *
     * @see {@link https://hono.dev/docs/api/hono#not-found}
     *
     * @param {NotFoundHandler} handler - request handler for not-found
     * @returns {Hono} changed Hono instance
     *
     * @example
     * ```ts
     * app.notFound((c) => {
     *   return c.text('Custom 404 Message', 404)
     * })
     * ```
     */
    notFound = (handler) => {
      this.#notFoundHandler = handler;
      return this;
    };
    /**
     * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
     *
     * @see {@link https://hono.dev/docs/api/hono#mount}
     *
     * @param {string} path - base Path
     * @param {Function} applicationHandler - other Request Handler
     * @param {MountOptions} [options] - options of `.mount()`
     * @returns {Hono} mounted Hono instance
     *
     * @example
     * ```ts
     * import { Router as IttyRouter } from 'itty-router'
     * import { Hono } from 'hono'
     * // Create itty-router application
     * const ittyRouter = IttyRouter()
     * // GET /itty-router/hello
     * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
     *
     * const app = new Hono()
     * app.mount('/itty-router', ittyRouter.handle)
     * ```
     *
     * @example
     * ```ts
     * const app = new Hono()
     * // Send the request to another application without modification.
     * app.mount('/app', anotherApp, {
     *   replaceRequest: (req) => req,
     * })
     * ```
     */
    mount(path, applicationHandler, options) {
      let replaceRequest;
      let optionHandler;
      if (options) {
        if (typeof options === "function") {
          optionHandler = options;
        } else {
          optionHandler = options.optionHandler;
          if (options.replaceRequest === false) {
            replaceRequest = (request) => request;
          } else {
            replaceRequest = options.replaceRequest;
          }
        }
      }
      const getOptions = optionHandler ? (c) => {
        const options2 = optionHandler(c);
        return Array.isArray(options2) ? options2 : [options2];
      } : (c) => {
        let executionContext = void 0;
        try {
          executionContext = c.executionCtx;
        } catch {
        }
        return [c.env, executionContext];
      };
      replaceRequest ||= (() => {
        const mergedPath = mergePath(this._basePath, path);
        const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
        return (request) => {
          const url = new URL(request.url);
          url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
          return new Request(url, request);
        };
      })();
      const handler = async (c, next) => {
        const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
        if (res) {
          return res;
        }
        await next();
      };
      this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
      return this;
    }
    #addRoute(method, path, handler, baseRoutePath) {
      method = method.toUpperCase();
      path = mergePath(this._basePath, path);
      const r = {
        basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
        path,
        method,
        handler
      };
      this.router.add(method, path, [handler, r]);
      this.routes.push(r);
    }
    #handleError(err, c) {
      if (err instanceof Error) {
        return this.errorHandler(err, c);
      }
      throw err;
    }
    #dispatch(request, executionCtx, env, method) {
      if (method === "HEAD") {
        return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
      }
      const path = this.getPath(request, { env });
      const matchResult = this.router.match(method, path);
      const c = new Context(request, {
        path,
        matchResult,
        env,
        executionCtx,
        notFoundHandler: this.#notFoundHandler
      });
      if (matchResult[0].length === 1) {
        let res;
        try {
          res = matchResult[0][0][0][0](c, async () => {
            c.res = await this.#notFoundHandler(c);
          });
        } catch (err) {
          return this.#handleError(err, c);
        }
        return res instanceof Promise ? res.then(
          (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
        ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
      }
      const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
      return (async () => {
        try {
          const context = await composed(c);
          if (!context.finalized) {
            throw new Error(
              "Context is not finalized. Did you forget to return a Response object or `await next()`?"
            );
          }
          return context.res;
        } catch (err) {
          return this.#handleError(err, c);
        }
      })();
    }
    /**
     * `.fetch()` will be entry point of your app.
     *
     * @see {@link https://hono.dev/docs/api/hono#fetch}
     *
     * @param {Request} request - request Object of request
     * @param {Env} env - env Object
     * @param {ExecutionContext} executionCtx - context of execution
     * @returns {Response | Promise<Response>} response of request
     *
     */
    fetch = (request, ...rest) => {
      return this.#dispatch(request, rest[1], rest[0], request.method);
    };
    /**
     * `.request()` is a useful method for testing.
     * You can pass a URL or pathname to send a GET request.
     * app will return a Response object.
     * ```ts
     * test('GET /hello is ok', async () => {
     *   const res = await app.request('/hello')
     *   expect(res.status).toBe(200)
     * })
     * ```
     * @see https://hono.dev/docs/api/hono#request
     */
    request = (input, requestInit, Env, executionCtx) => {
      if (input instanceof Request) {
        return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
      }
      input = input.toString();
      return this.fetch(
        new Request(
          /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
          requestInit
        ),
        Env,
        executionCtx
      );
    };
    /**
     * `.fire()` automatically adds a global fetch event listener.
     * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
     * @deprecated
     * Use `fire` from `hono/service-worker` instead.
     * ```ts
     * import { Hono } from 'hono'
     * import { fire } from 'hono/service-worker'
     *
     * const app = new Hono()
     * // ...
     * fire(app)
     * ```
     * @see https://hono.dev/docs/api/hono#fire
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
     * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
     */
    fire = () => {
      addEventListener("fetch", (event) => {
        event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
      });
    };
  };
  init_url();
  var emptyParam = [];
  function match(method, path) {
    const matchers = this.buildAllMatchers();
    const match2 = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match3 = path2.match(matcher[0]);
      if (!match3) {
        return [[], emptyParam];
      }
      const index = match3.indexOf("", 1);
      return [matcher[1][index], match3];
    };
    this.match = match2;
    return match2(method, path);
  }
  var LABEL_REG_EXP_STR = "[^/]+";
  var ONLY_WILDCARD_REG_EXP_STR = ".*";
  var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
  var PATH_ERROR = /* @__PURE__ */ Symbol();
  var regExpMetaChars = new Set(".\\+*[^]$()");
  function compareKey(a, b) {
    if (a.length === 1) {
      return b.length === 1 ? a < b ? -1 : 1 : -1;
    }
    if (b.length === 1) {
      return 1;
    }
    if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
      return b === TAIL_WILDCARD_REG_EXP_STR ? -1 : 1;
    } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
      return -1;
    }
    if (a === LABEL_REG_EXP_STR) {
      return 1;
    } else if (b === LABEL_REG_EXP_STR) {
      return -1;
    }
    return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
  }
  var Node = class _Node {
    // handler index of a dynamic path, or -1 for a static path terminal
    #index;
    #varIndex;
    #children = /* @__PURE__ */ Object.create(null);
    insert(tokens, index, paramMap, context, isStatic) {
      let node = this;
      for (let i = 0, len = tokens.length; i < len; i++) {
        const token = tokens[i];
        const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : null : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
        let nextNode;
        if (pattern) {
          const name = pattern[1];
          let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
          if (name && pattern[2]) {
            if (regexpStr === ".*") {
              throw PATH_ERROR;
            }
            regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
            if (/\((?!\?:)/.test(regexpStr)) {
              throw PATH_ERROR;
            }
            if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) {
              throw PATH_ERROR;
            }
          }
          nextNode = node.#children[regexpStr];
          if (!nextNode) {
            if (regexpStr !== ONLY_WILDCARD_REG_EXP_STR && regexpStr !== TAIL_WILDCARD_REG_EXP_STR) {
              for (const k in node.#children) {
                if (
                  // a single-char pattern coexists with single-char literals as a literal does
                  (regexpStr.length > 1 || k.length > 1) && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
                ) {
                  throw PATH_ERROR;
                }
              }
            }
            nextNode = node.#children[regexpStr] = new _Node();
          }
          if (name !== "") {
            nextNode.#varIndex ??= context.varIndex++;
            paramMap.push([name, nextNode.#varIndex]);
          }
        } else {
          nextNode = node.#children[token];
          if (!nextNode) {
            for (const k in node.#children) {
              if (k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR) {
                throw PATH_ERROR;
              }
            }
            nextNode = node.#children[token] = new _Node();
          }
        }
        node = nextNode;
      }
      if (node.#index !== void 0) {
        throw PATH_ERROR;
      }
      node.#index = isStatic ? -1 : index;
    }
    buildRegExpStr() {
      const childKeys = Object.keys(this.#children).sort(compareKey);
      const strList = childKeys.map((k) => {
        const c = this.#children[k];
        const childStr = c.buildRegExpStr();
        return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
      }).filter(Boolean);
      if (typeof this.#index === "number" && this.#index !== -1) {
        strList.unshift(`#${this.#index}`);
      }
      if (strList.length === 0) {
        return "";
      }
      if (strList.length === 1) {
        return strList[0];
      }
      return "(?:" + strList.join("|") + ")";
    }
  };
  var Trie = class {
    #context = { varIndex: 0 };
    #root = new Node();
    #index = 0;
    // dynamic path -> [handler index, param assoc]; static paths are not registered
    paths = /* @__PURE__ */ Object.create(null);
    insert(path, isStatic) {
      if (isStatic) {
        this.#root.insert(path.split(""), 0, [], this.#context, true);
        return;
      }
      const paramAssoc = [];
      const groups = [];
      let markedPath = path;
      for (let i = 0; ; ) {
        let replaced = false;
        markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
          const mark = `@\\${i}`;
          groups[i] = [mark, m];
          i++;
          replaced = true;
          return mark;
        });
        if (!replaced) {
          break;
        }
      }
      const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
      for (let i = groups.length - 1; i >= 0; i--) {
        const [mark] = groups[i];
        for (let j = tokens.length - 1; j >= 0; j--) {
          if (tokens[j].indexOf(mark) !== -1) {
            tokens[j] = tokens[j].replace(mark, groups[i][1]);
            break;
          }
        }
      }
      this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
      this.paths[path] = [this.#index++, paramAssoc];
    }
    buildRegExp() {
      let regexp = this.#root.buildRegExpStr();
      if (regexp === "") {
        return [/^$/, [], []];
      }
      let captureIndex = 0;
      const indexReplacementMap = [];
      const paramReplacementMap = [];
      regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
        if (handlerIndex !== void 0) {
          indexReplacementMap[++captureIndex] = Number(handlerIndex);
          return "$()";
        }
        if (paramIndex !== void 0) {
          paramReplacementMap[Number(paramIndex)] = ++captureIndex;
          return "";
        }
        return "";
      });
      return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
    }
  };
  var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
  function buildWildcardRegExp(path) {
    return wildcardRegExpCache[path] ??= new RegExp(
      path === "*" ? "" : `^${path.replace(
        /\/\*$|([.\\+*[^\]$()])/g,
        (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
      )}$`
    );
  }
  function clearWildcardRegExpCache() {
    wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
  }
  function findMiddleware(middleware, path) {
    if (!middleware) {
      return void 0;
    }
    for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
      if (buildWildcardRegExp(k).test(path)) {
        return [...middleware[k]];
      }
    }
    return void 0;
  }
  var RegExpRouter = class {
    name = "RegExpRouter";
    #middleware;
    #routes;
    #tries;
    constructor() {
      this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
      this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
      this.#tries = { [METHOD_NAME_ALL]: new Trie() };
    }
    #insertPath(method, path) {
      try {
        this.#tries[method].insert(path, !/\*|\/:/.test(path));
      } catch (e) {
        throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
      }
    }
    add(method, path, handler) {
      const middleware = this.#middleware;
      const routes = this.#routes;
      if (!middleware || !routes) {
        throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
      }
      if (!middleware[method]) {
        this.#tries[method] = new Trie();
        [middleware, routes].forEach((handlerMap) => {
          handlerMap[method] = /* @__PURE__ */ Object.create(null);
          Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
            handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
            this.#insertPath(method, p);
          });
        });
      }
      if (path === "/*") {
        path = "*";
      }
      const paramCount = (path.match(/\/:/g) || []).length;
      if (/\*$/.test(path)) {
        const re = buildWildcardRegExp(path);
        Object.keys(middleware).forEach((m) => {
          if ((method === METHOD_NAME_ALL || method === m) && !middleware[m][path]) {
            this.#insertPath(m, path);
            middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
          }
        });
        Object.keys(middleware).forEach((m) => {
          if (method === METHOD_NAME_ALL || method === m) {
            Object.keys(middleware[m]).forEach((p) => {
              re.test(p) && middleware[m][p].push([handler, paramCount]);
            });
          }
        });
        Object.keys(routes).forEach((m) => {
          if (method === METHOD_NAME_ALL || method === m) {
            Object.keys(routes[m]).forEach(
              (p) => re.test(p) && routes[m][p].push([handler, paramCount])
            );
          }
        });
        return;
      }
      const paths = checkOptionalParameter(path) || [path];
      for (let i = 0, len = paths.length; i < len; i++) {
        const path2 = paths[i];
        Object.keys(routes).forEach((m) => {
          if (method === METHOD_NAME_ALL || method === m) {
            if (!routes[m][path2]) {
              this.#insertPath(m, path2);
              routes[m][path2] = [
                ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
              ];
            }
            routes[m][path2].push([handler, paramCount - len + i + 1]);
          }
        });
      }
    }
    match = match;
    buildAllMatchers() {
      const matchers = /* @__PURE__ */ Object.create(null);
      Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
        matchers[method] ||= this.#buildMatcher(method);
      });
      this.#middleware = this.#routes = this.#tries = void 0;
      clearWildcardRegExpCache();
      return matchers;
    }
    #buildMatcher(method) {
      const middleware = this.#middleware[method];
      const routes = this.#routes[method];
      const trie = this.#tries[method];
      const staticMap = /* @__PURE__ */ Object.create(null);
      const handlerData = [];
      [middleware, routes].forEach((r) => {
        for (const path in r) {
          const handlers = r[path];
          const pathData = trie.paths[path];
          if (!pathData) {
            staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
            continue;
          }
          const paramAssoc = pathData[1];
          handlerData[pathData[0]] = handlers.map(([h, paramCount]) => {
            const paramIndexMap = /* @__PURE__ */ Object.create(null);
            paramCount -= 1;
            for (; paramCount >= 0; paramCount--) {
              const [key, value] = paramAssoc[paramCount];
              paramIndexMap[key] = value;
            }
            return [h, paramIndexMap];
          });
        }
      });
      const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
      for (let i = 0, len = handlerData.length; i < len; i++) {
        for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
          const map = handlerData[i][j]?.[1];
          if (!map) {
            continue;
          }
          const keys = Object.keys(map);
          for (let k = 0, len3 = keys.length; k < len3; k++) {
            map[keys[k]] = paramReplacementMap[map[keys[k]]];
          }
        }
      }
      const handlerMap = [];
      for (const i in indexReplacementMap) {
        handlerMap[i] = handlerData[indexReplacementMap[i]];
      }
      return [regexp, handlerMap, staticMap];
    }
  };
  var SmartRouter = class {
    name = "SmartRouter";
    #routers = [];
    #routes = [];
    constructor(init) {
      this.#routers = init.routers;
    }
    add(method, path, handler) {
      if (!this.#routes) {
        throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
      }
      this.#routes.push([method, path, handler]);
    }
    match(method, path) {
      if (!this.#routes) {
        throw new Error("Fatal error");
      }
      const routers = this.#routers;
      const routes = this.#routes;
      const len = routers.length;
      let i = 0;
      let res;
      for (; i < len; i++) {
        const router = routers[i];
        try {
          for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
            router.add(...routes[i2]);
          }
          res = router.match(method, path);
        } catch (e) {
          if (e instanceof UnsupportedPathError) {
            continue;
          }
          throw e;
        }
        this.match = router.match.bind(router);
        this.#routers = [router];
        this.#routes = void 0;
        break;
      }
      if (i === len) {
        throw new Error("Fatal error");
      }
      this.name = `SmartRouter + ${this.activeRouter.name}`;
      return res;
    }
    get activeRouter() {
      if (this.#routes || this.#routers.length !== 1) {
        throw new Error("No active router has been determined yet.");
      }
      return this.#routers[0];
    }
  };
  init_url();
  init_url();
  var emptyParams = /* @__PURE__ */ Object.create(null);
  var order = 0;
  var Node2 = class _Node2 {
    #methods = [];
    #children = /* @__PURE__ */ Object.create(null);
    #patterns = [];
    #pattern;
    #params = emptyParams;
    insert(method, path, handler) {
      let curNode = this;
      const parts = splitRoutingPath(path);
      const possibleKeys = /* @__PURE__ */ new Set();
      let i = 0;
      for (const p of parts) {
        const nextP = parts[++i];
        const pattern = getPattern(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
        const isParam = Array.isArray(pattern);
        const key = isParam ? pattern[0] : pattern || p;
        const child = curNode.#children[key] ||= new _Node2();
        if (pattern && !child.#pattern) {
          child.#pattern = pattern;
          curNode.#patterns.push(child);
        }
        curNode = child;
        if (isParam) {
          possibleKeys.add(pattern[1]);
        }
      }
      curNode.#methods.push({
        [method]: {
          handler,
          possibleKeys: [...possibleKeys],
          score: ++order
        }
      });
    }
    #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
      for (let i = 0, len = node.#methods.length; i < len; i++) {
        const m = node.#methods[i];
        const handlerSet = m[method] || m[METHOD_NAME_ALL];
        if (handlerSet) {
          handlerSet.params = /* @__PURE__ */ Object.create(null);
          handlerSets.push(handlerSet);
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
          }
        }
      }
    }
    search(method, path) {
      const handlerSets = [];
      this.#params = emptyParams;
      const curNode = this;
      let curNodes = [curNode];
      const parts = splitPath(path);
      const curNodesQueue = [];
      const len = parts.length;
      let partOffsets = null;
      for (let i = 0; i < len; i++) {
        const part = parts[i];
        const isLast = i === len - 1;
        const tempNodes = [];
        for (let j = 0, len2 = curNodes.length; j < len2; j++) {
          const node = curNodes[j];
          const nextNode = node.#children[part];
          if (nextNode) {
            nextNode.#params = node.#params;
            if (isLast) {
              if (nextNode.#children["*"]) {
                this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
              }
              this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
            } else {
              tempNodes.push(nextNode);
            }
          }
          for (const child of node.#patterns) {
            const pattern = child.#pattern;
            const params = node.#params === emptyParams ? {} : { ...node.#params };
            if (typeof pattern === "string") {
              if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
                this.#pushHandlerSets(handlerSets, child, method, node.#params);
                if (pattern === "*") {
                  child.#params = params;
                  tempNodes.push(child);
                }
              }
              continue;
            }
            const [, name, matcher] = pattern;
            if (!part && matcher === true) {
              continue;
            }
            if (matcher !== true) {
              if (!partOffsets) {
                partOffsets = [];
                let offset = path[0] === "/" ? 1 : 0;
                for (let p = 0; p < len; p++) {
                  partOffsets[p] = offset;
                  offset += parts[p].length + 1;
                }
              }
              const restPathString = path.slice(partOffsets[i]);
              const m = matcher.exec(restPathString);
              if (m) {
                params[name] = m[0];
                this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
                if (m[0].length === restPathString.length && child.#children["*"]) {
                  this.#pushHandlerSets(
                    handlerSets,
                    child.#children["*"],
                    method,
                    node.#params,
                    params
                  );
                }
                for (const _ in child.#children) {
                  child.#params = params;
                  const componentCount = m[0].match(/\//g)?.length ?? 0;
                  const targetCurNodes = curNodesQueue[componentCount] ||= [];
                  targetCurNodes.push(child);
                  break;
                }
                continue;
              }
            }
            if (matcher === true || matcher.test(part)) {
              params[name] = part;
              if (isLast) {
                this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
                if (child.#children["*"]) {
                  this.#pushHandlerSets(
                    handlerSets,
                    child.#children["*"],
                    method,
                    params,
                    node.#params
                  );
                }
              } else {
                child.#params = params;
                tempNodes.push(child);
              }
            }
          }
        }
        const shifted = curNodesQueue.shift();
        curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
      }
      if (handlerSets[1]) {
        handlerSets.sort((a, b) => {
          return a.score - b.score;
        });
      }
      return [handlerSets.map(({ handler, params }) => [handler, params])];
    }
  };
  var TrieRouter = class {
    name = "TrieRouter";
    #node = new Node2();
    add(method, path, handler) {
      for (const result of checkOptionalParameter(path) || [path]) {
        this.#node.insert(method, result, handler);
      }
    }
    match(method, path) {
      return this.#node.search(method, path);
    }
  };
  var Hono2 = class extends Hono {
    /**
     * Creates an instance of the Hono class.
     *
     * @param options - Optional configuration options for the Hono instance.
     */
    constructor(options = {}) {
      super(options);
      this.router = options.router ?? new SmartRouter({
        routers: [new RegExpRouter(), new TrieRouter()]
      });
    }
  };
  var cors = (options) => {
    const opts = {
      origin: "*",
      allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "QUERY"],
      allowHeaders: [],
      exposeHeaders: [],
      ...options
    };
    const exposeHeadersStr = opts.exposeHeaders?.length ? opts.exposeHeaders.join(",") : void 0;
    const allowHeadersStr = opts.allowHeaders?.length ? opts.allowHeaders.join(",") : void 0;
    const findAllowOrigin = ((optsOrigin) => {
      if (typeof optsOrigin === "string") {
        if (optsOrigin === "*") {
          return () => optsOrigin;
        } else {
          return (origin) => optsOrigin === origin ? origin : null;
        }
      } else if (typeof optsOrigin === "function") {
        return optsOrigin;
      } else {
        return (origin) => optsOrigin.includes(origin) ? origin : null;
      }
    })(opts.origin);
    const findAllowMethods = ((optsAllowMethods) => {
      if (typeof optsAllowMethods === "function") {
        return async (origin, c) => (await optsAllowMethods(origin, c)).join(",");
      } else if (Array.isArray(optsAllowMethods)) {
        const methodsStr = optsAllowMethods.join(",");
        return () => methodsStr;
      } else {
        return () => "";
      }
    })(opts.allowMethods);
    return async function cors2(c, next) {
      function set(key, value) {
        c.res.headers.set(key, value);
      }
      const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
      if (allowOrigin) {
        set("Access-Control-Allow-Origin", allowOrigin);
      }
      if (opts.credentials) {
        set("Access-Control-Allow-Credentials", "true");
      }
      if (exposeHeadersStr) {
        set("Access-Control-Expose-Headers", exposeHeadersStr);
      }
      if (c.req.method === "OPTIONS") {
        if (opts.origin !== "*") {
          c.res.headers.append("Vary", "Origin");
        }
        if (opts.maxAge != null) {
          set("Access-Control-Max-Age", opts.maxAge.toString());
        }
        const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
        if (allowMethods) {
          set("Access-Control-Allow-Methods", allowMethods);
        }
        let headersStr = allowHeadersStr;
        if (!headersStr) {
          const requestHeaders = c.req.header("Access-Control-Request-Headers");
          if (requestHeaders) {
            headersStr = requestHeaders.split(",").map((h) => h.trim()).join(",");
          }
        }
        if (headersStr) {
          set("Access-Control-Allow-Headers", headersStr);
          c.res.headers.append("Vary", "Access-Control-Request-Headers");
        }
        c.res.headers.delete("Content-Length");
        c.res.headers.delete("Content-Type");
        return new Response(null, {
          headers: c.res.headers,
          status: 204,
          statusText: "No Content"
        });
      }
      await next();
      if (opts.origin !== "*") {
        c.header("Vary", "Origin", { append: true });
      }
    };
  };
  function getColorEnabled() {
    const { process: process2, Deno } = globalThis;
    const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process2 !== void 0 ? (
      // eslint-disable-next-line no-unsafe-optional-chaining
      "NO_COLOR" in process2?.env
    ) : false;
    return !isNoColor;
  }
  async function getColorEnabledAsync() {
    const { navigator } = globalThis;
    const cfWorkers = "cloudflare:workers";
    const isNoColor = navigator !== void 0 && navigator.userAgent === "Cloudflare-Workers" ? await (async () => {
      try {
        return "NO_COLOR" in ((await import(cfWorkers)).env ?? {});
      } catch {
        return false;
      }
    })() : !getColorEnabled();
    return !isNoColor;
  }
  var humanize = (times) => {
    const [delimiter, separator] = [",", "."];
    const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
    return orderTimes.join(separator);
  };
  var time = (start) => {
    const delta = Date.now() - start;
    return humanize([delta < 1e3 ? delta + "ms" : Math.round(delta / 1e3) + "s"]);
  };
  var colorStatus = async (status) => {
    const colorEnabled = await getColorEnabledAsync();
    if (colorEnabled) {
      switch (status / 100 | 0) {
        case 5:
          return `\x1B[31m${status}\x1B[0m`;
        case 4:
          return `\x1B[33m${status}\x1B[0m`;
        case 3:
          return `\x1B[36m${status}\x1B[0m`;
        case 2:
          return `\x1B[32m${status}\x1B[0m`;
      }
    }
    return `${status}`;
  };
  async function log(fn, prefix, method, path, status = 0, elapsed) {
    const out = prefix === "<--" ? `${prefix} ${method} ${path}` : `${prefix} ${method} ${path} ${await colorStatus(status)} ${elapsed}`;
    fn(out);
  }
  var logger = (fn = console.log) => {
    return async function logger2(c, next) {
      const { method, url } = c.req;
      const path = url.slice(url.indexOf("/", 8));
      await log(fn, "<--", method, path);
      const start = Date.now();
      await next();
      await log(fn, "-->", method, path, c.res.status, time(start));
    };
  };
  init_cookie2();
  var SITE_CONFIG = {
    title: "AI Gateway",
    subtitle: "\u7EDF\u4E00\u7684 AI \u7BA1\u7406\u5E73\u53F0",
    author: "QingYun",
    authorUrl: "https://github.com/yutian81/ai-gateway",
    blogUrl: "https://blog.notett.com",
    description: "AI \u63D0\u4F9B\u5546 API \u4EE3\u7406\u7F51\u5173 \u2014 \u7EDF\u4E00 /v1 \u63A5\u53E3\u8F6C\u53D1",
    favicon: "https://pan.811520.xyz/icon/ai.webp",
    faCdn: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
  };
  var SESSION_TTL = 7 * 24 * 60 * 60;
  var PROXY_KEY_PREFIX = "sk_cf_";
  var OPENCODE_DEFAULT_URL = "https://opencode.ai/zen/v1";
  var KEY_HEALTH_COOLDOWN_MS = 5 * 60 * 1e3;
  var KEY_HEALTH_MAX_FAILURES = 5;
  var KV_KEYS = {
    PROVIDERS: "providers",
    PROXY_KEYS: "proxy:keys",
    SESSION_PREFIX: "admin:session:",
    KEY_HEALTH_PREFIX: "key:health:",
    OPENCODE_MIGRATION: "migration:opencode-default:v1"
  };
  var EXPIRY_OPTIONS = {
    "30d": 30 * 24 * 60 * 60,
    "90d": 90 * 24 * 60 * 60,
    "180d": 180 * 24 * 60 * 60,
    "1y": 365 * 24 * 60 * 60,
    "forever": null
  };
  var DEFAULT_PROVIDERS = [
    {
      id: "opencode",
      name: "OpenCode",
      baseUrl: "https://opencode.ai/zen/v1",
      apiType: "openai",
      apiKeys: [],
      models: [
        { id: "deepseek-v4-flash-free", enabled: true },
        { id: "mimo-v2.5-free", enabled: true },
        { id: "nemotron-3-ultra-free", enabled: true },
        { id: "hy3-free", enabled: true }
      ],
      enabled: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  async function getProviders(env) {
    const data = await env.KV.get(KV_KEYS.PROVIDERS);
    return data ? JSON.parse(data) : [];
  }
  async function getProvider(env, id) {
    const providers = await getProviders(env);
    return providers.find((p) => p.id === id) ?? null;
  }
  async function setProviders(env, providers) {
    await env.KV.put(KV_KEYS.PROVIDERS, JSON.stringify(providers));
  }
  async function addProvider(env, provider) {
    const providers = await getProviders(env);
    providers.push(provider);
    await setProviders(env, providers);
  }
  async function updateProvider(env, id, updates) {
    const providers = await getProviders(env);
    const index = providers.findIndex((p) => p.id === id);
    if (index === -1)
      return null;
    providers[index] = { ...providers[index], ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    await setProviders(env, providers);
    return providers[index];
  }
  async function deleteProvider(env, id) {
    const providers = await getProviders(env);
    const filtered = providers.filter((p) => p.id !== id);
    if (filtered.length === providers.length)
      return false;
    await setProviders(env, filtered);
    return true;
  }
  async function createSession(env, username, ttlSeconds) {
    const sessionId = crypto.randomUUID();
    const session = {
      username,
      expiresAt: Date.now() + ttlSeconds * 1e3
    };
    await env.KV.put(KV_KEYS.SESSION_PREFIX + sessionId, JSON.stringify(session), {
      expirationTtl: ttlSeconds
    });
    return sessionId;
  }
  async function getSession(env, sessionId) {
    const data = await env.KV.get(KV_KEYS.SESSION_PREFIX + sessionId);
    if (!data)
      return null;
    const session = JSON.parse(data);
    if (session.expiresAt < Date.now()) {
      await deleteSession(env, sessionId);
      return null;
    }
    return session;
  }
  async function deleteSession(env, sessionId) {
    await env.KV.delete(KV_KEYS.SESSION_PREFIX + sessionId);
  }
  async function getProxyKeys(env) {
    const data = await env.KV.get(KV_KEYS.PROXY_KEYS);
    return data ? JSON.parse(data) : [];
  }
  async function setProxyKeys(env, keys) {
    await env.KV.put(KV_KEYS.PROXY_KEYS, JSON.stringify(keys));
  }
  async function addProxyKey(env, key) {
    const keys = await getProxyKeys(env);
    keys.push(key);
    await setProxyKeys(env, keys);
  }
  async function deleteProxyKey(env, id) {
    const keys = await getProxyKeys(env);
    const filtered = keys.filter((k) => k.id !== id);
    if (filtered.length === keys.length)
      return false;
    await setProxyKeys(env, filtered);
    return true;
  }
  async function updateProxyKey(env, id, updates) {
    const keys = await getProxyKeys(env);
    const idx = keys.findIndex((k) => k.id === id);
    if (idx === -1)
      return null;
    keys[idx] = { ...keys[idx], ...updates };
    await setProxyKeys(env, keys);
    return keys[idx];
  }
  async function validateProxyKey(env, key) {
    const keys = await getProxyKeys(env);
    return keys.some((k) => {
      if (k.key !== key || !k.enabled)
        return false;
      if (k.expiresAt) {
        const now = Date.now();
        const expires = new Date(k.expiresAt).getTime();
        if (now >= expires)
          return false;
      }
      return true;
    });
  }
  async function seedInitialData(env) {
    const providers = await getProviders(env);
    const migrationCompleted = await env.KV.get(KV_KEYS.OPENCODE_MIGRATION);
    const opencode = DEFAULT_PROVIDERS.find((provider) => provider.id === "opencode");
    if (!migrationCompleted) {
      if (opencode && !providers.some((provider) => provider.id === opencode.id)) {
        await setProviders(env, [
          ...providers,
          {
            ...opencode,
            apiKeys: opencode.apiKeys.map((key) => ({ ...key })),
            models: opencode.models.map((model) => ({ ...model }))
          }
        ]);
      }
      await env.KV.put(KV_KEYS.OPENCODE_MIGRATION, "1");
    }
    if (providers.length === 0 && !migrationCompleted) {
      const keys = await getProxyKeys(env);
      if (keys.length === 0) {
        const testKey = {
          id: crypto.randomUUID(),
          key: `${PROXY_KEY_PREFIX}${crypto.randomUUID().replace(/-/g, "").substring(0, 16)}`,
          name: "\u6D4B\u8BD5 Key",
          enabled: true,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        await addProxyKey(env, testKey);
      }
    }
  }
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async function adminAuthMiddleware(c, next) {
    const sessionId = getCookie(c, "session_id");
    if (!sessionId) {
      const url = new URL(c.req.url);
      if (url.pathname === "/admin/login")
        return next();
      if (url.pathname.startsWith("/admin/api/")) {
        return c.json({ success: false, message: "\u672A\u767B\u5F55" }, 401);
      }
      return c.redirect("/admin/login");
    }
    const session = await getSession(c.env, sessionId);
    if (!session) {
      deleteCookie(c, "session_id");
      const url = new URL(c.req.url);
      if (url.pathname.startsWith("/admin/api/")) {
        return c.json({ success: false, message: "Session \u5DF2\u8FC7\u671F" }, 401);
      }
      return c.redirect("/admin/login");
    }
    ;
    c.set("username", session.username);
    return next();
  }
  async function handleLogin(c) {
    const { username, password } = await c.req.json();
    const adminUser = c.env.ADMIN_USERNAME;
    const adminPass = c.env.ADMIN_PASSWORD;
    if (!adminUser || !adminPass) {
      return c.json({
        success: false,
        message: "\u672A\u914D\u7F6E\u7BA1\u7406\u5458\u8D26\u53F7\uFF0C\u8BF7\u5728 Cloudflare \u73AF\u5883\u53D8\u91CF\u4E2D\u8BBE\u7F6E ADMIN_USERNAME \u548C ADMIN_PASSWORD"
      }, 500);
    }
    if (!username || !password) {
      return c.json({ success: false, message: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801" }, 400);
    }
    if (username !== adminUser) {
      return c.json({ success: false, message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF" }, 401);
    }
    const passwordHash = await hashPassword(password);
    const adminPassHash = await hashPassword(adminPass);
    if (passwordHash !== adminPassHash) {
      return c.json({ success: false, message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF" }, 401);
    }
    const sessionId = await createSession(c.env, username, SESSION_TTL);
    setCookie(c, "session_id", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
      maxAge: SESSION_TTL
    });
    return c.json({ success: true, message: "\u767B\u5F55\u6210\u529F" });
  }
  async function handleLogout(c) {
    const sessionId = getCookie(c, "session_id");
    if (sessionId) {
      await deleteSession(c.env, sessionId);
      deleteCookie(c, "session_id");
    }
    return c.redirect("/");
  }
  async function proxyKeyAuthMiddleware(c, next) {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({
        error: { message: "\u7F3A\u5C11\u6216\u65E0\u6548\u7684 Authorization \u5934\uFF0C\u683C\u5F0F: Bearer sk_cf_*", type: "authentication_error" }
      }, 401);
    }
    const token = authHeader.slice(7);
    const isValid = await validateProxyKey(c.env, token);
    if (!isValid) {
      return c.json({
        error: { message: "API Key \u65E0\u6548\u6216\u5DF2\u7981\u7528", type: "authentication_error" }
      }, 401);
    }
    return next();
  }
  var OPENCODE_PROVIDER_ID = "opencode";
  var OPENCODE_VERSION = "1.17.8";
  var OPENCODE_TIMEOUT_MS = 6e4;
  function isOpenCodeProvider(providerId) {
    return providerId === OPENCODE_PROVIDER_ID;
  }
  function filterOpenCodeModels(models) {
    return models.filter((model) => typeof model.id === "string" && /^[A-Za-z0-9._:/-]+$/.test(model.id) && (model.id === "big-pickle" || model.id.endsWith("-free")));
  }
  function resolveOpenCodeUrls(env) {
    const raw2 = env.OPENCODE_MIRRORS_URL || "";
    const parts = raw2.split("\n").flatMap((s) => s.split(",")).map((s) => s.trim()).filter(Boolean);
    return [...new Set(parts)];
  }
  function getMirrorOrder(urls, random) {
    if (urls.length === 0)
      return [];
    const start = Math.floor(random() * urls.length);
    return [
      ...urls.slice(start),
      ...urls.slice(0, start)
    ];
  }
  function buildUrl(baseUrl, subPath, search = "") {
    return `${baseUrl.replace(/\/+$/, "")}/${subPath.replace(/^\/+/, "")}${search}`;
  }
  function createOpenCodeId(prefix) {
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    let binary = "";
    for (const byte of bytes)
      binary += String.fromCharCode(byte);
    const random = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "").slice(0, 16);
    return `${prefix}_${Date.now().toString(16)}${random}`;
  }
  function createRequestHeaders(apiKey, requestId, sessionId) {
    return new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "User-Agent": `opencode/${OPENCODE_VERSION} ai-sdk/provider-utils/4.0.23 runtime/bun/1.3.13`,
      "x-opencode-client": "cli",
      "x-opencode-project": "global",
      "x-opencode-request": requestId,
      "x-opencode-session": sessionId
    });
  }
  async function storeFailure(response) {
    return {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
      body: await response.arrayBuffer()
    };
  }
  function restoreFailure(failure) {
    return new Response(failure.body, {
      status: failure.status,
      statusText: failure.statusText,
      headers: failure.headers
    });
  }
  function transportErrorResponse(error) {
    const message = error instanceof Error && error.message ? error.message : "OpenCode \u4E0A\u6E38\u8BF7\u6C42\u5931\u8D25";
    return new Response(JSON.stringify({
      error: { message, type: "proxy_error" }
    }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
  async function requestUpstream(fetcher, url, apiKey, options, requestId, sessionId) {
    return fetcher(url, {
      method: options.method,
      headers: createRequestHeaders(apiKey, requestId, sessionId),
      body: options.method === "GET" || options.method === "HEAD" ? void 0 : options.body,
      signal: AbortSignal.timeout(OPENCODE_TIMEOUT_MS)
    });
  }
  async function proxyOpenCodeRequest(options) {
    const fetcher = options.fetcher ?? fetch;
    const random = options.random ?? Math.random;
    const requestId = createOpenCodeId("msg");
    const sessionId = createOpenCodeId("ses");
    let officialFailure = null;
    let mirrorFailure = null;
    let lastTransportError = null;
    const enabledKeys = options.apiKeys.filter((entry) => entry.enabled && entry.key);
    const officialUrl = buildUrl(options.baseUrl, options.subPath, options.search);
    for (const entry of enabledKeys) {
      try {
        const response = await requestUpstream(
          fetcher,
          officialUrl,
          entry.key,
          options,
          requestId,
          sessionId
        );
        if (response.ok)
          return response;
        officialFailure = await storeFailure(response);
        if (response.status !== 401 && response.status !== 403 && response.status !== 429)
          break;
      } catch (error) {
        lastTransportError = error;
        break;
      }
    }
    for (const mirror of getMirrorOrder(options.mirrorUrls, random)) {
      try {
        const response = await requestUpstream(
          fetcher,
          buildUrl(mirror, options.subPath, options.search),
          "public",
          options,
          requestId,
          sessionId
        );
        if (response.ok)
          return response;
        mirrorFailure = await storeFailure(response);
      } catch (error) {
        lastTransportError = error;
      }
    }
    if (officialFailure)
      return restoreFailure(officialFailure);
    if (mirrorFailure)
      return restoreFailure(mirrorFailure);
    return transportErrorResponse(lastTransportError);
  }
  async function testOpenCodeModel(baseUrl, apiKeys, modelId, mirrorUrls, fetcher) {
    const response = await proxyOpenCodeRequest({
      baseUrl,
      apiKeys,
      mirrorUrls,
      method: "POST",
      subPath: "chat/completions",
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1
      }),
      fetcher
    });
    if (response.ok) {
      return { success: true, message: "\u8FDE\u63A5\u6210\u529F", statusCode: response.status };
    }
    const body = await response.text();
    return {
      success: false,
      message: `HTTP ${response.status}: ${body.substring(0, 200)}`,
      statusCode: response.status
    };
  }
  async function fetchOpenCodeModels(baseUrl, apiKeys, mirrorUrls, fetcher) {
    const response = await proxyOpenCodeRequest({
      baseUrl,
      apiKeys,
      mirrorUrls,
      method: "GET",
      subPath: "models",
      fetcher
    });
    if (!response.ok) {
      return {
        success: false,
        message: `HTTP ${response.status}: ${(await response.text()).substring(0, 200)}`,
        statusCode: response.status
      };
    }
    const data = await response.json();
    return {
      success: true,
      message: "\u8FDE\u63A5\u6210\u529F",
      statusCode: response.status,
      data: {
        ...data,
        data: Array.isArray(data.data) ? filterOpenCodeModels(data.data) : []
      }
    };
  }
  var HEALTH_KEY = (providerId) => KV_KEYS.KEY_HEALTH_PREFIX + providerId;
  async function readHealth(env, providerId) {
    const raw2 = await env.KV.get(HEALTH_KEY(providerId));
    return raw2 ? JSON.parse(raw2) : {};
  }
  async function writeHealth(env, providerId, health) {
    const filtered = {};
    for (const [k, v] of Object.entries(health)) {
      if (v.failures > 0)
        filtered[k] = v;
    }
    if (Object.keys(filtered).length > 0) {
      await env.KV.put(HEALTH_KEY(providerId), JSON.stringify(filtered));
    } else {
      await env.KV.delete(HEALTH_KEY(providerId)).catch(() => {
      });
    }
  }
  function parseModelId(model) {
    const slashIndex = model.indexOf("/");
    if (slashIndex === -1)
      return null;
    return {
      providerId: model.substring(0, slashIndex),
      modelId: model.substring(slashIndex + 1)
    };
  }
  async function testModelConnection(baseUrl, apiKey, modelId, apiType) {
    try {
      const cleanBase = baseUrl.replace(/\/$/, "");
      const endpoint = apiType === "anthropic" ? "messages" : "chat/completions";
      const url = `${cleanBase}/${endpoint}`;
      const headers = {
        "Content-Type": "application/json"
      };
      if (apiType === "anthropic") {
        headers["x-api-key"] = apiKey;
        headers["anthropic-version"] = "2023-06-01";
      } else {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: "user", content: "hi" }],
          max_tokens: 1
        }),
        signal: AbortSignal.timeout(15e3)
      });
      if (response.ok) {
        return { success: true, message: "\u8FDE\u63A5\u6210\u529F", statusCode: response.status };
      }
      let errorBody = "";
      try {
        const errorData = await response.json();
        errorBody = errorData?.error?.message || JSON.stringify(errorData);
      } catch {
        errorBody = await response.text();
      }
      return {
        success: false,
        message: `HTTP ${response.status}: ${errorBody.substring(0, 200)}`,
        statusCode: response.status
      };
    } catch (err) {
      const error = err;
      return {
        success: false,
        message: `\u8FDE\u63A5\u5931\u8D25: ${error.message?.substring(0, 200) || "\u672A\u77E5\u9519\u8BEF"}`
      };
    }
  }
  async function handleProxy(c) {
    try {
      const body = await c.req.json();
      const model = body.model;
      if (!model) {
        return c.json({ error: { message: "\u7F3A\u5C11 model \u53C2\u6570", type: "invalid_request_error" } }, 400);
      }
      const parsed = parseModelId(model);
      if (!parsed) {
        return c.json({
          error: {
            message: `\u6A21\u578B\u683C\u5F0F\u9519\u8BEF "${model}"\uFF0C\u8BF7\u4F7F\u7528 \u63D0\u4F9B\u5546ID/\u6A21\u578BID \u683C\u5F0F`,
            type: "invalid_request_error"
          }
        }, 400);
      }
      const { providerId, modelId } = parsed;
      const provider = await getProvider(c.env, providerId);
      if (!provider) {
        return c.json({
          error: { message: `\u63D0\u4F9B\u5546 "${providerId}" \u4E0D\u5B58\u5728`, type: "invalid_request_error" }
        }, 404);
      }
      if (!provider.enabled) {
        return c.json({
          error: { message: `\u63D0\u4F9B\u5546 "${provider.name}" \u5DF2\u7981\u7528`, type: "provider_disabled" }
        }, 403);
      }
      const modelConfig = provider.models.find((m) => m.id === modelId);
      if (!modelConfig) {
        return c.json({
          error: { message: `\u6A21\u578B "${modelId}" \u672A\u5728\u63D0\u4F9B\u5546 "${provider.name}" \u4E2D\u914D\u7F6E`, type: "invalid_request_error" }
        }, 404);
      }
      if (!modelConfig.enabled) {
        return c.json({
          error: { message: `\u6A21\u578B "${modelId}" \u5DF2\u7981\u7528`, type: "model_disabled" }
        }, 403);
      }
      const enabledKeys = provider.apiKeys.filter((k) => k.enabled);
      const forwardBody = { ...body, model: modelId };
      const url = new URL(c.req.url);
      const subPath = url.pathname.replace(/^\/v1\//, "") || "chat/completions";
      if (isOpenCodeProvider(providerId)) {
        const response = await proxyOpenCodeRequest({
          baseUrl: provider.baseUrl,
          apiKeys: enabledKeys,
          method: c.req.method,
          subPath,
          search: url.search,
          body: JSON.stringify(forwardBody),
          mirrorUrls: resolveOpenCodeUrls(c.env)
        });
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      }
      if (enabledKeys.length === 0) {
        return c.json({
          error: { message: `\u63D0\u4F9B\u5546 "${provider.name}" \u672A\u914D\u7F6E\u53EF\u7528\u7684 API Key`, type: "configuration_error" }
        }, 500);
      }
      const cleanBase = provider.baseUrl.replace(/\/$/, "");
      const forwardUrl = `${cleanBase}/${subPath}${url.search}`;
      const healthData = await readHealth(c.env, providerId);
      const healthy = [];
      const unhealthy = [];
      const probation = [];
      const demoted = [];
      if (enabledKeys.length === 1) {
        healthy.push(0);
      } else {
        for (let i = 0; i < enabledKeys.length; i++) {
          const h = healthData[enabledKeys[i].key];
          if (h && h.failures >= KEY_HEALTH_MAX_FAILURES) {
            if (!h.demotedAt) {
              h.demotedAt = Date.now();
            }
            if (Date.now() - h.demotedAt >= KEY_HEALTH_COOLDOWN_MS) {
              probation.push(i);
            } else {
              demoted.push(i);
            }
          } else if (h && h.lastFailed) {
            unhealthy.push(i);
          } else {
            healthy.push(i);
          }
        }
      }
      for (let i = healthy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [healthy[i], healthy[j]] = [healthy[j], healthy[i]];
      }
      const keyOrder = [...healthy, ...unhealthy, ...probation];
      if (keyOrder.length === 0 && demoted.length > 0) {
        keyOrder.push(...demoted);
        console.log(`[proxy] ${providerId}: all keys demoted, falling back to ${demoted.length} key(s)`);
      }
      if (demoted.length > 0 || probation.length > 0) {
        console.log(`[proxy] ${providerId}: ${demoted.length} key(s) demoted, ${probation.length} key(s) on probation (cooldown expired)`);
      }
      let lastError = null;
      let healthUpdated = false;
      for (const keyIndex of keyOrder) {
        const apiKey = enabledKeys[keyIndex].key;
        try {
          const forwardHeaders = {
            "Content-Type": "application/json"
          };
          if (provider.apiType === "anthropic") {
            forwardHeaders["x-api-key"] = apiKey;
            forwardHeaders["anthropic-version"] = "2023-06-01";
          } else {
            forwardHeaders["Authorization"] = `Bearer ${apiKey}`;
          }
          const response = await fetch(forwardUrl, {
            method: c.req.method,
            headers: forwardHeaders,
            body: JSON.stringify(forwardBody),
            signal: AbortSignal.timeout(6e4)
          });
          if (response.ok) {
            if (healthData[apiKey]?.failures > 0) {
              delete healthData[apiKey];
              healthUpdated = true;
            }
            if (healthUpdated)
              await writeHealth(c.env, providerId, healthData);
            const responseHeaders = {
              "Content-Type": response.headers.get("Content-Type") || "application/json",
              "Cache-Control": "no-store"
            };
            return new Response(response.body, {
              status: response.status,
              headers: responseHeaders
            });
          }
          if (response.status === 429) {
            lastError = response;
            continue;
          }
          if (response.status === 401 || response.status === 403 || response.status >= 500) {
            const h = healthData[apiKey] || { failures: 0, lastFailed: false };
            h.failures++;
            h.lastFailed = true;
            if (h.failures >= KEY_HEALTH_MAX_FAILURES) {
              h.demotedAt = Date.now();
            }
            healthData[apiKey] = h;
            healthUpdated = true;
            lastError = response;
            continue;
          }
          const errorData = await response.json().catch(async () => ({ error: { message: await response.text() } }));
          return c.json(errorData, response.status);
        } catch (err) {
          const error = err;
          const h = healthData[apiKey] || { failures: 0, lastFailed: false };
          h.failures++;
          h.lastFailed = true;
          if (h.failures >= KEY_HEALTH_MAX_FAILURES) {
            h.demotedAt = Date.now();
          }
          healthData[apiKey] = h;
          healthUpdated = true;
          lastError = new Response(JSON.stringify({
            error: { message: error.message || "\u8BF7\u6C42\u5931\u8D25", type: "proxy_error" }
          }), { status: 502 });
          continue;
        }
      }
      if (healthUpdated)
        await writeHealth(c.env, providerId, healthData);
      if (lastError) {
        const errorBody = await lastError.text().catch(() => "\u6240\u6709 API Key \u5747\u5931\u8D25");
        return c.json({
          error: {
            message: `\u6240\u6709 API Key \u5DF2\u7528\u5B8C\uFF0C\u6700\u540E\u4E00\u6B21\u9519\u8BEF: HTTP ${lastError.status}`,
            type: "key_exhausted",
            detail: errorBody.substring(0, 500)
          }
        }, lastError.status || 502);
      }
      return c.json({
        error: { message: "\u6CA1\u6709\u53EF\u7528\u7684 API Key", type: "configuration_error" }
      }, 500);
    } catch (err) {
      const error = err;
      return c.json({
        error: { message: error.message || "\u4EE3\u7406\u8F6C\u53D1\u5185\u90E8\u9519\u8BEF", type: "server_error" }
      }, 500);
    }
  }
  async function handleModels(c) {
    const providers = await getProviders(c.env);
    const models = [];
    for (const provider of providers) {
      if (!provider.enabled)
        continue;
      for (const model of provider.models) {
        if (!model.enabled)
          continue;
        models.push({
          id: `${provider.id}/${model.id}`,
          provider: provider.id,
          provider_name: provider.name,
          object: "model",
          created: Math.floor(Date.now() / 1e3),
          owned_by: provider.id
        });
      }
    }
    return c.json({
      object: "list",
      data: models
    });
  }
  function normalizeArray(items, mapFn) {
    if (!Array.isArray(items))
      return [];
    if (items.length === 0 || typeof items[0] === "string") {
      return items.map(mapFn);
    }
    return items;
  }
  async function handleStatus(c) {
    const providers = await getProviders(c.env);
    const proxyKeys = await getProxyKeys(c.env);
    const totalModels = providers.reduce((sum, p) => sum + p.models.length, 0);
    const enabledModels = providers.reduce(
      (sum, p) => sum + p.models.filter((m) => m.enabled).length,
      0
    );
    return c.json({
      success: true,
      data: {
        providersCount: providers.length,
        enabledProvidersCount: providers.filter((p) => p.enabled).length,
        modelsCount: totalModels,
        enabledModelsCount: enabledModels,
        proxyKeysCount: proxyKeys.filter((k) => k.enabled).length,
        adminConfigured: !!(c.env.ADMIN_USERNAME && c.env.ADMIN_PASSWORD),
        baseUrl: new URL(c.req.url).origin
      }
    });
  }
  async function handleGetProviders(c) {
    const providers = await getProviders(c.env);
    return c.json({ success: true, data: providers });
  }
  async function handleCreateProvider(c) {
    const body = await c.req.json();
    if (body.id === "opencode" && !body.baseUrl) {
      body.baseUrl = OPENCODE_DEFAULT_URL;
    }
    if (!body.id || !body.name || !body.baseUrl) {
      return c.json({ success: false, message: "id\u3001name\u3001baseUrl \u4E3A\u5FC5\u586B\u9879" }, 400);
    }
    const providers = await getProviders(c.env);
    if (providers.some((p) => p.id === body.id)) {
      return c.json({ success: false, message: `\u63D0\u4F9B\u5546 id "${body.id}" \u5DF2\u5B58\u5728` }, 409);
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const provider = {
      id: body.id,
      name: body.name,
      baseUrl: body.baseUrl.replace(/\/$/, ""),
      apiType: body.apiType || "openai",
      apiKeys: normalizeArray(body.apiKeys, (k) => ({ key: k, enabled: true })),
      models: body.models ? normalizeArray(body.models, (m) => ({ id: m, enabled: true })) : [],
      enabled: body.enabled !== void 0 ? body.enabled : true,
      createdAt: now,
      updatedAt: now
    };
    await addProvider(c.env, provider);
    return c.json({ success: true, data: provider }, 201);
  }
  async function handleUpdateProvider(c) {
    const id = c.req.param("id");
    if (!id)
      return c.json({ success: false, message: "\u7F3A\u5C11 id \u53C2\u6570" }, 400);
    const body = await c.req.json();
    const updates = {};
    if (body.name !== void 0)
      updates.name = body.name;
    if (body.baseUrl !== void 0)
      updates.baseUrl = body.baseUrl.replace(/\/$/, "");
    if (body.apiType !== void 0)
      updates.apiType = body.apiType;
    if (body.apiKeys !== void 0) {
      updates.apiKeys = normalizeArray(body.apiKeys, (k) => ({ key: k, enabled: true }));
    }
    if (body.enabled !== void 0)
      updates.enabled = body.enabled;
    if (body.models !== void 0) {
      updates.models = normalizeArray(body.models, (m) => ({ id: m, enabled: true }));
    }
    const updated = await updateProvider(c.env, id, updates);
    if (!updated) {
      return c.json({ success: false, message: "\u63D0\u4F9B\u5546\u4E0D\u5B58\u5728" }, 404);
    }
    return c.json({ success: true, data: updated });
  }
  async function handleDeleteProvider(c) {
    const id = c.req.param("id");
    if (!id)
      return c.json({ success: false, message: "\u7F3A\u5C11 id \u53C2\u6570" }, 400);
    const deleted = await deleteProvider(c.env, id);
    if (!deleted) {
      return c.json({ success: false, message: "\u63D0\u4F9B\u5546\u4E0D\u5B58\u5728" }, 404);
    }
    return c.json({ success: true, message: "\u63D0\u4F9B\u5546\u5DF2\u5220\u9664" });
  }
  async function handleTestModel(c) {
    const id = c.req.param("id");
    if (!id)
      return c.json({ success: false, message: "\u7F3A\u5C11 id \u53C2\u6570" }, 400);
    const { modelId } = await c.req.json();
    if (!modelId) {
      return c.json({ success: false, message: "modelId \u4E3A\u5FC5\u586B\u9879" }, 400);
    }
    const provider = await getProvider(c.env, id);
    if (!provider) {
      return c.json({ success: false, message: "\u63D0\u4F9B\u5546\u4E0D\u5B58\u5728" }, 404);
    }
    const modelConfig = provider.models.find((m) => m.id === modelId);
    if (!modelConfig) {
      return c.json({ success: false, message: `\u6A21\u578B "${modelId}" \u4E0D\u5B58\u5728\u4E8E\u63D0\u4F9B\u5546 "${provider.name}"` }, 404);
    }
    const enabledKeys = provider.apiKeys.filter((k) => k.enabled);
    if (!isOpenCodeProvider(provider.id) && enabledKeys.length === 0) {
      return c.json({ success: false, message: "\u8BE5\u63D0\u4F9B\u5546\u672A\u914D\u7F6E\u53EF\u7528\u7684 API Key" }, 400);
    }
    const result = isOpenCodeProvider(provider.id) ? await testOpenCodeModel(provider.baseUrl, enabledKeys, modelId, resolveOpenCodeUrls(c.env)) : await testModelConnection(provider.baseUrl, enabledKeys[0].key, modelId, provider.apiType);
    return c.json({
      success: true,
      data: result
    });
  }
  function buildAuthHeaders(apiKey, apiType) {
    if (apiType === "anthropic") {
      return { "x-api-key": apiKey, "anthropic-version": "2023-06-01" };
    }
    return { "Authorization": `Bearer ${apiKey}` };
  }
  async function handleTestKeyNew(c) {
    const { url, apiKey, apiType, providerId } = await c.req.json();
    if (!url || !apiKey && !(providerId && isOpenCodeProvider(providerId))) {
      return c.json({ success: false, message: "url \u548C apiKey \u4E3A\u5FC5\u586B\u9879" }, 400);
    }
    if (providerId && isOpenCodeProvider(providerId)) {
      if (!apiKey) {
        const mirrors = resolveOpenCodeUrls(c.env);
        if (mirrors.length === 0) {
          return c.json({
            success: true,
            data: { success: false, statusCode: 0, message: "\u8BF7\u5148\u586B\u5199 API Key \u6216\u914D\u7F6E OPENCODE_MIRRORS_URL \u73AF\u5883\u53D8\u91CF" }
          });
        }
      }
      const result = await fetchOpenCodeModels(url, [{ key: apiKey, enabled: true }], resolveOpenCodeUrls(c.env));
      return c.json({
        success: true,
        data: {
          success: result.success,
          statusCode: result.statusCode || 0,
          message: result.message,
          data: result.data
        }
      });
    }
    const cleanBase = url.replace(/\/$/, "");
    try {
      const response = await fetch(`${cleanBase}/models`, {
        method: "GET",
        headers: buildAuthHeaders(apiKey, apiType),
        signal: AbortSignal.timeout(15e3)
      });
      let data = null;
      if (response.ok) {
        try {
          data = await response.json();
        } catch {
        }
      }
      return c.json({
        success: true,
        data: { success: response.ok, statusCode: response.status, data }
      });
    } catch (err) {
      return c.json({
        success: true,
        data: { success: false, statusCode: 0, message: err.message || "\u8FDE\u63A5\u5931\u8D25" }
      });
    }
  }
  async function handleTestModelNew(c) {
    const { url, apiKey, apiType, model, providerId } = await c.req.json();
    if (!url || !model || !apiKey && !isOpenCodeProvider(providerId || "")) {
      return c.json({ success: false, message: "url\u3001apiKey\u3001model \u4E3A\u5FC5\u586B\u9879" }, 400);
    }
    if (providerId && isOpenCodeProvider(providerId)) {
      const apiKeys = apiKey ? [{ key: apiKey, enabled: true }] : [];
      const result = await testOpenCodeModel(url, apiKeys, model, resolveOpenCodeUrls(c.env));
      return c.json({
        success: true,
        data: { success: result.success, statusCode: result.statusCode || 0, message: result.message }
      });
    }
    const cleanBase = url.replace(/\/$/, "");
    const endpoint = apiType === "anthropic" ? "messages" : "chat/completions";
    try {
      const response = await fetch(`${cleanBase}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...buildAuthHeaders(apiKey, apiType) },
        body: JSON.stringify({ model, messages: [{ role: "user", content: "hi" }], max_tokens: 1 }),
        signal: AbortSignal.timeout(15e3)
      });
      return c.json({
        success: true,
        data: { success: response.ok, statusCode: response.status }
      });
    } catch (err) {
      return c.json({
        success: true,
        data: { success: false, statusCode: 0, message: err.message || "\u8FDE\u63A5\u5931\u8D25" }
      });
    }
  }
  async function handleGetProxyKeys(c) {
    const keys = await getProxyKeys(c.env);
    const maskedKeys = keys.map((k) => ({
      ...k,
      key: k.key.length > 12 ? k.key.substring(0, 8) + "****" + k.key.substring(k.key.length - 4) : k.key
    }));
    return c.json({ success: true, data: maskedKeys });
  }
  async function handleCreateProxyKey(c) {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const randomPart = crypto.randomUUID().replace(/-/g, "");
    const key = `${PROXY_KEY_PREFIX}${randomPart}`;
    let expiresAt = null;
    if (body.expiresIn && body.expiresIn !== "forever") {
      const ttl = EXPIRY_OPTIONS[body.expiresIn];
      if (ttl) {
        expiresAt = new Date(Date.now() + ttl * 1e3).toISOString();
      }
    }
    const proxyKey = {
      id,
      key,
      name: body.name || `Key-${(/* @__PURE__ */ new Date()).toLocaleDateString()}`,
      enabled: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      expiresAt
    };
    await addProxyKey(c.env, proxyKey);
    return c.json({
      success: true,
      data: proxyKey,
      message: "\u8BF7\u7ACB\u5373\u4FDD\u5B58\u6B64 Key\uFF0C\u5173\u95ED\u540E\u5C06\u4E0D\u518D\u663E\u793A"
    }, 201);
  }
  async function handleDeleteProxyKey(c) {
    const id = c.req.param("id");
    if (!id)
      return c.json({ success: false, message: "\u7F3A\u5C11 id \u53C2\u6570" }, 400);
    const deleted = await deleteProxyKey(c.env, id);
    if (!deleted) {
      return c.json({ success: false, message: "\u8F6C\u53D1 Key \u4E0D\u5B58\u5728" }, 404);
    }
    return c.json({ success: true, message: "\u8F6C\u53D1 Key \u5DF2\u5220\u9664" });
  }
  async function handleUpdateProxyKey(c) {
    const id = c.req.param("id");
    if (!id)
      return c.json({ success: false, message: "\u7F3A\u5C11 id \u53C2\u6570" }, 400);
    const body = await c.req.json();
    const updates = {};
    if (body.enabled !== void 0)
      updates.enabled = body.enabled;
    const updated = await updateProxyKey(c.env, id, updates);
    if (!updated) {
      return c.json({ success: false, message: "\u8F6C\u53D1 Key \u4E0D\u5B58\u5728" }, 404);
    }
    return c.json({ success: true, data: updated });
  }
  var CSS_CONTENT = `
/* \u4E2D\u6587\u8BF4\u660E\uFF1A\u65B9\u6848 A\u300CCloud Workbench\u300D\u7EDF\u4E00\u9996\u9875\u3001\u767B\u5F55\u9875\u548C\u7BA1\u7406\u9875\u7684\u8BBE\u8BA1\u8BED\u8A00\uFF1B\u4E0D\u6D89\u53CA\u540E\u7AEF\u903B\u8F91\u3002 */
/* Hallmark \xB7 genre: modern-minimal \xB7 macrostructure: Workbench \xB7 design-system: design.md \xB7 designed-as-app
 * Hallmark \xB7 pre-emit critique: P5 H5 E4 S5 R5 V5
 */
:root {
  --color-paper: oklch(98.5% 0.004 250);
  --color-paper-a: oklch(98.5% 0.004 250 / .94);
  --color-paper-2: oklch(96.7% 0.006 250);
  --color-paper-3: oklch(94.8% 0.008 250);
  --color-ink: oklch(22% 0.020 258);
  --color-ink-2: oklch(34% 0.018 257);
  --color-muted: oklch(49% 0.016 255);
  --color-rule: oklch(89% 0.010 252);
  --color-rule-2: oklch(82% 0.014 252);
  --color-accent: oklch(52% 0.205 256);
  --color-accent-hover: oklch(46% 0.195 256);
  --color-accent-soft: oklch(94% 0.030 256);
  --color-accent-ink: oklch(99% 0.003 250);
  --color-focus: oklch(44% 0.180 256);
  --color-success: oklch(45% 0.120 158);
  --color-success-soft: oklch(95% 0.025 158);
  --color-success-ink: oklch(34% 0.092 158);
  --color-danger: oklch(50% 0.185 25);
  --color-danger-hover: oklch(45% 0.175 25);
  --color-danger-soft: oklch(96% 0.022 25);
  --color-danger-ink: oklch(38% 0.145 25);
  --color-graphite: oklch(22% 0.016 260);
  --color-graphite-2: oklch(28% 0.018 260);
  --color-graphite-rule: oklch(38% 0.020 258);
  --color-graphite-ink: oklch(92% 0.010 250);
  --color-overlay: oklch(18% 0.020 258 / .48);
  --shadow-panel: 0 18px 48px oklch(20% 0.020 258 / .10);
  --shadow-float: 0 8px 24px oklch(20% 0.020 258 / .12);

  --font-display: 'Space Grotesk', 'SF Pro Display', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;

  --space-3xs: .25rem;
  --space-2xs: .5rem;
  --space-xs: .75rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-4xl: 8rem;

  --text-xs: .75rem;
  --text-sm: .875rem;
  --text-md: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.75rem;
  --text-2xl: clamp(2.25rem, 5vw, 4.5rem);

  --radius-control: .375rem;
  --radius-panel: .625rem;
  --radius-round: 999px;
  --control-h: 2.75rem;
  --control-h-sm: 2rem;
  --shell: 74rem;
  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --dur-fast: 160ms;
  --dur-panel: 260ms;

  /* compatibility aliases for existing management scripts */
  --c-primary: var(--color-accent);
  --c-primary-hover: var(--color-accent-hover);
  --c-primary-glow: var(--color-accent-soft);
  --c-text: var(--color-ink-2);
  --c-text-dark: var(--color-ink);
  --c-text-secondary: var(--color-ink-2);
  --c-text-muted: var(--color-muted);
  --c-text-light: var(--color-muted);
  --c-bg: var(--color-paper-2);
  --c-bg-white: var(--color-paper);
  --c-bg-light: var(--color-paper-2);
  --c-bg-alt: var(--color-paper-2);
  --c-border: var(--color-rule);
  --c-border-dark: var(--color-rule-2);
  --c-success: var(--color-success);
  --c-success-bg: var(--color-success-soft);
  --c-success-text: var(--color-success-ink);
  --c-danger: var(--color-danger);
  --c-danger-bg: var(--color-danger-soft);
  --c-danger-text: var(--color-danger-ink);
  --c-info-bg: var(--color-accent-soft);
  --c-info-text: var(--color-focus);
  --c-overlay: var(--color-overlay);
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; min-width: 0; overflow-x: clip; scroll-behavior: smooth; }
body {
  min-height: 100dvh;
  background: var(--color-paper-2);
  color: var(--color-ink-2);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: 1.6;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
button, input, textarea, select { font: inherit; }
button, a, input, select, textarea { -webkit-tap-highlight-color: transparent; }
a { color: inherit; }
h1, h2, h3, p, figure, dl, dd { margin: 0; }
h1, h2, h3 { color: var(--color-ink); font-family: var(--font-display); font-style: normal; font-weight: 600; letter-spacing: -.025em; line-height: 1.12; overflow-wrap: anywhere; min-width: 0; }
code, pre { font-family: var(--font-mono); }
fieldset { min-width: 0; }
html:focus-within { scroll-behavior: smooth; }
:target { scroll-margin-top: var(--space-lg); }
:focus { outline: 0; }
:focus-visible { outline: .125rem solid var(--color-focus); outline-offset: .125rem; }
::selection { background: var(--color-accent-soft); color: var(--color-ink); }

.shell { width: min(100% - calc(var(--space-sm) * 2), var(--shell)); margin-inline: auto; }
.site-page { display: flex; min-height: 100dvh; flex-direction: column; }
.site-page > main { flex: 1; }
.hd { display: none !important; }
.sr-only { position: absolute; width: .0625rem; height: .0625rem; padding: 0; margin: -.0625rem; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

/* shared navigation */
.topbar { position: sticky; inset-block-start: 0; z-index: 100; min-height: 4rem; border-block-end: .0625rem solid var(--color-rule); background: var(--color-paper-a); color: var(--color-ink); backdrop-filter: blur(.75rem); }
.topbar__inner { min-height: 4rem; display: flex; align-items: center; justify-content: space-between; gap: var(--space-sm); }
.brand { min-width: 0; display: inline-flex; align-items: center; gap: var(--space-2xs); color: var(--color-ink); text-decoration: none; white-space: nowrap; }
.brand__mark { width: 2rem; height: 2rem; flex: 0 0 auto; display: grid; place-items: center; border: .0625rem solid var(--color-rule-2); border-radius: var(--radius-control); background: var(--color-paper); color: var(--color-accent); }
.brand__name, .brand strong { font-family: var(--font-display); font-size: var(--text-md); font-weight: 600; letter-spacing: -.02em; }
.brand__descriptor, .brand small { color: var(--color-muted); font-family: var(--font-mono); font-size: .625rem; font-weight: 500; letter-spacing: .08em; }
.topbar__actions { display: flex; align-items: center; gap: var(--space-2xs); }

/* buttons and controls */
.btn, .icon-btn, .model-token, .password-toggle, .admin-nav__link, .ps {
  border: .0625rem solid transparent;
  border-radius: var(--radius-control);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color var(--dur-fast) ease, border-color var(--dur-fast) ease, color var(--dur-fast) ease, transform var(--dur-fast) ease;
}
.btn { min-height: var(--control-h-sm); padding-inline: var(--space-sm); display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2xs); font-size: var(--text-sm); font-weight: 600; line-height: 1; }
.btn-p { border-color: var(--color-accent); background: var(--color-accent); color: var(--color-accent-ink); }
.btn-s { border-color: var(--color-rule-2); background: var(--color-paper); color: var(--color-ink-2); }
.btn-gh { border-color: transparent; background: transparent; color: var(--color-muted); }
.btn-g { border-color: var(--color-success-soft); background: var(--color-success-soft); color: var(--color-success-ink); }
.btn-d { border-color: var(--color-danger-soft); background: var(--color-danger-soft); color: var(--color-danger-ink); }
.icon-btn, .password-toggle { width: var(--control-h-sm); height: var(--control-h-sm); flex: 0 0 var(--control-h-sm); display: inline-grid; place-items: center; border-color: transparent; background: transparent; color: var(--color-muted); }
.icon-btn span { font-family: var(--font-body); font-size: var(--text-xs); }
.copy-control[data-state='success'] { border-color: var(--color-success); color: var(--color-success-ink); }
.copy-control[data-state='error'] { border-color: var(--color-danger); color: var(--color-danger-ink); }
.btn:active, .icon-btn:active, .model-token:active, .password-toggle:active, .ps:active { transform: translateY(.0625rem); }
.btn:disabled, .btn[aria-disabled='true'], .icon-btn:disabled, input:disabled, select:disabled { opacity: .55; cursor: not-allowed; }
.btn[data-state='loading'] .button-label { display: none; }
.btn:not([data-state='loading']) .button-loading { display: none; }
.btn[data-state='success'] { border-color: var(--color-success); background: var(--color-success); color: var(--color-paper); }
.button-loading { display: inline-flex; align-items: center; gap: var(--space-2xs); }

/* form controls */
input, textarea, select {
  width: 100%; height: var(--control-h); padding-inline: var(--space-xs); border: .0625rem solid var(--color-rule-2); border-radius: var(--radius-control); outline: .125rem solid transparent; outline-offset: .0625rem; background: var(--color-paper); color: var(--color-ink); transition: background-color var(--dur-fast) ease, border-color var(--dur-fast) ease;
}
input::placeholder, textarea::placeholder { color: var(--color-muted); opacity: .82; }
input:focus-visible, textarea:focus-visible, select:focus-visible { border-color: var(--color-ink-2); outline: .125rem solid var(--color-focus); outline-offset: .0625rem; }
input[aria-invalid='true'], textarea[aria-invalid='true'], select[aria-invalid='true'] { border-color: var(--color-danger); background: var(--color-danger-soft); }
textarea { min-height: 6rem; padding-block: var(--space-xs); resize: vertical; }
label, legend { color: var(--color-ink-2); font-size: var(--text-xs); font-weight: 600; }
.fg { min-width: 0; margin-block-end: var(--space-sm); }
.fg > label { display: block; margin-block-end: var(--space-2xs); }
.form-helper { min-height: 1lh; margin-block-start: var(--space-3xs); color: var(--color-muted); font-size: var(--text-xs); }
.input-wrap { position: relative; }
.input-wrap > i { position: absolute; inset-inline-start: var(--space-xs); inset-block-start: 50%; z-index: 1; color: var(--color-muted); transform: translateY(-50%); }
.input-wrap input { padding-inline-start: var(--space-xl); padding-inline-end: var(--space-xl); }
.password-toggle { position: absolute; inset-inline-end: 0; inset-block-start: 0; }
.select-sm { height: var(--control-h); }
.fr, .fr3 { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0 var(--space-sm); }
.form-group { margin: 0 0 var(--space-md); padding: var(--space-sm); border: .0625rem solid var(--color-rule); border-radius: var(--radius-control); }
.form-group legend { padding-inline: var(--space-2xs); }
.field-row { min-width: 0; flex-wrap: nowrap; }
.field-row input { min-width: 0; }
/* \u7EAF\u56FE\u6807\u6309\u94AE\u76F8\u90BB\u65F6\u6536\u7D27\u95F4\u8DDD\uFF08\u8D1F\u5916\u8FB9\u8DDD\u62B5\u6D88 .fc \u7684 gap\uFF09 */
.fc > .icon-btn + .icon-btn { margin-inline-start: calc(var(--space-3xs) - var(--space-2xs)); }

/* switch */
.tg { position: relative; display: inline-block; width: 2.5rem; height: var(--control-h); flex: 0 0 2.5rem; margin: 0; }
.tg input { position: absolute; opacity: 0; width: .0625rem; height: .0625rem; }
.tg .sl { position: absolute; inset-inline: 0; inset-block-start: .8125rem; height: 1.125rem; border-radius: var(--radius-round); background: var(--color-rule-2); cursor: pointer; transition: background-color var(--dur-fast) ease; }
.tg .sl::before { content: ''; position: absolute; width: .75rem; height: .75rem; inset-inline-start: .1875rem; inset-block-start: .1875rem; border-radius: 50%; background: var(--color-paper); box-shadow: 0 .0625rem .125rem var(--color-overlay); transition: transform var(--dur-fast) var(--ease-out); }
.tg input:checked + .sl { background: var(--color-accent); }
.tg input:checked + .sl::before { transform: translateX(1.375rem); }
.tg input:focus-visible + .sl { outline: .125rem solid var(--color-focus); outline-offset: .125rem; }
.tg input:disabled + .sl { opacity: .55; cursor: not-allowed; }

/* home workbench */
.home-page { background: var(--color-paper); }
.home-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-xl); padding-block: var(--space-2xl); }
.home-hero__copy { align-self: center; min-width: 0; }
.eyebrow { margin-block-end: var(--space-sm); display: flex; align-items: center; gap: var(--space-2xs); color: var(--color-muted); font-family: var(--font-mono); font-size: .6875rem; font-weight: 600; letter-spacing: .08em; }
.eyebrow > span { width: .75rem; height: .125rem; background: var(--color-accent); }
.home-hero h1 { max-width: 12ch; font-size: var(--text-2xl); }
.home-hero__lede { max-width: 60ch; margin-block-start: var(--space-md); color: var(--color-muted); font-size: var(--text-md); }
.endpoint-box { max-width: 40rem; margin-block-start: var(--space-lg); display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; border: .0625rem solid var(--color-rule-2); border-radius: var(--radius-control); background: var(--color-paper-2); }
.endpoint-box__label { grid-column: 1 / -1; padding: var(--space-2xs) var(--space-xs) 0; color: var(--color-muted); font-family: var(--font-mono); font-size: .625rem; font-weight: 600; letter-spacing: .08em; }
.endpoint-box code { min-width: 0; padding: var(--space-2xs) var(--space-xs) var(--space-xs); overflow: hidden; color: var(--color-ink); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }
.endpoint-box .icon-btn { width: auto; padding-inline: var(--space-sm); display: flex; gap: var(--space-2xs); border-inline-start-color: var(--color-rule); border-radius: 0; }
.request-panel { min-width: 0; overflow: clip; border: .0625rem solid var(--color-graphite-rule); border-radius: var(--radius-panel); background: var(--color-graphite); color: var(--color-graphite-ink); box-shadow: var(--shadow-panel); }
.request-panel figcaption, .request-panel__foot { min-height: 3rem; padding-inline: var(--space-sm); display: flex; align-items: center; justify-content: space-between; gap: var(--space-sm); border-block-end: .0625rem solid var(--color-graphite-rule); color: var(--color-graphite-ink); font-family: var(--font-mono); font-size: .625rem; letter-spacing: .04em; }
.protocol-state { display: inline-flex; align-items: center; gap: var(--space-2xs); color: var(--color-graphite-ink); white-space: nowrap; }
.protocol-state i { width: .4375rem; height: .4375rem; border-radius: 50%; background: var(--color-success); }
.request-panel pre { margin: 0; min-height: 18rem; padding: var(--space-md); overflow: auto; background: var(--color-graphite); color: var(--color-graphite-ink); font-size: clamp(.6875rem, 2vw, .8125rem); line-height: 1.8; }
.request-panel pre code { white-space: pre; }
.syntax-command, .syntax-key { color: oklch(75% 0.130 256); }
.syntax-string { color: oklch(83% 0.060 154); }
.request-panel__foot { border-block-start: .0625rem solid var(--color-graphite-rule); border-block-end: 0; color: oklch(72% 0.012 250); }
.request-panel__foot code { color: var(--color-graphite-ink); }
.metrics-strip { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-block: .0625rem solid var(--color-rule); }
.metric { min-width: 0; padding-block: var(--space-md); display: flex; flex-direction: column; gap: var(--space-3xs); border-inline-end: .0625rem solid var(--color-rule); }
.metric:nth-child(even) { border-inline-end: 0; }
.metric:nth-child(n+3) { border-block-start: .0625rem solid var(--color-rule); }
.metric__value { color: var(--color-ink); font-family: var(--font-display); font-size: var(--text-xl); font-weight: 600; line-height: 1; }
.metric__label { color: var(--color-muted); font-size: var(--text-xs); }
.directory { padding-block: var(--space-2xl) var(--space-3xl); }
.section-heading { margin-block-end: var(--space-lg); display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-sm); align-items: end; }
.section-heading h2 { font-size: var(--text-xl); }
.section-heading p { max-width: 65ch; margin-block-start: var(--space-2xs); color: var(--color-muted); }
.search-field { position: relative; width: 100%; }
.search-field > i { position: absolute; inset-inline-start: var(--space-xs); inset-block-start: 50%; color: var(--color-muted); transform: translateY(-50%); }
.search-field input { padding-inline-start: var(--space-lg); }
.provider-index { border-block-start: .0625rem solid var(--color-rule-2); }
.provider-row { min-width: 0; padding-block: var(--space-md); display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-md); align-items: start; border-block-end: .0625rem solid var(--color-rule); }
.provider-row__identity { min-width: 0; display: flex; align-items: center; gap: var(--space-xs); }
.provider-row__mark, .provider-avatar { width: 2.5rem; height: 2.5rem; flex: 0 0 auto; display: grid; place-items: center; border: .0625rem solid var(--color-rule-2); border-radius: var(--radius-control); background: var(--color-paper-2); color: var(--color-ink); font-family: var(--font-display); font-weight: 600; }
.provider-row h3 { font-size: var(--text-md); }
.provider-row__identity p { margin-block-start: var(--space-3xs); display: flex; flex-wrap: wrap; gap: var(--space-2xs); color: var(--color-muted); font-size: var(--text-xs); }
.provider-row__identity code { color: var(--color-ink-2); }
.provider-row__models { min-width: 0; display: flex; flex-wrap: wrap; gap: var(--space-2xs); }
.model-token { max-width: 100%; min-height: var(--control-h-sm); padding-inline: var(--space-xs); display: inline-flex; align-items: center; gap: var(--space-2xs); border-color: var(--color-rule); background: var(--color-paper-2); color: var(--color-ink-2); }
.model-token code { overflow: hidden; font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }
.model-token i { color: var(--color-muted); }
.status-badge, .bd, .protocol-chip, .status-dot { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2xs); width: max-content; min-height: 1.75rem; padding-inline: var(--space-xs); border-radius: var(--radius-round); font-size: var(--text-xs); font-weight: 600; white-space: nowrap; }
.status-badge i, .status-dot i { width: .4375rem; height: .4375rem; border-radius: 50%; background: currentColor; }
.status-badge--on, .bd-on, .status-dot--online { background: var(--color-success-soft); color: var(--color-success-ink); }
.bd-off { background: var(--color-paper-3); color: var(--color-muted); }
.bd-info, .protocol-chip { background: var(--color-accent-soft); color: var(--color-focus); }
/* \u5220\u9664\u7C7B\u5FBD\u6807\u6309\u94AE\uFF1A\u5F62\u72B6\u540C .bd \u80F6\u56CA\uFF0C\u989C\u8272\u4FDD\u6301\u5371\u9669\u6001 */
.bd-del { border: .0625rem solid transparent; background: var(--color-danger-soft); color: var(--color-danger-ink); font-family: inherit; cursor: pointer; transition: background-color var(--dur-fast) ease, color var(--dur-fast) ease; }
.bd-del:hover { background: var(--color-danger); color: var(--color-paper); }
.empty-inline { color: var(--color-muted); font-size: var(--text-xs); }
.empty-state { padding: var(--space-xl) var(--space-sm); display: flex; flex-direction: column; align-items: center; gap: var(--space-xs); border: .0625rem dashed var(--color-rule-2); border-radius: var(--radius-panel); background: var(--color-paper-2); color: var(--color-muted); text-align: center; }
.empty-state > i { font-size: var(--text-lg); color: var(--color-muted); }
.empty-state h3 { font-size: var(--text-md); }
.empty-state p { max-width: 55ch; }
.site-footer { border-block-start: .0625rem solid var(--color-rule); background: var(--color-paper-2); color: var(--color-muted); }
.admin-main > .site-footer { margin-block-start: auto; }
.site-footer__inner { padding-block: var(--space-md); display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-2xs); font-size: var(--text-xs); }
.site-footer a { text-underline-offset: .125rem; }
.site-footer__link { color: inherit; text-decoration: none; }

/* authentication split */
.auth-page { background: var(--color-paper); }
.auth-shell { width: min(100%, var(--shell)); min-height: calc(100dvh - 4rem); margin-inline: auto; display: grid; grid-template-columns: minmax(0, 1fr); }
.auth-context, .auth-form-wrap { min-width: 0; padding: var(--space-xl) var(--space-sm); }
.auth-context { display: flex; flex-direction: column; justify-content: center; border-block-end: .0625rem solid var(--color-rule); background: var(--color-paper-2); color: var(--color-ink-2); }
.auth-context h1 { max-width: 11ch; font-size: clamp(2.25rem, 6vw, 4rem); }
.auth-context > p:not(.eyebrow) { max-width: 58ch; margin-block-start: var(--space-md); color: var(--color-muted); font-size: var(--text-md); }
.auth-facts { margin-block-start: var(--space-xl); border-block-start: .0625rem solid var(--color-rule); }
.auth-facts > div { padding-block: var(--space-sm); display: grid; grid-template-columns: minmax(7rem, .7fr) minmax(0, 1.3fr); gap: var(--space-sm); border-block-end: .0625rem solid var(--color-rule); }
.auth-facts dt { color: var(--color-muted); font-size: var(--text-xs); }
.auth-facts dd { min-width: 0; color: var(--color-ink); font-size: var(--text-xs); overflow-wrap: anywhere; }
.auth-form-wrap { display: grid; place-items: center; background: var(--color-paper); color: var(--color-ink-2); }
.auth-form { width: min(100%, 27rem); }
.auth-form__heading { margin-block-end: var(--space-lg); display: flex; align-items: center; gap: var(--space-sm); }
.auth-form__icon, .panel-heading__mark { width: 2.75rem; height: 2.75rem; flex: 0 0 auto; display: grid; place-items: center; border: .0625rem solid var(--color-rule-2); border-radius: var(--radius-control); background: var(--color-paper-2); color: var(--color-accent); }
.auth-form h2 { font-size: var(--text-xl); }
.auth-form__heading p { margin-block-start: var(--space-3xs); color: var(--color-muted); }
.auth-form .al { margin-block-end: var(--space-sm); }
.btn-submit { width: 100%; margin-block-start: var(--space-sm); }

/* admin control plane */
.admin-page { background: var(--color-paper-2); }
.admin-shell { min-height: 100dvh; }
.admin-rail { display: none; }
.admin-main { min-width: 0; min-height: 100dvh; display: flex; flex-direction: column; }
.admin-topbar { position: sticky; inset-block-start: 0; z-index: 90; min-height: 4rem; padding-inline: var(--space-sm); display: flex; align-items: center; justify-content: space-between; gap: var(--space-2xs); border-block-end: .0625rem solid var(--color-rule); background: var(--color-paper-a); backdrop-filter: blur(.75rem); }
.admin-topbar nav { min-width: 0; display: flex; align-items: center; gap: var(--space-3xs); overflow-x: auto; }
.admin-topbar nav a { min-height: var(--control-h); padding-inline: var(--space-xs); display: inline-flex; align-items: center; color: var(--color-muted); font-size: var(--text-xs); font-weight: 600; text-decoration: none; white-space: nowrap; }
.admin-content { width: 100%; max-width: 82rem; margin-inline: auto; padding: var(--space-lg) var(--space-sm) var(--space-3xl); }
.admin-overview { margin-block-end: var(--space-xl); }
.admin-heading { margin-block-end: var(--space-lg); display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-md); align-items: end; }
.admin-heading h1 { font-size: clamp(2rem, 5vw, 3rem); }
.admin-heading > div > p:not(.eyebrow) { max-width: 65ch; margin-block-start: var(--space-2xs); color: var(--color-muted); }
.admin-heading__actions { display: flex; flex-wrap: wrap; gap: var(--space-2xs); }
.admin-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border: .0625rem solid var(--color-rule); border-radius: var(--radius-panel); background: var(--color-paper); }
.admin-metrics > div { min-width: 0; padding: var(--space-sm); border-inline-end: .0625rem solid var(--color-rule); border-block-end: .0625rem solid var(--color-rule); }
.admin-metrics > div:nth-child(even) { border-inline-end: 0; }
.admin-metrics > div:nth-child(n+3) { border-block-end: 0; }
.admin-metrics > div > span:not(.status-dot) { color: var(--color-ink); font-family: var(--font-display); font-size: var(--text-xl); font-weight: 600; line-height: 1; }
.admin-metrics p { margin-block-start: var(--space-xs); color: var(--color-ink); font-weight: 600; }
.admin-metrics small { color: var(--color-muted); font-size: var(--text-xs); }
.workspace-section { margin-block-start: var(--space-xl); }
.section-heading--admin { padding-block-end: var(--space-md); border-block-end: .0625rem solid var(--color-rule); }
.section-heading--admin code { font-size: var(--text-xs); }
.af-w { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-sm); margin-block-end: var(--space-md); }
.add-form-panel, .mdl-list-panel { min-width: 0; padding: var(--space-md); border: .0625rem solid var(--color-rule-2); border-radius: var(--radius-panel); background: var(--color-paper-2); }
.panel-heading { margin-block-end: var(--space-md); display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-sm); }
.panel-heading > div { min-width: 0; display: flex; align-items: center; gap: var(--space-xs); }
.panel-heading h3 { font-size: var(--text-md); }
.panel-heading p { color: var(--color-muted); font-size: var(--text-xs); }
.mdl-list-panel { max-height: 36rem; overflow-y: auto; margin-bottom: 20px;}
.panel-actions, .detail-actions { display: flex; flex-direction: column; align-items: stretch; gap: var(--space-sm); }
.panel-actions > div, .detail-actions > div { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: var(--space-2xs); }
.switch-label { min-height: var(--control-h); display: flex; align-items: center; justify-content: space-between; gap: var(--space-sm); }
.gp, .provider-list, .key-list { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-xs); }
.pi, .ki { min-width: 0; border: .0625rem solid var(--color-rule); border-radius: var(--radius-control); background: var(--color-paper); }
.ps { min-height: 4.75rem; padding: var(--space-xs); display: flex; align-items: center; justify-content: space-between; gap: var(--space-sm); cursor: pointer; }
.ps .l { min-width: 0; display: flex; align-items: center; gap: var(--space-xs); }
.ps .l > div { min-width: 0; }
.ps h3 { font-size: var(--text-md); }
.provider-chevron { width: 1rem; flex: 0 0 auto; color: var(--color-muted); transition: transform var(--dur-fast) var(--ease-out); }
.pu { margin-block-start: var(--space-3xs); display: flex; flex-wrap: wrap; gap: var(--space-2xs); color: var(--color-muted); font-size: var(--text-xs); }
.pu > *:not(:last-child)::after { content: '\xB7'; margin-inline-start: var(--space-2xs); color: var(--color-rule-2); }
.pd { display: none; padding: var(--space-md); border-block-start: .0625rem solid var(--color-rule); background: var(--color-paper-2); }
.pd.open { display: block; }
.detail-heading { margin-block-end: var(--space-md); display: flex; align-items: center; justify-content: space-between; gap: var(--space-sm); }
.detail-heading h3 { font-size: var(--text-lg); }
.detail-heading p { margin-block-start: var(--space-3xs); color: var(--color-muted); font-size: var(--text-xs); }
.detail-actions { padding-block-start: var(--space-sm); border-block-start: .0625rem solid var(--color-rule); }
.detail-actions > div:first-child { flex: 1; justify-content: flex-start; }
.ki { padding: var(--space-sm); display: flex; flex-direction: column; gap: var(--space-sm); }
.key-main { min-width: 0; display: flex; align-items: flex-start; gap: var(--space-xs); }
.key-main > div { min-width: 0; }
.key-icon { width: 2.5rem; height: 2.5rem; flex: 0 0 auto; display: grid; place-items: center; border: .0625rem solid var(--color-rule); border-radius: var(--radius-control); background: var(--color-paper-2); color: var(--color-accent); }
.kv { min-width: 0; display: flex; align-items: center; gap: var(--space-3xs); color: var(--color-ink-2); font-family: var(--font-mono); font-size: var(--text-xs); }
.kv > span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.kv .icon-btn { width: var(--control-h-sm); }
.key-main h3 { margin-block-start: var(--space-3xs); font-size: var(--text-sm); }
.key-main p { color: var(--color-muted); font-size: var(--text-xs); }
/* Key \u540D\u79F0\u4E0E\u521B\u5EFA\u65F6\u95F4\u4E00\u884C\u663E\u793A */
.key-meta { min-width: 0; display: flex; align-items: baseline; gap: var(--space-2xs); }
.key-meta h3 { margin-block-start: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.key-meta p { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.key-meta__sep { color: var(--color-muted); flex: 0 0 auto; }
.key-actions { display: flex; align-items: center; justify-content: flex-end; gap: var(--space-2xs); }

/* feedback, model list and modal */
.al { min-height: var(--control-h); padding: var(--space-xs); display: flex; align-items: center; gap: var(--space-2xs); border: .0625rem solid transparent; border-radius: var(--radius-control); font-size: var(--text-xs); }
.al-s { border-color: var(--color-success); background: var(--color-success-soft); color: var(--color-success-ink); margin-top: 20px; }
.al-e { border-color: var(--color-danger); background: var(--color-danger-soft); color: var(--color-danger-ink); }
.al-i { border-color: var(--color-accent); background: var(--color-accent-soft); color: var(--color-focus); }
.toast { position: fixed; inset-block-start: var(--space-sm); inset-inline-end: var(--space-sm); z-index: 9998; width: min(calc(100% - calc(var(--space-sm) * 2)), 24rem); box-shadow: var(--shadow-float); }
.modal-o { position: fixed; inset: 0; z-index: 9999; padding: var(--space-sm); display: grid; place-items: center; background: var(--color-overlay); color: var(--color-ink-2); }
.modal { width: min(100%, 27rem); max-height: min(80dvh, 40rem); overflow-y: auto; padding: var(--space-md); border: .0625rem solid var(--color-rule-2); border-radius: var(--radius-panel); background: var(--color-paper); color: var(--color-ink-2); box-shadow: var(--shadow-panel); animation: modal-in var(--dur-panel) var(--ease-out); }
.modal h3 { margin-block-end: var(--space-xs); font-size: var(--text-lg); }
.modal p { margin-block-end: var(--space-sm); color: var(--color-muted); }
.modal .fa { margin-block-start: var(--space-sm); display: flex; justify-content: flex-end; gap: var(--space-2xs); }
.mk { margin-block: var(--space-xs); padding: var(--space-sm); border: .0625rem solid var(--color-rule); border-radius: var(--radius-control); background: var(--color-paper-2); color: var(--color-ink); font-family: var(--font-mono); font-size: var(--text-xs); overflow-wrap: anywhere; user-select: all; }
.mdl-item { min-width: 0; min-height: var(--control-h-sm); padding-inline: var(--space-2xs); display: flex; align-items: center; gap: var(--space-2xs); border: .0625rem solid var(--color-rule); border-radius: var(--radius-control); background: var(--color-paper); color: var(--color-ink-2); font-size: var(--text-xs); }
.mdl-item .fx1 { min-width: 0; white-space: normal; overflow-wrap: anywhere; }
.mdl-item i:first-child { color: var(--color-muted); }
.mdl-add-btn { flex-shrink: 0; width: var(--control-h-sm); min-height: 0; font-size: var(--text-md); line-height: 2; }
.grid-2-gap6 { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-2xs); }
@keyframes modal-in { from { opacity: 0; transform: translateY(var(--space-xs)); } to { opacity: 1; transform: none; } }

/* compatibility utilities used by existing interaction code */
.fc { display: flex; align-items: center; gap: var(--space-2xs); }
.fx1 { flex: 1; min-width: 0; }
.fx-s0 { flex-shrink: 0; }
.flex-col { display: flex; flex-direction: column; }
.jc-c { justify-content: center; }
.gap-8, .gp8 { gap: var(--space-2xs); }
.gp3, .gp4 { gap: var(--space-3xs); }
.gp6 { gap: var(--space-2xs); }
.mt-1 { margin-block-start: var(--space-3xs); }
.mt-2, .mt-8 { margin-block-start: var(--space-2xs); }
.mt-3, .mt-6 { margin-block-start: var(--space-2xs); }
.mb-2, .mb-10 { margin-block-end: var(--space-2xs); }
.mb-3, .mb-4 { margin-block-end: var(--space-3xs); }
.m-16-0 { margin-block: var(--space-sm); }
.input-mt-6 { margin-block-start: var(--space-2xs); }
.p-14, .p-10-12 { padding: var(--space-xs); }
.fw { width: 100%; }
.fw-4 { font-weight: 400; }
.fw-6 { font-weight: 600; }
.fw-7 { font-weight: 700; }
.fs-xs, .fs-65, .fs-77 { font-size: var(--text-xs); }
.fs-sm, .fs-s, .fs-88 { font-size: var(--text-sm); }
.fs-1 { font-size: var(--text-md); }
.fs-xxs { font-size: .625rem; }
.w12, .w14, .w16 { width: 1rem; }
.c-p { color: var(--color-accent); }
.c-l, .c-muted, .mu { color: var(--color-muted); }
.c-s { color: var(--color-success); }

/* \u590D\u5236\u6210\u529F\u6001\u9700\u538B\u8FC7 .model-token i / .mdl-item i:first-child \u7684 muted \u8272\uFF080,2,0 > 0,1,1\uFF09 */
.model-token i.c-s, .mdl-item i.c-s, .mdl-item i:first-child.c-s { color: var(--color-success); }
.c-d { color: var(--color-danger); }
.mu { font-size: var(--text-xs); }
.tc { text-align: center; }
.va-m { vertical-align: middle; }
.ov { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cp { cursor: pointer; user-select: none; }
.cd { padding: var(--space-3xs) var(--space-2xs); border-radius: var(--radius-control); background: var(--color-paper-2); color: var(--color-ink); font-family: var(--font-mono); font-size: var(--text-xs); }
.copy-icon { color: var(--color-muted); font-size: var(--text-xs); }

@media (hover: hover) and (pointer: fine) {
  .btn-p:hover { border-color: var(--color-accent-hover); background: var(--color-accent-hover); }
  .btn-s:hover, .btn-gh:hover, .icon-btn:hover, .password-toggle:hover { border-color: var(--color-rule-2); background: var(--color-paper-2); color: var(--color-ink); }
  .btn-g:hover { border-color: var(--color-success); }
  .btn-d:hover { border-color: var(--color-danger); background: var(--color-danger); color: var(--color-paper); }
  input:hover, textarea:hover, select:hover { background: var(--color-paper-2); }
  .model-token:hover { border-color: var(--color-accent); color: var(--color-focus); }
  .provider-row:hover, .pi:hover, .ki:hover { border-color: var(--color-rule-2); }
  .ps:hover { background: var(--color-paper-2); }
  .admin-nav__link:hover { background: var(--color-paper-2); color: var(--color-ink); }
}

@media (min-width: 40rem) {
  .shell { width: min(100% - calc(var(--space-lg) * 2), var(--shell)); }
  .home-hero { padding-block: var(--space-3xl); }
  .metrics-strip { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .metric { padding-inline: var(--space-md); }
  .metric:first-child { padding-inline-start: 0; }
  .metric:last-child { border-inline-end: 0; }
  .metric:nth-child(even) { border-inline-end: .0625rem solid var(--color-rule); }
  .metric:nth-child(n+3) { border-block-start: 0; }
  .section-heading { grid-template-columns: minmax(0, 1fr) minmax(16rem, .45fr); }
  .provider-row { grid-template-columns: minmax(13rem, .7fr) minmax(0, 1.5fr) auto; align-items: center; }
  .site-footer__inner { flex-direction: row; align-items: center; justify-content: space-between; }
  .auth-context, .auth-form-wrap { padding: var(--space-2xl); }
  .fr { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fr3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .admin-content { padding-inline: var(--space-lg); }
  .admin-heading, .section-heading--admin { grid-template-columns: minmax(0, 1fr) auto; }
  .admin-heading__actions { justify-content: flex-end; }
  .admin-metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .admin-metrics > div { border-block-end: 0; }
  .admin-metrics > div:nth-child(even) { border-inline-end: .0625rem solid var(--color-rule); }
  .admin-metrics > div:last-child { border-inline-end: 0; }
  .panel-actions, .detail-actions { flex-direction: row; align-items: center; justify-content: space-between; }
  .ki { flex-direction: row; align-items: center; justify-content: space-between; }
  .grid-2-gap6 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 60rem) {
  .home-hero { grid-template-columns: minmax(0, .9fr) minmax(28rem, 1.1fr); align-items: center; gap: var(--space-2xl); }
  .auth-shell { grid-template-columns: minmax(0, 1.05fr) minmax(25rem, .95fr); }
  .auth-context { border-block-end: 0; border-inline-end: .0625rem solid var(--color-rule); }
  .admin-shell { display: grid; grid-template-columns: 15rem minmax(0, 1fr); }
  .admin-rail { position: sticky; inset-block-start: 0; height: 100dvh; padding: var(--space-md) var(--space-sm); display: flex; flex-direction: column; border-inline-end: .0625rem solid var(--color-rule); background: var(--color-paper); color: var(--color-ink-2); }
  .admin-rail__brand { padding-inline: var(--space-xs); }
  .admin-rail__brand > span:last-child { display: flex; flex-direction: column; line-height: 1.2; }
  .admin-nav { margin-block-start: var(--space-xl); display: grid; gap: var(--space-3xs); }
  .admin-nav__link { min-height: var(--control-h); padding-inline: var(--space-xs); display: grid; grid-template-columns: 1.25rem minmax(0, 1fr) auto; align-items: center; gap: var(--space-2xs); color: var(--color-muted); font-weight: 600; }
  .admin-nav__link b { min-width: 1.5rem; padding-inline: var(--space-3xs); border-radius: var(--radius-round); background: var(--color-paper-3); color: var(--color-muted); font-family: var(--font-mono); font-size: .625rem; text-align: center; }
  .admin-nav__link.is-active { background: var(--color-accent-soft); color: var(--color-focus); }
  .admin-rail__foot { margin-block-start: auto; display: grid; gap: var(--space-3xs); }
  .admin-topbar { display: none; }
  .admin-content { padding-block-start: var(--space-xl); }
  .grid-2-gap6 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .pd { padding: var(--space-lg); }
}

@media (min-width: 80rem) {
  .admin-content { padding-inline: var(--space-xl); }
}

@media (max-width: 24rem) {
  .brand__descriptor { display: none; }
  .topbar__actions .btn-gh { display: none; }
  .topbar__actions .btn, .topbar--auth .btn { padding-inline: var(--space-xs); }
  .request-panel figcaption { align-items: flex-start; flex-direction: column; justify-content: center; gap: 0; }
  .protocol-state { font-size: .5625rem; }
  .workspace-section { padding: 0; }
  .provider-avatar { display: none; }
  .ps { align-items: flex-start; }
  .ps > .fc { flex-direction: column; align-items: flex-end; }
  .field-row { flex-wrap: wrap; }
  .field-row input { flex-basis: calc(100% - 3.5rem); }
  .field-row .btn { flex: 1; }
  .admin-topbar .brand__name { display: none; }
  .admin-heading__actions .btn { flex: 1; }
}

@media (pointer: coarse) {
  .btn, .model-token, .password-toggle, input, select { min-height: var(--control-h); }
  .icon-btn, .password-toggle { width: var(--control-h); height: var(--control-h); flex-basis: var(--control-h); }
}

@media (prefers-reduced-motion: reduce) {
  html, body { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
  .modal { transform: none; }
}
`;
  var SITE_REPO_URL = "https://github.com/yutian81/ai-gateway";
  function renderSiteFooter(title) {
    return `<footer class="site-footer">
  <div class="shell site-footer__inner">
    <span>\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} <a class="site-footer__link" href="${SITE_REPO_URL}" target="_blank" rel="noreferrer">${title}</a></span>
    <span>Cloudflare Workers \xB7 Hono \xB7 KV</span>
  </div>
</footer>`;
  }
  var SHARED_JS = `
// \u2500\u2500 \u5DE5\u5177\u51FD\u6570 \u2500\u2500
function normalizeUrl(url) {
    return url.replace(/\\/$/, '')
  }
function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
function buildAuthHeaders(apiType, key) {
  return apiType === 'anthropic'
    ? { 'x-api-key': key, 'anthropic-version': '2023-06-01' }
    : { 'Authorization': 'Bearer ' + key }
}

// \u2500\u2500 UI \u51FD\u6570 \u2500\u2500
function showSpinner(el) {
  el.innerHTML = '<span class="mu"><i class="fas fa-spinner fa-spin"></i> \u6D4B\u8BD5\u4E2D...</span>'
}
function showResult(el, success, msg) {
  el.innerHTML = success
    ? '<div class="al al-s"><i class="fas fa-check-circle"></i> \u8FDE\u63A5\u6210\u529F</div>'
    : '<div class="al al-e"><i class="fas fa-times-circle"></i> ' + escapeHtml(msg || '\u8FDE\u63A5\u5931\u8D25') + '</div>'
}

// \u2500\u2500 API \u8BF7\u6C42\u51FD\u6570 \u2500\u2500
async function testKeyConnection(url, apiType, key, providerId) {
  try {
    var r = await fetch('/admin/api/test-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url, apiKey: key, apiType: apiType, providerId: providerId })
    })
    var d = await r.json()
    if (d.success && d.data) {
      return { success: d.data.success, status: d.data.statusCode, data: d.data.data, message: d.data.message }
    }
    return { success: false, status: 0, data: null }
  } catch (e) {
    return { success: false, status: 0, data: null }
  }
}
async function testModelConnection(url, apiType, key, modelId, providerId) {
  try {
    var r = await fetch('/admin/api/test-model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url, apiKey: key, apiType: apiType, model: modelId, providerId: providerId })
    })
    var d = await r.json()
    if (d.success && d.data) {
      return { success: d.data.success, status: d.data.statusCode }
    }
    return { success: false, status: 0 }
  } catch (e) {
    return { success: false, status: 0 }
  }
}
`;
  var escapePageHtml = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  var H = (title) => `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="oklch(98.5% 0.004 250)">
  <title>${title} \u2014 ${SITE_CONFIG.title}</title>
  <link rel="icon" href="${SITE_CONFIG.favicon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500;600&amp;family=Space+Grotesk:wght@500;600&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${SITE_CONFIG.faCdn}">
  <style>${CSS_CONTENT}</style>
</head>`;
  async function renderHomePage(c, isLoggedIn) {
    const providers = await getProviders(c.env);
    const host = c.req.header("host") || "localhost:8787";
    const apiBase = `https://${host}/v1`;
    const enabledProviders = providers.filter((provider) => provider.enabled);
    const allModelsCount = providers.reduce((total, provider) => total + provider.models.length, 0);
    const enabledModelsCount = enabledProviders.reduce((total, provider) => total + provider.models.filter((model) => model.enabled).length, 0);
    return c.html(`<!DOCTYPE html><html lang="zh-CN">
${H("\u9996\u9875")}
<body class="site-page home-page">
<header class="topbar">
  <div class="shell topbar__inner">
    <a class="brand" href="/" aria-label="AI Gateway \u9996\u9875">
      <span class="brand__mark" aria-hidden="true"><i class="fas fa-cloud"></i></span>
      <span class="brand__name">${SITE_CONFIG.title}</span>
      <span class="brand__descriptor">API CONTROL PLANE</span>
    </a>
    <nav class="topbar__actions" aria-label="\u4E3B\u5BFC\u822A">
      ${isLoggedIn ? `<a href="/admin" class="btn btn-p"><i class="fas fa-sliders-h" aria-hidden="true"></i>\u7BA1\u7406\u63A7\u5236\u53F0</a><a href="/admin/logout" class="btn btn-gh"><i class="fas fa-sign-out-alt" aria-hidden="true"></i>\u9000\u51FA</a>` : `<a href="/admin/login" class="btn btn-p"><i class="fas fa-sign-in-alt" aria-hidden="true"></i>\u7BA1\u7406\u5458\u767B\u5F55</a>`}
    </nav>
  </div>
</header>

<main>
  <section class="shell home-hero" aria-labelledby="home-title">
    <div class="home-hero__copy">
      <p class="eyebrow"><span aria-hidden="true"></span>UNIFIED AI GATEWAY</p>
      <h1 id="home-title">\u4E00\u4E2A API\uFF0C\u8C03\u7528\u5DF2\u914D\u7F6E\u7684\u6240\u6709\u6A21\u578B\u3002</h1>
      <p class="home-hero__lede">\u7EDF\u4E00\u7684 OpenAI / Anthropic \u517C\u5BB9\u5165\u53E3\u3002\u6A21\u578B\u6309\u63D0\u4F9B\u5546\u5F52\u6863\uFF0C\u8F6C\u53D1 Key\u3001\u542F\u7528\u72B6\u6001\u548C\u6545\u969C\u8F6C\u79FB\u96C6\u4E2D\u7BA1\u7406\u3002</p>
      <div class="endpoint-box" aria-label="API \u63A5\u5165\u5730\u5740">
        <span class="endpoint-box__label">BASE URL</span>
        <code>${escapePageHtml(apiBase)}</code>
        <button class="icon-btn copy-control" type="button" data-copy="${escapePageHtml(apiBase)}" aria-label="\u590D\u5236 API \u5730\u5740">
          <i class="far fa-copy" aria-hidden="true"></i><span>\u590D\u5236</span>
        </button>
      </div>
    </div>

    <figure class="request-panel" aria-labelledby="request-caption">
      <figcaption id="request-caption">
        <span>POST /chat/completions</span>
        <span class="protocol-state"><i aria-hidden="true"></i>OPENAI COMPATIBLE</span>
      </figcaption>
      <pre><code><span class="syntax-command">curl</span> ${escapePageHtml(apiBase)}/chat/completions \\
  <span class="syntax-key">-H</span> <span class="syntax-string">"Authorization: Bearer sk_cf_\u2022\u2022\u2022\u2022"</span> \\
  <span class="syntax-key">-H</span> <span class="syntax-string">"Content-Type: application/json"</span> \\
  <span class="syntax-key">-d</span> <span class="syntax-string">'{
    "model": "opencode/deepseek-v4-flash-free",
    "messages": [{ "role": "user", "content": "Hello" }]
  }'</span></code></pre>
      <div class="request-panel__foot">
        <span>\u6A21\u578B\u683C\u5F0F</span>
        <code>provider/model</code>
      </div>
    </figure>
  </section>

  <section class="shell metrics-strip" aria-label="\u7F51\u5173\u914D\u7F6E\u6982\u89C8">
    <div class="metric"><span class="metric__value">${providers.length}</span><span class="metric__label">\u63D0\u4F9B\u5546\u603B\u8BA1</span></div>
    <div class="metric"><span class="metric__value">${enabledProviders.length}</span><span class="metric__label">\u5DF2\u542F\u7528\u63D0\u4F9B\u5546</span></div>
    <div class="metric"><span class="metric__value">${allModelsCount}</span><span class="metric__label">\u6A21\u578B\u603B\u8BA1</span></div>
    <div class="metric"><span class="metric__value">${enabledModelsCount}</span><span class="metric__label">\u53EF\u7528\u6A21\u578B</span></div>
  </section>

  <section class="shell directory" aria-labelledby="directory-title">
    <div class="section-heading">
      <div>
        <h2 id="directory-title">\u6A21\u578B\u5217\u8868</h2>
        <p>\u70B9\u51FB\u6A21\u578B ID \u5373\u53EF\u590D\u5236\uFF1B\u8FD9\u91CC\u53EA\u5C55\u793A\u5DF2\u542F\u7528\u7684\u63D0\u4F9B\u5546\u4E0E\u6A21\u578B\u3002</p>
      </div>
      <label class="search-field" for="model-search">
        <i class="fas fa-search" aria-hidden="true"></i>
        <span class="sr-only">\u641C\u7D22\u63D0\u4F9B\u5546\u6216\u6A21\u578B</span>
        <input id="model-search" type="search" placeholder="\u641C\u7D22\u63D0\u4F9B\u5546\u6216\u6A21\u578B" autocomplete="off">
      </label>
    </div>

    <div class="provider-index" id="provider-index">
      ${enabledProviders.length ? enabledProviders.map((provider) => {
      const models = provider.models.filter((model) => model.enabled);
      return `<article class="provider-row" data-search="${escapePageHtml(`${provider.name} ${provider.id} ${models.map((model) => model.id).join(" ")}`.toLowerCase())}">
          <div class="provider-row__identity">
            <span class="provider-row__mark" aria-hidden="true">${escapePageHtml(provider.name.charAt(0).toUpperCase() || "A")}</span>
            <div>
              <h3>${escapePageHtml(provider.name)}</h3>
              <p><code>${escapePageHtml(provider.id)}</code><span>${(provider.apiType || "openai") === "anthropic" ? "Anthropic" : "OpenAI"} \u517C\u5BB9</span></p>
            </div>
          </div>
          <div class="provider-row__models">
            ${models.length ? models.map((model) => {
        const fullModel = `${provider.id}/${model.id}`;
        return `<button class="model-token copy-control" type="button" data-copy="${escapePageHtml(fullModel)}"><code>${escapePageHtml(fullModel)}</code><i class="far fa-copy" aria-hidden="true"></i></button>`;
      }).join("") : '<span class="empty-inline">\u6682\u65E0\u542F\u7528\u6A21\u578B</span>'}
          </div>
          <span class="status-badge status-badge--on"><i aria-hidden="true"></i>\u5DF2\u542F\u7528</span>
        </article>`;
    }).join("") : `<div class="empty-state"><i class="fas fa-cubes" aria-hidden="true"></i><h3>\u5C1A\u65E0\u53EF\u7528\u6A21\u578B</h3><p>\u7BA1\u7406\u5458\u542F\u7528\u63D0\u4F9B\u5546\u548C\u6A21\u578B\u540E\uFF0C\u5B83\u4EEC\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002</p>${isLoggedIn ? '<a class="btn btn-p" href="/admin">\u524D\u5F80\u7BA1\u7406\u63A7\u5236\u53F0</a>' : ""}</div>`}
    </div>
    <div id="search-empty" class="empty-state hd"><i class="fas fa-search" aria-hidden="true"></i><h3>\u6CA1\u6709\u5339\u914D\u7ED3\u679C</h3><p>\u8BF7\u5C1D\u8BD5\u8F93\u5165\u63D0\u4F9B\u5546\u540D\u79F0\u3001ID \u6216\u6A21\u578B\u540D\u79F0\u3002</p></div>
  </section>
</main>

${renderSiteFooter(SITE_CONFIG.title)}

<script>
(function () {
  var status = document.getElementById('copy-status')
  document.querySelectorAll('.copy-control').forEach(function (button) {
    button.addEventListener('click', async function () {
      var text = button.getAttribute('data-copy') || ''
      var icon = button.querySelector('i')
      var label = button.querySelector('span')
      try {
        await navigator.clipboard.writeText(text)
        button.setAttribute('data-state', 'success')
        if (icon) icon.className = 'fas fa-check c-s'
        if (label) label.textContent = '\u5DF2\u590D\u5236'
        if (status) status.textContent = '\u5DF2\u590D\u5236 ' + text
        window.setTimeout(function () {
          button.removeAttribute('data-state')
          if (icon) icon.className = 'far fa-copy'
          if (label) label.textContent = '\u590D\u5236'
        }, 1800)
      } catch (error) {
        button.setAttribute('data-state', 'error')
        if (status) status.textContent = '\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u9009\u62E9\u6587\u672C\u3002'
      }
    })
  })

  var search = document.getElementById('model-search')
  var rows = Array.from(document.querySelectorAll('.provider-row'))
  var empty = document.getElementById('search-empty')
  if (search) search.addEventListener('input', function () {
    var query = search.value.trim().toLowerCase()
    var visible = 0
    rows.forEach(function (row) {
      var matched = !query || (row.getAttribute('data-search') || '').includes(query)
      row.classList.toggle('hd', !matched)
      if (matched) visible++
    })
    if (empty) empty.classList.toggle('hd', visible > 0 || !query)
  })
})()
<\/script>
</body></html>`);
  }
  async function renderLoginPage(c) {
    return c.html(`<!DOCTYPE html><html lang="zh-CN">
${H("\u767B\u5F55")}
<body class="site-page auth-page">
<header class="topbar topbar--auth">
  <div class="shell topbar__inner">
    <a class="brand" href="/" aria-label="AI Gateway \u9996\u9875">
      <span class="brand__mark" aria-hidden="true"><i class="fas fa-cloud"></i></span>
      <span class="brand__name">${SITE_CONFIG.title}</span>
    </a>
    <a href="/" class="btn btn-gh"><i class="fas fa-arrow-left" aria-hidden="true"></i>\u8FD4\u56DE\u9996\u9875</a>
  </div>
</header>

<main class="auth-shell">
  <section class="auth-context" aria-labelledby="auth-context-title">
    <p class="eyebrow"><span aria-hidden="true"></span>CONTROL PLANE ACCESS</p>
    <h1 id="auth-context-title">\u7BA1\u7406\u63D0\u4F9B\u5546\u3001\u6A21\u578B\u548C\u8F6C\u53D1\u5BC6\u94A5\u3002</h1>
  </section>

  <section class="auth-form-wrap" aria-labelledby="login-title">
    <form class="auth-form" id="login-form" novalidate>
      <div class="auth-form__heading">
        <span class="auth-form__icon" aria-hidden="true"><i class="fas fa-lock"></i></span>
        <div><h2 id="login-title">\u7BA1\u7406\u5458\u767B\u5F55</h2><p>\u4F7F\u7528\u90E8\u7F72\u65F6\u914D\u7F6E\u7684\u8D26\u53F7\u7EE7\u7EED\u3002</p></div>
      </div>

      <div id="er" class="al al-e hd" role="alert" aria-live="assertive">
        <i class="fas fa-exclamation-circle" aria-hidden="true"></i><span id="em"></span>
      </div>

      <div class="fg">
        <label for="u">\u7528\u6237\u540D</label>
        <div class="input-wrap"><i class="far fa-user" aria-hidden="true"></i><input type="text" id="u" name="username" placeholder="admin" autocomplete="username" aria-required="true" aria-describedby="login-helper"></div>
      </div>
      <div class="fg">
        <label for="p">\u5BC6\u7801</label>
        <div class="input-wrap"><i class="fas fa-key" aria-hidden="true"></i><input type="password" id="p" name="password" placeholder="\u90E8\u7F72\u73AF\u5883\u53D8\u91CF\u4E2D\u7684\u5BC6\u7801" autocomplete="current-password" aria-required="true" aria-describedby="login-helper"><button class="password-toggle" id="password-toggle" type="button" aria-label="\u663E\u793A\u5BC6\u7801"><i class="far fa-eye" aria-hidden="true"></i></button></div>
      </div>
      <p id="login-helper" class="form-helper">\u767B\u5F55\u6210\u529F\u540E\u5C06\u8FDB\u5165\u7BA1\u7406\u63A7\u5236\u53F0\u3002</p>
      <button class="btn btn-p btn-submit" id="login-button" type="submit"><span class="button-label"><i class="fas fa-sign-in-alt" aria-hidden="true"></i>\u767B\u5F55\u7BA1\u7406\u63A7\u5236\u53F0</span><span class="button-loading"><i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i>\u6B63\u5728\u9A8C\u8BC1</span></button>
    </form>
  </section>
</main>

<script>
(function () {
  var form = document.getElementById('login-form')
  var username = document.getElementById('u')
  var password = document.getElementById('p')
  var errorBox = document.getElementById('er')
  var errorMessage = document.getElementById('em')
  var submit = document.getElementById('login-button')
  var toggle = document.getElementById('password-toggle')

  function showError(message) {
    errorMessage.textContent = message
    errorBox.classList.remove('hd')
    username.setAttribute('aria-invalid', 'true')
    password.setAttribute('aria-invalid', 'true')
  }
  function clearError() {
    errorBox.classList.add('hd')
    username.removeAttribute('aria-invalid')
    password.removeAttribute('aria-invalid')
  }

  toggle.addEventListener('click', function () {
    var show = password.type === 'password'
    password.type = show ? 'text' : 'password'
    toggle.setAttribute('aria-label', show ? '\u9690\u85CF\u5BC6\u7801' : '\u663E\u793A\u5BC6\u7801')
    toggle.querySelector('i').className = show ? 'far fa-eye-slash' : 'far fa-eye'
    password.focus({ preventScroll: true })
  })

  form.addEventListener('submit', async function (event) {
    event.preventDefault()
    clearError()
    var u = username.value.trim()
    var p = password.value
    if (!u || !p) {
      showError('\u8BF7\u586B\u5199\u7528\u6237\u540D\u548C\u5BC6\u7801\u540E\u518D\u767B\u5F55\u3002')
      ;(!u ? username : password).focus()
      return
    }
    submit.disabled = true
    submit.setAttribute('data-state', 'loading')
    try {
      var response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
      })
      var data = await response.json()
      if (data.success) {
        submit.setAttribute('data-state', 'success')
        window.location.href = '/admin'
        return
      }
      showError(data.message || '\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u8D26\u53F7\u914D\u7F6E\u3002')
    } catch (error) {
      showError('\u65E0\u6CD5\u8FDE\u63A5\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u3002')
    }
    submit.disabled = false
    submit.removeAttribute('data-state')
  })
})()
<\/script>
</body></html>`);
  }
  async function renderAdminPage(c) {
    const providers = await getProviders(c.env);
    const proxyKeys = await getProxyKeys(c.env);
    const enabledProvidersCount = providers.filter((provider) => provider.enabled).length;
    const modelsCount = providers.reduce((total, provider) => total + provider.models.length, 0);
    const enabledModelsCount = providers.reduce((total, provider) => total + provider.models.filter((model) => model.enabled).length, 0);
    const enabledProxyKeysCount = proxyKeys.filter((key) => key.enabled).length;
    return c.html(`<!DOCTYPE html><html lang="zh-CN">
${H("\u7BA1\u7406")}
<body class="site-page admin-page">
<div class="admin-shell">
  <aside class="admin-rail" aria-label="\u63A7\u5236\u53F0\u5BFC\u822A">
    <a class="brand admin-rail__brand" href="/">
      <span class="brand__mark" aria-hidden="true"><i class="fas fa-cloud"></i></span>
      <span><strong>${SITE_CONFIG.title}</strong><small>CONTROL PLANE</small></span>
    </a>
    <nav class="admin-nav">
      <a class="admin-nav__link is-active" href="#overview"><i class="fas fa-chart-pie" aria-hidden="true"></i><span>\u6982\u89C8</span></a>
      <a class="admin-nav__link" href="#providers"><i class="fas fa-server" aria-hidden="true"></i><span>\u63D0\u4F9B\u5546</span><b>${providers.length}</b></a>
      <a class="admin-nav__link" href="#proxy-keys"><i class="fas fa-key" aria-hidden="true"></i><span>\u8F6C\u53D1 Key</span><b>${proxyKeys.length}</b></a>
    </nav>
    <div class="admin-rail__foot">
      <a href="/" class="admin-nav__link"><i class="fas fa-arrow-left" aria-hidden="true"></i><span>\u8FD4\u56DE\u9996\u9875</span></a>
      <a href="/admin/logout" class="admin-nav__link"><i class="fas fa-sign-out-alt" aria-hidden="true"></i><span>\u9000\u51FA\u767B\u5F55</span></a>
    </div>
  </aside>

  <div class="admin-main">
    <header class="admin-topbar">
      <a class="brand" href="/"><span class="brand__mark" aria-hidden="true"><i class="fas fa-cloud"></i></span><span class="brand__name">${SITE_CONFIG.title}</span></a>
      <nav aria-label="\u79FB\u52A8\u7AEF\u63A7\u5236\u53F0\u5BFC\u822A"><a href="#overview">\u6982\u89C8</a><a href="#providers">\u63D0\u4F9B\u5546</a><a href="#proxy-keys">Key</a></nav>
      <a class="icon-btn" href="/admin/logout" aria-label="\u9000\u51FA\u767B\u5F55"><i class="fas fa-sign-out-alt" aria-hidden="true"></i></a>
    </header>

    <main class="admin-content">
      <div id="toast" class="hd toast" role="status" aria-live="polite"></div>

      <section id="overview" class="admin-overview" aria-labelledby="admin-title">
        <div class="admin-heading">
          <div><p class="eyebrow"><span aria-hidden="true"></span>GATEWAY STATUS</p><h1 id="admin-title">\u7BA1\u7406\u63A7\u5236\u53F0</h1><p>\u914D\u7F6E\u63D0\u4F9B\u5546\u3001\u6A21\u578B\u4E0E\u5BA2\u6237\u7AEF\u8BBF\u95EE\u51ED\u636E\u3002\u53D8\u66F4\u5C06\u5199\u5165 Cloudflare KV\u3002</p></div>
          <div class="admin-heading__actions"><a href="/" class="btn btn-s"><i class="fas fa-external-link-alt" aria-hidden="true"></i>\u67E5\u770B\u6A21\u578B\u5217\u8868</a></div>
        </div>
        <div class="admin-metrics" aria-label="\u914D\u7F6E\u7EDF\u8BA1">
          <div><span>${providers.length}</span><p>\u63D0\u4F9B\u5546</p><small>${enabledProvidersCount} \u4E2A\u5DF2\u542F\u7528</small></div>
          <div><span>${modelsCount}</span><p>\u6A21\u578B</p><small>${enabledModelsCount} \u4E2A\u53EF\u7528</small></div>
          <div><span>${proxyKeys.length}</span><p>\u8F6C\u53D1 Key</p><small>${enabledProxyKeysCount} \u4E2A\u53EF\u7528</small></div>
          <div><span class="status-dot status-dot--online"><i aria-hidden="true"></i>\u5DF2\u914D\u7F6E</span><p>\u5B58\u50A8</p><small>Cloudflare KV</small></div>
        </div>
      </section>

      <section id="providers" class="workspace-section" aria-labelledby="providers-title">
        <div class="section-heading section-heading--admin">
          <div><h2 id="providers-title">\u63D0\u4F9B\u5546</h2><p>\u7BA1\u7406\u4E0A\u6E38\u5730\u5740\u3001\u534F\u8BAE\u3001API Key \u548C\u6A21\u578B\u3002</p></div>
          <button class="btn btn-p" onclick="showAdd()"><i class="fas fa-plus" aria-hidden="true"></i>\u6DFB\u52A0\u63D0\u4F9B\u5546</button>
        </div>

        <div class="af-w">
          <div id="af" class="hd add-form-panel">
            <div class="panel-heading"><div><span class="panel-heading__mark"><i class="fas fa-plus" aria-hidden="true"></i></span><div><h3>\u6DFB\u52A0\u65B0\u63D0\u4F9B\u5546</h3><p>\u5148\u914D\u7F6E\u57FA\u672C\u4FE1\u606F\uFF0C\u518D\u6D4B\u8BD5 Key \u4E0E\u6A21\u578B\u8FDE\u63A5\u3002</p></div></div><button class="icon-btn" type="button" onclick="hideAdd()" aria-label="\u5173\u95ED\u6DFB\u52A0\u8868\u5355"><i class="fas fa-times" aria-hidden="true"></i></button></div>
            <div class="fr">
              <div class="fg"><label for="anm">\u540D\u79F0</label><input type="text" id="anm" placeholder="DeepSeek"></div>
              <div class="fg"><label for="aid">\u63D0\u4F9B\u5546 ID</label><input type="text" id="aid" placeholder="deepseek"><span class="form-helper">\u7528\u4E8E\u6A21\u578B\u524D\u7F00\uFF0C\u521B\u5EFA\u540E\u4E0D\u53EF\u4FEE\u6539\u3002</span></div>
            </div>
            <div class="fg"><label for="aurl">API \u5730\u5740</label><input type="url" id="aurl" placeholder="https://api.deepseek.com"></div>
            <div class="fg"><label for="afmt">API \u683C\u5F0F</label><select id="afmt" class="select-sm"><option value="openai">OpenAI \u517C\u5BB9</option><option value="anthropic">Anthropic \u517C\u5BB9</option></select></div>
            <fieldset class="form-group"><legend>\u4E0A\u6E38 API Keys</legend><div id="akeys"><div class="fc mb-4 field-row"><input type="text" placeholder="sk-xxx" class="fx1 aki" aria-label="\u4E0A\u6E38 API Key"><label class="tg" title="\u542F\u7528 Key"><input type="checkbox" checked class="ake" aria-label="\u542F\u7528 Key"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236 Key" aria-label="\u590D\u5236 Key"><i class="far fa-copy" aria-hidden="true"></i></button><button class="icon-btn" onclick="testNewAKey(this)" title="\u6D4B\u8BD5 Key" aria-label="\u6D4B\u8BD5 Key"><i class="fas fa-plug" aria-hidden="true"></i></button><button class="icon-btn" onclick="this.parentElement.remove()" title="\u79FB\u9664 Key" aria-label="\u79FB\u9664 Key"><i class="fas fa-times" aria-hidden="true"></i></button></div></div><button class="btn btn-s" onclick="addAKeyRow()"><i class="fas fa-plus" aria-hidden="true"></i>\u6DFB\u52A0 Key</button></fieldset>
            <aside id="amc" class="hd mdl-list-panel"><div class="panel-heading"><div><span class="panel-heading__mark"><i class="fas fa-cube" aria-hidden="true"></i></span><div><h3>\u53EF\u7528\u6A21\u578B</h3><p>\u70B9\u51FB\u201C+\u201D\u6DFB\u52A0\u5230\u914D\u7F6E\u3002</p></div></div><button class="icon-btn" type="button" onclick="hideMdlPanel('amc')" title="\u5173\u95ED\u53EF\u7528\u6A21\u578B" aria-label="\u5173\u95ED\u53EF\u7528\u6A21\u578B"><i class="fas fa-times" aria-hidden="true"></i></button></div><div id="amcl"></div></aside>
            <fieldset class="form-group"><legend>\u6A21\u578B ID</legend><div id="amodels"><div class="fc mb-4 field-row"><input type="text" placeholder="deepseek-chat" class="fx1 ami" aria-label="\u6A21\u578B ID"><label class="tg" title="\u542F\u7528\u6A21\u578B"><input type="checkbox" checked class="ame" aria-label="\u542F\u7528\u6A21\u578B"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236\u6A21\u578B ID" aria-label="\u590D\u5236\u6A21\u578B ID"><i class="far fa-copy" aria-hidden="true"></i></button><button class="icon-btn" onclick="testNewMdl(this)" title="\u6D4B\u8BD5\u6A21\u578B" aria-label="\u6D4B\u8BD5\u6A21\u578B"><i class="fas fa-plug" aria-hidden="true"></i></button><button class="icon-btn" onclick="this.parentElement.remove()" title="\u79FB\u9664\u6A21\u578B" aria-label="\u79FB\u9664\u6A21\u578B"><i class="fas fa-times" aria-hidden="true"></i></button></div></div><button class="btn btn-s" onclick="addMdlRow()"><i class="fas fa-plus" aria-hidden="true"></i>\u6DFB\u52A0\u6A21\u578B</button></fieldset>
            <div class="panel-actions"><label class="switch-label"><span>\u521B\u5EFA\u540E\u7ACB\u5373\u542F\u7528</span><span class="tg"><input type="checkbox" checked id="aen"><span class="sl"></span></span></label><div><button class="btn btn-s" onclick="hideAdd()">\u53D6\u6D88</button><button class="btn btn-p" onclick="createProv()"><i class="fas fa-check" aria-hidden="true"></i>\u521B\u5EFA\u63D0\u4F9B\u5546</button></div></div>
            <div id="atestR" class="mt-1" aria-live="polite"></div>
          </div>
        </div>

        <div class="gp provider-list" id="plist">
          ${providers.length ? providers.map((p) => `
          <article class="pi" data-id="${escapePageHtml(p.id)}">
            <div class="ps" onclick="tog('${p.id}')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();tog('${p.id}')}" aria-controls="dt-${escapePageHtml(p.id)}">
              <div class="l"><i class="fas fa-chevron-right provider-chevron" aria-hidden="true" id="ch-${escapePageHtml(p.id)}"></i><span class="provider-avatar" aria-hidden="true">${escapePageHtml(p.name.charAt(0).toUpperCase() || "A")}</span><div><h3>${escapePageHtml(p.name)}</h3><div class="pu"><code>${escapePageHtml(p.id)}</code><span>${(p.apiType || "openai") === "anthropic" ? "Anthropic" : "OpenAI"}</span><span>${p.apiKeys.length} Keys</span><span>${p.models.length} \u6A21\u578B</span></div></div></div>
              <div class="fc fx-s0" onclick="event.stopPropagation()"><label class="tg"><input type="checkbox" ${p.enabled ? "checked" : ""} id="en-${escapePageHtml(p.id)}" onchange="togglePb('${p.id}',this.checked)" aria-label="\u542F\u7528 ${escapePageHtml(p.name)}"><span class="sl"></span></label><span class="bd ${p.enabled ? "bd-on" : "bd-off"}">${p.enabled ? "\u5DF2\u542F\u7528" : "\u672A\u542F\u7528"}</span></div>
            </div>
            <div class="pd" id="dt-${escapePageHtml(p.id)}">
              <div class="detail-heading"><div><h3>\u7F16\u8F91 ${escapePageHtml(p.name)}</h3><p>\u4FDD\u5B58\u540E\uFF0C\u65B0\u914D\u7F6E\u4F1A\u7528\u4E8E\u540E\u7EED\u8F6C\u53D1\u8BF7\u6C42\u3002</p></div><span class="protocol-chip">${(p.apiType || "openai") === "anthropic" ? "ANTHROPIC" : "OPENAI"}</span></div>
              <div class="fr"><div class="fg"><label>\u540D\u79F0</label><input type="text" id="nm-${escapePageHtml(p.id)}" value="${escapePageHtml(p.name)}"></div><div class="fg"><label>ID</label><input type="text" value="${escapePageHtml(p.id)}" disabled></div></div>
              <div class="fg"><label>API \u5730\u5740</label><input type="url" id="url-${escapePageHtml(p.id)}" value="${escapePageHtml(p.baseUrl)}"></div>
              <div class="fg"><label>API \u683C\u5F0F</label><select id="at-${escapePageHtml(p.id)}" class="select-sm"><option value="openai" ${(p.apiType || "openai") === "openai" ? "selected" : ""}>OpenAI \u517C\u5BB9</option><option value="anthropic" ${p.apiType === "anthropic" ? "selected" : ""}>Anthropic \u517C\u5BB9</option></select></div>
              <fieldset class="form-group"><legend>\u4E0A\u6E38 API Keys</legend><div id="keys-${escapePageHtml(p.id)}">${p.apiKeys.map((k, ki) => `<div class="fc mb-3 field-row" data-kidx="${ki}"><input type="text" value="${escapePageHtml(k.key)}" class="fx1" id="k-${escapePageHtml(p.id)}-${ki}" placeholder="API Key" aria-label="API Key"><label class="tg"><input type="checkbox" ${k.enabled ? "checked" : ""} id="ken-${escapePageHtml(p.id)}-${ki}" aria-label="\u542F\u7528 Key"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236 Key" aria-label="\u590D\u5236 Key"><i class="far fa-copy" aria-hidden="true"></i></button><button class="icon-btn" onclick="testKeyRow('${p.id}',${ki})" title="\u6D4B\u8BD5 Key" aria-label="\u6D4B\u8BD5 Key"><i class="fas fa-plug" aria-hidden="true"></i></button><button class="icon-btn" onclick="rmKeyRow('${p.id}',${ki})" title="\u79FB\u9664 Key" aria-label="\u79FB\u9664 Key"><i class="fas fa-times" aria-hidden="true"></i></button></div>`).join("")}</div><div class="fc mt-1 field-row"><input type="text" id="nk-${escapePageHtml(p.id)}" placeholder="\u65B0\u7684 API Key" class="fx1"><button class="btn btn-s" onclick="addKeyRow('${p.id}')"><i class="fas fa-plus" aria-hidden="true"></i>\u6DFB\u52A0</button></div></fieldset>
              <fieldset class="form-group"><legend>\u6A21\u578B</legend><div id="ml-${escapePageHtml(p.id)}">${p.models.map((m, mi) => `<div class="fc mb-3 field-row" data-idx="${mi}"><input type="text" value="${escapePageHtml(m.id)}" class="fx1" id="mid-${escapePageHtml(p.id)}-${mi}" placeholder="\u6A21\u578B ID"><label class="tg"><input type="checkbox" ${m.enabled ? "checked" : ""} id="men-${escapePageHtml(p.id)}-${mi}" aria-label="\u542F\u7528\u6A21\u578B"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236\u6A21\u578B ID" aria-label="\u590D\u5236\u6A21\u578B ID"><i class="far fa-copy" aria-hidden="true"></i></button><button class="icon-btn" onclick="testMdl('${p.id}','${m.id}',${mi})" title="\u6D4B\u8BD5\u6A21\u578B" aria-label="\u6D4B\u8BD5\u6A21\u578B"><i class="fas fa-plug" aria-hidden="true"></i></button><button class="icon-btn" onclick="rmMdl('${p.id}',${mi})" title="\u79FB\u9664\u6A21\u578B" aria-label="\u79FB\u9664\u6A21\u578B"><i class="fas fa-times" aria-hidden="true"></i></button></div>`).join("")}</div><div class="fc mt-1 field-row"><input type="text" id="nmid-${escapePageHtml(p.id)}" placeholder="\u65B0\u7684\u6A21\u578B ID" class="fx1"><button class="btn btn-s" onclick="addMdl('${p.id}')"><i class="fas fa-plus" aria-hidden="true"></i>\u6DFB\u52A0</button></div></fieldset>
              <div class="detail-actions"><div id="tr-${escapePageHtml(p.id)}" aria-live="polite"></div><div>${p.id === "opencode" ? `<button class="btn btn-s" onclick="fetchEditModels('` + p.id + `')"><i class="fas fa-download" aria-hidden="true"></i>\u83B7\u53D6\u6A21\u578B</button>` : ""}<button class="btn btn-d" onclick="del('${p.id}')"><i class="fas fa-trash" aria-hidden="true"></i>\u5220\u9664</button><button class="btn btn-p" onclick="save('${p.id}')"><i class="fas fa-save" aria-hidden="true"></i>\u4FDD\u5B58\u66F4\u6539</button></div></div>
            </div>
          </article>`).join("") : `<div class="empty-state"><i class="fas fa-server" aria-hidden="true"></i><h3>\u8FD8\u6CA1\u6709\u63D0\u4F9B\u5546</h3><p>\u6DFB\u52A0\u7B2C\u4E00\u4E2A\u4E0A\u6E38\u63D0\u4F9B\u5546\uFF0C\u914D\u7F6E API \u5730\u5740\u3001Key \u548C\u6A21\u578B\u3002</p><button class="btn btn-p" onclick="showAdd()">\u6DFB\u52A0\u63D0\u4F9B\u5546</button></div>`}
        </div>
      </section>

      <section id="proxy-keys" class="workspace-section" aria-labelledby="proxy-keys-title">
        <div class="section-heading section-heading--admin"><div><h2 id="proxy-keys-title">\u8F6C\u53D1 Key</h2><p>\u5BA2\u6237\u7AEF\u4F7F\u7528\u8FD9\u4E9B Key \u8BBF\u95EE\u7EDF\u4E00\u7684 <code>/v1</code> \u63A5\u53E3\u3002</p></div><button class="btn btn-p" onclick="genKey()"><i class="fas fa-plus" aria-hidden="true"></i>\u751F\u6210\u8F6C\u53D1 Key</button></div>
        <div class="key-list">
          ${proxyKeys.length === 0 ? '<div class="empty-state"><i class="fas fa-key" aria-hidden="true"></i><h3>\u6682\u65E0\u8F6C\u53D1 Key</h3><p>\u751F\u6210\u4E00\u4E2A Key \u540E\uFF0C\u5BA2\u6237\u7AEF\u624D\u80FD\u8BBF\u95EE\u7F51\u5173\u3002</p><button class="btn btn-p" onclick="genKey()">\u751F\u6210\u8F6C\u53D1 Key</button></div>' : ""}
          ${proxyKeys.map((k) => `<article class="ki" data-id="${escapePageHtml(k.id)}"><div class="key-main"><span class="key-icon" aria-hidden="true"><i class="fas fa-key"></i></span><div><div class="kv"><span id="kv-${escapePageHtml(k.id)}" data-full="${escapePageHtml(k.key)}" data-vis="0">${escapePageHtml(k.key.length > 12 ? k.key.substring(0, 8) + "*****" + k.key.substring(k.key.length - 4) : k.key)}</span><button class="icon-btn" onclick="toggleKeyVis('${k.id}')" title="\u663E\u793A\u6216\u9690\u85CF" aria-label="\u663E\u793A\u6216\u9690\u85CF Key"><i class="far fa-eye" aria-hidden="true"></i></button><button class="icon-btn" onclick='copyText("${escapePageHtml(k.key)}",this)' title="\u590D\u5236" aria-label="\u590D\u5236 Key"><i class="far fa-copy" aria-hidden="true"></i></button></div><div class="key-meta"><h3>${escapePageHtml(k.name)}</h3><span class="key-meta__sep" aria-hidden="true">-</span><p>\u521B\u5EFA\u4E8E ${new Date(k.createdAt).toLocaleDateString()} \xB7 ${k.expiresAt ? "\u6709\u6548\u81F3 " + new Date(k.expiresAt).toLocaleDateString() : "\u6C38\u4E45\u6709\u6548"}</p></div></div></div><div class="key-actions"><label class="tg"><input type="checkbox" ${k.enabled ? "checked" : ""} onchange="toggleProxyKey('${k.id}',this.checked)" aria-label="\u542F\u7528 ${escapePageHtml(k.name)}"><span class="sl"></span></label><span class="bd ${k.enabled ? "bd-on" : "bd-off"}">${k.enabled ? "\u5DF2\u542F\u7528" : "\u5DF2\u7981\u7528"}</span><button class="bd bd-del" onclick="rmKey('${k.id}')"><i class="fas fa-trash" aria-hidden="true"></i>\u5220\u9664</button></div></article>`).join("")}
        </div>
      </section>
    </main>

    ${renderSiteFooter(SITE_CONFIG.title)}
  </div>
</div>

<div id="modal" class="modal-o hd" role="presentation" onclick="if(event.target===this)closeM()"><div class="modal" id="mc" role="dialog" aria-modal="true" aria-live="polite"></div></div>

<script>${SHARED_JS}
// copy
function copyText(t, el) {
  const i = el.tagName === 'I' ? el : (el.querySelector('i') || el.parentElement?.querySelector('i'))
  if (!i) { navigator.clipboard.writeText(t).catch(() => {}); return }
  const oc = i.className
  navigator.clipboard.writeText(t).then(() => {
    i.className = 'fas fa-check c-s'
    el.setAttribute('data-state', 'success')
    setTimeout(() => {
      i.className = oc
      el.removeAttribute('data-state')
    }, 1800)
  }).catch(() => {
    el.setAttribute('data-state', 'error')
  })
}

// \u4ECE\u5F53\u524D\u884C\u8BFB\u53D6\u5B9E\u65F6\u8F93\u5165\u503C\u5E76\u590D\u5236\uFF08Key \u884C\u4E0E\u6A21\u578B ID \u884C\u5171\u7528\uFF09
function copyRowVal(btn) {
  const inp = btn.parentElement.querySelector('input[type=text]')
  if (inp) copyText(inp.value, btn)
}

// modal
function showM(h) { document.getElementById('mc').innerHTML = h; document.getElementById('modal').classList.remove('hd') }
function closeM() { document.getElementById('modal').classList.add('hd') }
function cM(msg) {
  return new Promise(r => {
    showM('<h3><i class="fas fa-question-circle c-p"></i> \u786E\u8BA4</h3><p>' + msg + '</p><div class="fa"><button class="btn btn-s" onclick="closeM();r(false)">\u53D6\u6D88</button><button class="btn btn-p" onclick="closeM();r(true)">\u786E\u5B9A</button></div>')
    window.r = r
  })
}
function pM(msg, def) {
  return new Promise(r => {
    showM('<h3><i class="fas fa-pen c-p"></i> ' + msg + '</h3><div class="fg"><input type="text" id="pv" value="' + (def || '') + '" placeholder="\u8BF7\u8F93\u5165"></div><div class="fa"><button class="btn btn-s" id="pMc">\u53D6\u6D88</button><button class="btn btn-p" id="pMo">\u786E\u5B9A</button></div>')
    window.r = r
    const inp = document.getElementById('pv')
    if (inp) {
      inp.focus()
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { closeM(); r(inp.value.trim()) }
      })
    }
    document.getElementById('pMc').addEventListener('click', function() { closeM(); r(null) })
    document.getElementById('pMo').addEventListener('click', function() { closeM(); r(inp.value.trim()) })
  })
}
function aM(msg, t) {
  const i = t === 'success' ? 'fa-check-circle c-s' : 'fa-exclamation-circle c-d'
  showM('<h3><i class="fas ' + i + '"></i> ' + (t === 'success' ? '\u6210\u529F' : '\u63D0\u793A') + '</h3><p>' + msg + '</p><div class="fa"><button class="btn btn-p" onclick="closeM()">\u786E\u5B9A</button></div>')
}

function toast(msg, t) {
  const el = document.getElementById('toast')
  const i = t === 'success' ? 'fa-check-circle' : 'fa-times-circle'
  const cls = t === 'success' ? 'al-s' : 'al-e'
  el.innerHTML = '<div class="al ' + cls + '"><i class="fas ' + i + '"></i> ' + escapeHtml(msg) + '</div>'
  el.classList.remove('hd')
  setTimeout(() => el.classList.add('hd'), 3000)
}

// providers
function tog(id) {
  const d = document.getElementById('dt-' + id), c = document.getElementById('ch-' + id)
  d.classList.toggle('open')
  c.style.transform = d.classList.contains('open') ? 'rotate(90deg)' : ''
}

function showAdd() { document.getElementById('af').classList.remove('hd') }
function hideAdd() { document.getElementById('af').classList.add('hd'); document.getElementById('amc').classList.add('hd') }

// aid \u8F93\u5165 opencode \u65F6\u81EA\u52A8\u586B\u5145 API \u5730\u5740
document.getElementById('aid').addEventListener('input', function() {
  if (this.value.trim() === 'opencode') {
    document.getElementById('aurl').value = '${OPENCODE_DEFAULT_URL}'
  }
})

// provider api keys (add form)
function addAKeyRow() {
  const c = document.getElementById('akeys')
  const d = document.createElement('div')
  d.className = 'fc mb-4 field-row'
  d.innerHTML = '<input type="text" placeholder="sk-xxx" class="fx1 aki" aria-label="\u4E0A\u6E38 API Key"><label class="tg"><input type="checkbox" checked class="ake" aria-label="\u542F\u7528 Key"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236 Key" aria-label="\u590D\u5236 Key"><i class="far fa-copy"></i></button><button class="icon-btn" onclick="testNewAKey(this)" title="\u6D4B\u8BD5 Key" aria-label="\u6D4B\u8BD5 Key"><i class="fas fa-plug"></i></button><button class="icon-btn" onclick="this.parentElement.remove()" title="\u79FB\u9664 Key" aria-label="\u79FB\u9664 Key"><i class="fas fa-times"></i></button>'
  c.appendChild(d)
}

function renderModelGrid(models, editId, providerId) {
  if (providerId === 'opencode') {
    models = (models || []).filter(function(m) {
      return m && typeof m.id === 'string' && /^[A-Za-z0-9._:/-]+$/.test(m.id) && (m.id === 'big-pickle' || m.id.endsWith('-free'))
    })
  }
  if (!models || models.length === 0) return '<span class="mu">\u672A\u8FD4\u56DE\u6A21\u578B\u5217\u8868</span>'
  var h = models.map(function(m) {
    var modelId = String(m.id || '')
    var safeId = escapeHtml(modelId)
    var addFn = editId
      ? "addMdlToEdit('" + editId + "','" + modelId + "')"
      : "addMdlToForm('" + modelId + "')"
    return '<div class="mdl-item">' +
      '<i class="fas fa-cube"></i>' +
			'<span class="fx1 cp ov" onclick="copyText(\\'' + modelId + '\\',this)">' + safeId + '</span>' +
      '<button class="btn btn-gh mdl-add-btn" onclick="' + addFn + '" title="\u6DFB\u52A0\u5230\u8868\u5355">+</button></div>'
  }).join('')
  return '<div class="grid-2-gap6">' + h + '</div>'
}

// \u53EF\u7528\u6A21\u578B\u9762\u677F heading\uFF08\u6DFB\u52A0\u6001\u9759\u6001 HTML \u4E0E\u7F16\u8F91\u6001\u52A8\u6001\u751F\u6210\u5171\u7528\u540C\u4E00\u7ED3\u6784\uFF09
function modelPanelHeading(panelId) {
  return '<div class="panel-heading"><div>' +
    '<span class="panel-heading__mark"><i class="fas fa-cube" aria-hidden="true"></i></span>' +
    '<div><h3>\u53EF\u7528\u6A21\u578B</h3><p>\u70B9\u51FB\u201C+\u201D\u6DFB\u52A0\u5230\u914D\u7F6E\u3002</p></div></div>' +
    '<button class="icon-btn" type="button" onclick="hideMdlPanel(\\'' + panelId + '\\')" title="\u5173\u95ED\u53EF\u7528\u6A21\u578B" aria-label="\u5173\u95ED\u53EF\u7528\u6A21\u578B"><i class="fas fa-times" aria-hidden="true"></i></button></div>'
}

// \u5173\u95ED\u53EF\u7528\u6A21\u578B\u9762\u677F\uFF08\u4EC5\u9690\u85CF\uFF0C\u4E0D\u6E05\u7A7A\u5DF2\u83B7\u53D6\u7684\u6A21\u578B\u6570\u636E\uFF09
function hideMdlPanel(panelId) {
  document.getElementById(panelId).classList.add('hd')
}

function testNewAKey(btn) {
  const inp = btn.parentElement.querySelector('.aki'), k = inp.value.trim()
  const providerId = document.getElementById('aid').value.trim()
  if (!k && providerId !== 'opencode') { toast('\u8BF7\u8F93\u5165 API Key', 'error'); return }
  const url = document.getElementById('aurl').value.trim()
  if (!url) { toast('\u8BF7\u5148\u586B\u5199 API \u5730\u5740', 'error'); return }
  const apiType = document.getElementById('afmt').value
  const tr = document.getElementById('atestR')
  showSpinner(tr)
  testKeyConnection(url, apiType, k, providerId).then(function(result) {
    if (result.success && result.data) {
      document.getElementById('amcl').innerHTML = renderModelGrid(result.data.data || [], null, providerId)
      document.getElementById('amc').classList.remove('hd')
    } else {
      document.getElementById('amc').classList.add('hd')
    }
    showResult(tr, result.success, result.success ? '' : 'HTTP ' + result.status)
  })
}

let mdlCount = 1
function addMdlRow() {
  const c = document.getElementById('amodels')
  const d = document.createElement('div')
  d.className = 'fc mb-4 field-row'
  d.innerHTML = '<input type="text" placeholder="deepseek-chat" class="fx1 ami" aria-label="\u6A21\u578B ID"><label class="tg"><input type="checkbox" checked class="ame" aria-label="\u542F\u7528\u6A21\u578B"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236\u6A21\u578B ID" aria-label="\u590D\u5236\u6A21\u578B ID"><i class="far fa-copy"></i></button><button class="icon-btn" onclick="testNewMdl(this)" title="\u6D4B\u8BD5\u6A21\u578B" aria-label="\u6D4B\u8BD5\u6A21\u578B"><i class="fas fa-plug"></i></button><button class="icon-btn" onclick="this.parentElement.remove()" title="\u79FB\u9664\u6A21\u578B" aria-label="\u79FB\u9664\u6A21\u578B"><i class="fas fa-times"></i></button>'
  c.appendChild(d)
}

function addMdlToForm(mid) {
  const c = document.getElementById('amodels')
  const d = document.createElement('div')
  d.className = 'fc mb-4 field-row'
  d.innerHTML = '<input type="text" value="' + escapeHtml(mid) + '" class="fx1 ami" aria-label="\u6A21\u578B ID"><label class="tg"><input type="checkbox" checked class="ame" aria-label="\u542F\u7528\u6A21\u578B"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236\u6A21\u578B ID" aria-label="\u590D\u5236\u6A21\u578B ID"><i class="far fa-copy"></i></button><button class="icon-btn" onclick="testNewMdl(this)" title="\u6D4B\u8BD5\u6A21\u578B" aria-label="\u6D4B\u8BD5\u6A21\u578B"><i class="fas fa-plug"></i></button><button class="icon-btn" onclick="this.parentElement.remove()" title="\u79FB\u9664\u6A21\u578B" aria-label="\u79FB\u9664\u6A21\u578B"><i class="fas fa-times"></i></button>'
  c.appendChild(d)
}

function testNewMdl(btn) {
  const inp = btn.parentElement.querySelector('.ami'), mid = inp.value.trim()
  if (!mid) { toast('\u8BF7\u8F93\u5165\u6A21\u578B ID', 'error'); return }
  const url = document.getElementById('aurl').value.trim()
    const akeys = document.querySelectorAll('#akeys .aki')
    const configuredKey = Array.from(akeys).map(function(inp) { return inp.value.trim() }).filter(Boolean)[0] || ''
    const apiType = document.getElementById('afmt').value
    const tr = document.getElementById('atestR')
    showSpinner(tr)
  const providerId = document.getElementById('aid').value.trim()
  const apiKey = configuredKey || (providerId === 'opencode' ? '' : 'dummy')
  testModelConnection(url, apiType, apiKey, mid, providerId).then(function(result) {
    showResult(tr, result.success, result.success ? '' : 'HTTP ' + result.status)
  })
}

async function createProv() {
  const nm = document.getElementById('anm').value.trim(), id = document.getElementById('aid').value.trim()
  const url = document.getElementById('aurl').value.trim(), apiType = document.getElementById('afmt').value
  const aki = document.querySelectorAll('#akeys .aki')
  const keys = Array.from(aki).map((inp, i) => {
    const k = inp.value.trim()
    const en = inp.parentElement.querySelector('.ake')?.checked ?? true
    return k ? { key: k, enabled: en } : null
  }).filter(Boolean)
  const ami = document.querySelectorAll('#amodels .ami')
  const models = Array.from(ami).map(inp => {
    const mid = inp.value.trim()
    const en = inp.parentElement.querySelector('.ame')?.checked ?? true
    return mid ? { id: mid, enabled: en } : null
  }).filter(Boolean)
  const enabled = document.getElementById('aen').checked
  if (!nm || !id || !url) { toast('\u8BF7\u586B\u5199\u540D\u79F0\u3001ID \u548C API \u5730\u5740', 'error'); return }
  const r = await fetch('/admin/api/providers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name: nm, baseUrl: url, apiType, apiKeys: keys, models, enabled })
  })
  const d = await r.json()
  if (d.success) { toast('\u5DF2\u521B\u5EFA', 'success'); location.reload() }
  else toast(d.message || '\u521B\u5EFA\u5931\u8D25', 'error')
}

// provider api keys (edit)
function getKeys(id) {
  const c = document.getElementById('keys-' + id)
  const items = c.querySelectorAll('[data-kidx]')
  return Array.from(items).map(item => {
    const idx = parseInt(item.dataset.kidx)
    const k = document.getElementById('k-' + id + '-' + idx).value.trim()
    const en = document.getElementById('ken-' + id + '-' + idx).checked
    return k ? { key: k, enabled: en } : null
  }).filter(Boolean)
}

function addKeyRow(id) {
  const inp = document.getElementById('nk-' + id), k = inp.value.trim()
  if (!k) { toast('\u8BF7\u8F93\u5165 API Key', 'error'); return }
  const c = document.getElementById('keys-' + id), cnt = c.querySelectorAll('[data-kidx]').length
  const d = document.createElement('div')
  d.className = 'fc mb-3 field-row'
  d.dataset.kidx = cnt
  d.innerHTML = '<input type="text" value="' + k + '" class="fx1" id="k-' + id + '-' + cnt + '" placeholder="API Key"><label class="tg"><input type="checkbox" checked id="ken-' + id + '-' + cnt + '"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236 Key" aria-label="\u590D\u5236 Key"><i class="far fa-copy"></i></button><button class="icon-btn" onclick="testKeyRow(\\'' + id + '\\',' + cnt + ')" title="\u6D4B\u8BD5 Key" aria-label="\u6D4B\u8BD5 Key"><i class="fas fa-plug"></i></button><button class="icon-btn" onclick="rmKeyRow(\\'' + id + '\\',' + cnt + ')" title="\u79FB\u9664 Key" aria-label="\u79FB\u9664 Key"><i class="fas fa-times"></i></button>'
  c.appendChild(d)
  inp.value = ''
  inp.focus()
}

function rmKeyRow(id, idx) {
  const c = document.getElementById('keys-' + id)
  c.querySelectorAll('[data-kidx]').forEach(item => {
    if (parseInt(item.dataset.kidx) === idx) item.remove()
  })
}

async function testKeyRow(id, idx) {
  const k = document.getElementById('k-' + id + '-' + idx).value.trim()
  const url = document.getElementById('url-' + id).value.trim()
  if (!k) { toast('\u8BF7\u8F93\u5165 API Key', 'error'); return }
  const apiType = document.getElementById('at-' + id).value
  const tr = document.getElementById('tr-' + id)
  showSpinner(tr)
  const result = await testKeyConnection(url, apiType, k, id)
  showResult(tr, result.success, result.success ? '' : 'HTTP ' + result.status)
  if (result.success && result.data) {
    showEditModelsList(id, result.data.data || [])
  }
}

// opencode \u7F16\u8F91\u8868\u5355 \u2014 \u83B7\u53D6\u6A21\u578B\uFF08\u590D\u7528 testKeyConnection \u903B\u8F91\uFF09
async function fetchEditModels(id) {
  const url = document.getElementById('url-' + id).value.trim()
  const keys = getKeys(id)
  const apiKey = keys.length > 0 ? keys[0].key : ''
  const apiType = document.getElementById('at-' + id).value
  const tr = document.getElementById('tr-' + id)
  showSpinner(tr)
  const result = await testKeyConnection(url, apiType, apiKey, id)
  showResult(tr, result.success, result.success ? '' : escapeHtml(result.message || '\u83B7\u53D6\u6A21\u578B\u5931\u8D25'))
  if (result.success && result.data) {
    showEditModelsList(id, result.data.data || [])
  }
}

function showEditModelsList(id, models) {
  const cid = 'mel-' + id
  let el = document.getElementById(cid)
  if (!el) {
    // \u4EE5 API Keys fieldset \u4E3A\u951A\u70B9\u63D2\u5165\uFF0C\u7ED3\u6784\u4E0E\u6DFB\u52A0\u6001\u7684 #amc \u5BF9\u79F0
    const keysFs = document.getElementById('keys-' + id).closest('fieldset')
    el = document.createElement('aside')
    el.id = cid
    el.className = 'mdl-list-panel'
    el.innerHTML = modelPanelHeading(cid) + '<div id="melc-' + id + '"></div>'
    keysFs.insertAdjacentElement('afterend', el)
  }
  el.classList.remove('hd')
  document.getElementById('melc-' + id).innerHTML = renderModelGrid(models, id, id)
}

function addMdlToEdit(id, mid) {
  document.getElementById('nmid-' + id).value = mid
  addMdl(id)
}

function getMdl(id) {
  const c = document.getElementById('ml-' + id), items = c.querySelectorAll('[data-idx]')
  return Array.from(items).map(item => {
    const idx = parseInt(item.dataset.idx), mid = document.getElementById('mid-' + id + '-' + idx).value.trim()
    const en = document.getElementById('men-' + id + '-' + idx).checked
    return mid ? { id: mid, enabled: en } : null
  }).filter(Boolean)
}

async function save(id) {
  const nm = document.getElementById('nm-' + id).value.trim(), url = document.getElementById('url-' + id).value.trim()
  const apiType = document.getElementById('at-' + id).value
  const keys = getKeys(id)
  const models = getMdl(id), enabled = document.getElementById('en-' + id).checked
  const r = await fetch('/admin/api/providers/' + encodeURIComponent(id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nm, baseUrl: url, apiType, apiKeys: keys, models, enabled })
  })
  const d = await r.json()
  if (d.success) { toast('\u5DF2\u4FDD\u5B58', 'success'); location.reload() }
  else toast(d.message || '\u4FDD\u5B58\u5931\u8D25', 'error')
}

async function del(id) {
  if (!(await cM('\u786E\u5B9A\u8981\u5220\u9664\u6B64\u63D0\u4F9B\u5546\uFF1F'))) return
  const r = await fetch('/admin/api/providers/' + encodeURIComponent(id), { method: 'DELETE' })
  const d = await r.json()
  if (d.success) { toast('\u5DF2\u5220\u9664', 'success'); location.reload() }
  else toast(d.message || '\u5220\u9664\u5931\u8D25', 'error')
}

function addMdl(id) {
  const inp = document.getElementById('nmid-' + id), mid = inp.value.trim()
  if (!mid) { toast('\u8BF7\u8F93\u5165\u6A21\u578B ID', 'error'); return }
  const c = document.getElementById('ml-' + id), cnt = c.querySelectorAll('[data-idx]').length
  const d = document.createElement('div')
  d.className = 'fc mb-3 field-row'
  d.dataset.idx = cnt
  d.innerHTML = '<input type="text" value="' + escapeHtml(mid) + '" class="fx1" id="mid-' + escapeHtml(id) + '-' + cnt + '" placeholder="\u6A21\u578B ID"><label class="tg"><input type="checkbox" checked id="men-' + escapeHtml(id) + '-' + cnt + '"><span class="sl"></span></label><button class="icon-btn" onclick="copyRowVal(this)" title="\u590D\u5236\u6A21\u578B ID" aria-label="\u590D\u5236\u6A21\u578B ID"><i class="far fa-copy"></i></button><button class="icon-btn" id="tm-' + escapeHtml(id) + '-' + cnt + '" title="\u6D4B\u8BD5\u6A21\u578B" aria-label="\u6D4B\u8BD5\u6A21\u578B"><i class="fas fa-plug"></i></button><button class="icon-btn" id="rm-' + escapeHtml(id) + '-' + cnt + '" title="\u79FB\u9664\u6A21\u578B" aria-label="\u79FB\u9664\u6A21\u578B"><i class="fas fa-times"></i></button>'
  c.appendChild(d)
  document.getElementById('tm-' + id + '-' + cnt).addEventListener('click', function() { testMdl(id, mid, cnt) })
  document.getElementById('rm-' + id + '-' + cnt).addEventListener('click', function() { rmMdl(id, cnt) })
  inp.value = ''
}

function rmMdl(id, idx) {
  const c = document.getElementById('ml-' + id)
  c.querySelectorAll('[data-idx]').forEach(item => {
    if (parseInt(item.dataset.idx) === idx) item.remove()
  })
}

async function testMdl(id, mid, idx) {
  const tr = document.getElementById('tr-' + id)
  showSpinner(tr)
  try {
    const r = await fetch('/admin/api/providers/' + encodeURIComponent(id) + '/test-model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelId: mid })
    })
    const d = await r.json()
    if (d.success && d.data) {
      showResult(tr, d.data.success, d.data.success ? '' : (d.data.message || '\u8FDE\u63A5\u5931\u8D25'))
    } else {
      showResult(tr, false, d.message || '\u6D4B\u8BD5\u5931\u8D25')
    }
  } catch (e) { showResult(tr, false, '\u8BF7\u6C42\u5931\u8D25') }
}

// proxy keys
async function genKey() {
  const name = await pM('\u8F93\u5165 Key \u540D\u79F0\uFF08\u53EF\u9009\uFF09')
  if (name === null) return
  showM('<h3><i class="fas fa-key c-p"></i> \u751F\u6210\u8F6C\u53D1 Key</h3><div class="fg"><label>\u6709\u6548\u671F</label><select id="exp"><option value="30d">30 \u5929</option><option value="90d">90 \u5929</option><option value="180d">180 \u5929</option><option value="1y">1 \u5E74</option><option value="forever" selected>\u6C38\u4E45</option></select></div><div class="fa"><button class="btn btn-s" id="gKc">\u53D6\u6D88</button><button class="btn btn-p" id="gKo">\u751F\u6210</button></div>')
  document.getElementById('gKc').addEventListener('click', closeM)
  document.getElementById('gKo').addEventListener('click', function() { doGenKey(document.getElementById('exp').value, name) })
}

async function doGenKey(exp, name) {
  closeM()
  const nm = name || ''
  const r = await fetch('/admin/api/proxy-keys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nm, expiresIn: exp })
  })
  const d = await r.json()
  if (d.success && d.data) {
    showM('<h3><i class="fas fa-check-circle c-s"></i> \u751F\u6210\u6210\u529F</h3><p>\u8BF7\u59A5\u5584\u4FDD\u5B58\uFF0C\u5207\u52FF\u6CC4\u9732\uFF1A</p><div class="mk">' + d.data.key + '</div><div class="fa"><button class="btn btn-p" onclick="closeM();location.reload()">\u5173\u95ED</button></div>')
  } else toast(d.message || '\u751F\u6210\u5931\u8D25', 'error')
}

async function rmKey(id) {
  if (!(await cM('\u786E\u5B9A\u8981\u5220\u9664\u6B64 Key\uFF1F'))) return
  const r = await fetch('/admin/api/proxy-keys/' + encodeURIComponent(id), { method: 'DELETE' })
  const d = await r.json()
  if (d.success) { toast('\u5DF2\u5220\u9664', 'success'); location.reload() }
  else toast(d.message || '\u5220\u9664\u5931\u8D25', 'error')
}

// proxy key list interactions
async function togglePb(id, checked) {
  const pi = document.querySelector('.pi[data-id="' + id + '"]')
  if (!pi) return
  const b = pi.querySelector('.ps .bd')
  if (b) { b.textContent = checked ? '\u5DF2\u542F\u7528' : '\u672A\u542F\u7528'; b.className = 'bd ' + (checked ? 'bd-on' : 'bd-off') }
  const r = await fetch('/admin/api/providers/' + encodeURIComponent(id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled: checked })
  })
  const d = await r.json()
  if (!d.success) toast(d.message || '\u64CD\u4F5C\u5931\u8D25', 'error')
}

function toggleKeyVis(id) {
  const el = document.getElementById('kv-' + id)
  const full = el.dataset.full
  const vis = el.dataset.vis === '1'
  if (vis) {
    el.textContent = full.length > 12
      ? full.substring(0, 8) + '*****' + full.substring(full.length - 4)
      : full
    el.dataset.vis = '0'
  } else {
    el.textContent = full
    el.dataset.vis = '1'
  }
}

async function toggleProxyKey(id, checked) {
  const r = await fetch('/admin/api/proxy-keys/' + encodeURIComponent(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled: checked })
  })
  const d = await r.json()
  if (d.success) {
    const ki = document.querySelector('.ki[data-id="' + id + '"]')
    if (ki) {
      const b = ki.querySelector('.fc .bd')
      if (b) { b.textContent = checked ? '\u5DF2\u542F\u7528' : '\u5DF2\u7981\u7528'; b.className = 'bd ' + (checked ? 'bd-on' : 'bd-off') }
    }
  } else toast(d.message || '\u64CD\u4F5C\u5931\u8D25', 'error')
}

// \u4E2D\u6587\u8BF4\u660E\uFF1A\u6839\u636E\u70B9\u51FB\u548C URL \u951A\u70B9\u540C\u6B65\u4FA7\u680F\u9009\u4E2D\u6001\uFF0C\u907F\u514D\u5BFC\u822A\u59CB\u7EC8\u505C\u7559\u5728\u201C\u6982\u89C8\u201D\u3002
const adminNavLinks = Array.from(document.querySelectorAll('.admin-nav a[href^="#"]'))
function setActiveAdminNav(hash) {
  const targetHash = adminNavLinks.some(function (link) { return link.getAttribute('href') === hash }) ? hash : '#overview'
  adminNavLinks.forEach(function (link) {
    const active = link.getAttribute('href') === targetHash
    link.classList.toggle('is-active', active)
    if (active) link.setAttribute('aria-current', 'page')
    else link.removeAttribute('aria-current')
  })
}
adminNavLinks.forEach(function (link) {
  link.addEventListener('click', function () { setActiveAdminNav(link.getAttribute('href') || '#overview') })
})
window.addEventListener('hashchange', function () { setActiveAdminNav(location.hash) })
setActiveAdminNav(location.hash)
<\/script>
</body></html>`);
  }
  var app = new Hono2();
  app.use("*", cors());
  app.use("*", logger());
  var seeded = false;
  app.use("*", async (c, next) => {
    if (!seeded) {
      await seedInitialData(c.env);
      seeded = true;
    }
    return next();
  });
  app.get("/", async (c) => {
    const { getCookie: getCookie2 } = await Promise.resolve().then(() => (init_cookie2(), cookie_exports));
    const sessionId = getCookie2(c, "session_id");
    let isLoggedIn = false;
    if (sessionId) {
      const session = await getSession(c.env, sessionId);
      isLoggedIn = session !== null;
    }
    return renderHomePage(c, isLoggedIn);
  });
  app.get("/admin/login", async (c) => renderLoginPage(c));
  app.post("/admin/login", handleLogin);
  app.get("/admin/logout", handleLogout);
  app.use("/admin/*", adminAuthMiddleware);
  app.get("/admin", async (c) => renderAdminPage(c));
  app.get("/admin/api/status", handleStatus);
  app.get("/admin/api/providers", handleGetProviders);
  app.post("/admin/api/providers", handleCreateProvider);
  app.put("/admin/api/providers/:id", handleUpdateProvider);
  app.delete("/admin/api/providers/:id", handleDeleteProvider);
  app.post("/admin/api/providers/:id/test-model", handleTestModel);
  app.post("/admin/api/test-key", handleTestKeyNew);
  app.post("/admin/api/test-model", handleTestModelNew);
  app.get("/admin/api/proxy-keys", handleGetProxyKeys);
  app.post("/admin/api/proxy-keys", handleCreateProxyKey);
  app.delete("/admin/api/proxy-keys/:id", handleDeleteProxyKey);
  app.patch("/admin/api/proxy-keys/:id", handleUpdateProxyKey);
  app.use("/v1/*", proxyKeyAuthMiddleware);
  app.get("/v1/models", handleModels);
  app.all("/v1/*", handleProxy);
  app.notFound((c) => {
    return c.json({ error: { message: "\u63A5\u53E3\u4E0D\u5B58\u5728", type: "not_found" } }, 404);
  });
  app.onError((err, c) => {
    console.error("\u672A\u6355\u83B7\u7684\u9519\u8BEF:", err);
    return c.json({ error: { message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF", type: "server_error" } }, 500);
  });
  var src_default = app;

  // functions/[[default]].ts
  function createMemoryKv() {
    const store2 = /* @__PURE__ */ new Map();
    return {
      async get(key) {
        return store2.has(key) ? store2.get(key) : null;
      },
      async put(key, value) {
        store2.set(key, value);
      },
      async delete(key) {
        store2.delete(key);
      },
      async list() {
        return { keys: [...store2.keys()].map((k) => ({ key: k })), complete: true };
      }
    };
  }
  function makeKvCompatible(kv) {
    if (!kv)
      return kv;
    if (kv.__eoPatched)
      return kv;
    const patched = {
      ...kv,
      put(key, value, options) {
        return kv.put(key, value);
      },
      get(key, options) {
        try {
          return kv.get(key, options);
        } catch (e) {
          return kv.get(key);
        }
      },
      delete(key) {
        return kv.delete(key);
      },
      list(config) {
        return kv.list(config);
      }
    };
    Object.defineProperty(patched, "__eoPatched", { value: true, enumerable: false });
    return patched;
  }
  function resolveKv(env) {
    const realKv = env.KV || env.STORE || env.KV_STORAGE;
    if (realKv) {
      return makeKvCompatible(realKv);
    }
    try {
      console.warn("[ai-gateway] Using Pages Blob as storage backend.");
      return createBlobKv();
    } catch (e) {
      console.warn("[ai-gateway] Blob unavailable, falling back to in-memory:", e?.message || e);
    }
    return createMemoryKv();
  }
  function onRequest(context) {
    const env = context.env || {};
    env.KV = resolveKv(env);
    try {
      return src_default.fetch(context.request, env);
    } catch (err) {
      console.error("[ai-gateway] unhandled error:", err);
      return new Response(
        JSON.stringify({ error: { message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF: " + String(err?.message || err), type: "server_error" } }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }
  }

        pagesFunctionResponse = onRequest;
      })();
          }
        
        };
      

          let middlewareResponseHeaders = null;

          // 走到这里说明：
          // 1. 没有中间件响应（middlewareResponse 为 null/undefined）
          // 2. 或者中间件返回了 next
          // 需要判断是否命中边缘函数

          runEdgeFunctions();

          // 动态路由命中时，检查该路径的 runtime 是否为 edge
          // 如果不是 edge（如 node/file），则跳出边缘函数，走回源逻辑
          if (matchedFunc && routeParams.mode > 0 && hookCtx && hookCtx.getPathRuntime) {
            try {
              const pathRuntime = await hookCtx.getPathRuntime(urlInfo.pathname);
              if (pathRuntime && pathRuntime !== 'edge') {
                matchedFunc = false;
              }
            } catch(e) {
              // getPathRuntime 调用失败时不阻断，继续执行边缘函数
            }
          }

          //没有命中边缘函数，执行回源
          if (!matchedFunc) {
            const originResponse = await fetch(request);

            // 如果中间件设置了响应头，合并到回源响应中
            if (middlewareResponseHeaders) {
              const mergedHeaders = new Headers(originResponse.headers);
              // 删除可能导致问题的编码相关头
              mergedHeaders.delete('content-encoding');
              mergedHeaders.delete('content-length');
              middlewareResponseHeaders.forEach((value, key) => {
                if (key.toLowerCase() === 'set-cookie') {
                  mergedHeaders.append(key, value);
                } else {
                  mergedHeaders.set(key, value);
                }
              });
              return new Response(originResponse.body, {
                status: originResponse.status,
                statusText: originResponse.statusText,
                headers: mergedHeaders,
              });
            }

            return originResponse;
          }

          // 命中了边缘函数，继续执行边缘函数逻辑

          const params = {};
          if (routeParams.id) {
            if (routeParams.mode === 1) {
              const value = urlInfo.pathname.match(routeParams.left);
              for (let i = 1; i < value.length; i++) {
                params[routeParams.id[i - 1]] = value[i];
              }
            } else {
              const value = urlInfo.pathname.replace(routeParams.left, '');
              const splitedValue = value.split('/');
              if (splitedValue.length === 1) {
                params[routeParams.id] = splitedValue[0];
              } else {
                params[routeParams.id] = splitedValue;
              }
            }

          }
          const edgeFunctionResponse = await pagesFunctionResponse({request, params, env: {"EDGEONE_PAGES_API_REGION":"global"}, waitUntil, eo });

          // 如果中间件设置了响应头，合并到边缘函数响应中
          if (middlewareResponseHeaders && edgeFunctionResponse) {
            const mergedHeaders = new Headers(edgeFunctionResponse.headers);
            // 删除可能导致问题的编码相关头
            mergedHeaders.delete('content-encoding');
            mergedHeaders.delete('content-length');
            middlewareResponseHeaders.forEach((value, key) => {
              if (key.toLowerCase() === 'set-cookie') {
                mergedHeaders.append(key, value);
              } else {
                mergedHeaders.set(key, value);
              }
            });
            return new Response(edgeFunctionResponse.body, {
              status: edgeFunctionResponse.status,
              statusText: edgeFunctionResponse.statusText,
              headers: mergedHeaders,
            });
          }

          return edgeFunctionResponse;
        })({request: ev.request, params: {}, env: {"EDGEONE_PAGES_API_REGION":"global"}, waitUntil: ev.waitUntil.bind(ev) });
        // ↑ 用户原始代码结束
      }

      addEventListener('fetch', (event, hookCtx) => {
        const res = usercode(event, hookCtx);
        event.respondWith(res);
      });