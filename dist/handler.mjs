// src/handler.ts
import entrypoint from "__SERVER_ENTRY__";
import indexTemplate from "__INDEX_TEMPLATE__?raw";
import staticPaths from "@static-manifest";
import { InMemoryCache } from "@shopify/hydrogen/cache/in-memory";
var handleRequest = entrypoint;
var memoryCache = new InMemoryCache();
globalThis.Oxygen || (globalThis.Oxygen = {});
globalThis.Oxygen.env = Deno.env.toObject();
var handler = async (request, context) => {
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/assets/") || staticPaths.has(pathname)) {
    return;
  }
  const cache = "caches" in globalThis ? await caches.open("hydrogen") : memoryCache;
  request.headers.set("x-forwarded-for", context.ip);
  try {
    return await handleRequest(request, {
      indexTemplate,
      context,
      cache
    });
  } catch (error) {
    return new Response(error.message || error.toString(), { status: 500 });
  }
};
var handler_default = handler;
export {
  handler_default as default
};
