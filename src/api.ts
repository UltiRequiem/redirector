import { serve } from "./api_deps.ts";
import { buildSite } from "./mod.ts";

const port = 8080;

const handler = (request: Request): Response => {
  const requestURL = new URL(request.url);

  if (requestURL.pathname !== "/" && requestURL.pathname !== "/favicon.ico") {
    let url = requestURL.pathname.substring(1);

    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    const time = requestURL.searchParams.get("time");
    const title = requestURL.searchParams.get("title");

    const config = {
      url,
      title: title ?? undefined,
      time: time ? Number.parseInt(time) : undefined,
    };

    return new Response(buildSite(config), {
      status: 200,
      headers: { "content-type": "text/html" },
    });
  }

  return new Response("Hey");
};

await serve(handler, { port });
