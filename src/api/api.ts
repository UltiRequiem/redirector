import { serve } from "./api_deps.ts";
import { html } from "../../mod_deps.ts";

import type { Handler } from "./api_deps.ts";

import { buildSite } from "../../mod.ts";

const port = 8080;

const handler: Handler = (request) => {
  const requestURL = new URL(request.url);

  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "text/html",
  });

  if (requestURL.pathname === "/favicon.ico") {
    return new Response("", {
      status: 404,
      headers,
    });
  }

  const page = requestURL.searchParams.get("page");

  if (requestURL.pathname === "/" && page) {
    let url = requestURL.searchParams.get("page") ?? "";

    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    const time = requestURL.searchParams.get("time");

    const config = {
      title: requestURL.searchParams.get("title"),
      time: time ? Number.parseInt(time) : undefined,
    };

    return new Response(buildSite(url, config), { headers });
  }

  console.log("not pass");

  return new Response(
    html`
    <head>
      <meta charset="utf-8" />
      <title>Create your redirector</title>
    </head>
    <style>body {font-family: Helvetica, serif;margin: 30px;}</style>
    <p>GET /?page=YOUR_PAGE_SITE</p>
    <p>
      <form action="/">
        <input type="text" name="page" placeholder="ultirequiem.com" />
        <button type="submit">Go!</button>
      </form>
    </p>

   <p>made by <a href="https://github.com/ultirequiem">@ultirequiem</a> · <a href="https://github.com/ultirequiem/redirector">source code</a></p>
  `,
    { headers }
  );
};

await serve(handler, { port });
