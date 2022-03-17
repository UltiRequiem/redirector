import { serve } from "https://deno.land/std@0.130.0/http/server.ts";

import { buildSite } from "./utils.ts";

const port = 8080;

const handler = (request: Request): Response => {
  const url = new URL(request.url);

  if (url.pathname !== "/") {
    const site = url.pathname.substring(1);

    return new Response(buildSite(site), {
      status: 200,
      headers: { "content-type": "text/html" },
    });
  }

  return new Response("Hey");
};

await serve(handler, { port });
