var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// src/plugin.ts
import netlifyPlugin from "@netlify/vite-plugin-netlify-edge";
import { normalizePath } from "vite";
import path from "path";
import MagicString from "magic-string";
var HYDROGEN_DEFAULT_SERVER_ENTRY = "/src/App.server";
var plugin = () => {
  let resolvedConfig;
  const platformEntrypoint = __require.resolve("@netlify/hydrogen-platform/handler");
  return [
    netlifyPlugin(),
    {
      name: "vite-plugin-netlify-hydrogen",
      config(config) {
        var _a;
        if ((_a = config == null ? void 0 : config.build) == null ? void 0 : _a.ssr) {
          return {
            build: {
              ssr: platformEntrypoint,
              outDir: ".netlify/edge-functions/handler"
            }
          };
        }
      },
      configResolved(config) {
        resolvedConfig = config;
      },
      transform(code, id) {
        if (normalizePath(id) === platformEntrypoint) {
          code = code.replace("__SERVER_ENTRY__", process.env.HYDROGEN_SERVER_ENTRY || HYDROGEN_DEFAULT_SERVER_ENTRY).replace("__INDEX_TEMPLATE__", process.env.HYDROGEN_INDEX_TEMPLATE || normalizePath(path.resolve(resolvedConfig.root, "dist", "client", "index.html")));
          const ms = new MagicString(code);
          return {
            code: ms.toString(),
            map: ms.generateMap({ file: id, source: id })
          };
        }
      }
    }
  ];
};
var plugin_default = plugin;
export {
  plugin_default as default
};
