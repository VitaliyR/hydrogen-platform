var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_vite_plugin_netlify_edge = __toESM(require("@netlify/vite-plugin-netlify-edge"));
var import_vite = require("vite");
var import_path = __toESM(require("path"));
var import_magic_string = __toESM(require("magic-string"));
var HYDROGEN_DEFAULT_SERVER_ENTRY = "/src/App.server";
var plugin = () => {
  let resolvedConfig;
  const platformEntrypoint = require.resolve("@netlify/hydrogen-platform/handler");
  return [
    (0, import_vite_plugin_netlify_edge.default)(),
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
        if ((0, import_vite.normalizePath)(id) === platformEntrypoint) {
          code = code.replace("__SERVER_ENTRY__", process.env.HYDROGEN_SERVER_ENTRY || HYDROGEN_DEFAULT_SERVER_ENTRY).replace("__INDEX_TEMPLATE__", process.env.HYDROGEN_INDEX_TEMPLATE || (0, import_vite.normalizePath)(import_path.default.resolve(resolvedConfig.root, "dist", "client", "index.html")));
          const ms = new import_magic_string.default(code);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
