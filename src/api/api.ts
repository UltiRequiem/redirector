import { serve } from "./api_deps.ts";

import type { Handler } from "./api_deps.ts";

import { buildSite } from "../../mod.ts";

const port = 8080;

const handler: Handler = (request) => {
  const requestURL = new URL(request.url);

  if (requestURL.pathname !== "/" && requestURL.pathname !== "/favicon.ico") {
    let url = requestURL.pathname.substring(1);

    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    const time = requestURL.searchParams.get("time");

    const config = {
      title: requestURL.searchParams.get("title"),
      time: time ? Number.parseInt(time) : undefined,
    };

    return new Response(buildSite(url, config), {
      status: 200,
      headers: { "content-type": "text/html" },
    });
  }

  return new Response("Hey");
};

await serve(handler, { port });
