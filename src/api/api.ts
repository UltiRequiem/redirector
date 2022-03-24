import { serve } from "./api_deps.ts";
import { html } from "../../mod_deps.ts";

import makeloc from "https://deno.land/x/dirname@1.1.2/mod.ts";

const { __dirname } = makeloc(import.meta);

import type { Handler } from "./api_deps.ts";

import { buildSite } from "../../mod.ts";

const favicon = await Deno.readFile(`${__dirname}/favicon.jpg`);

const handler: Handler = (request) => {
  const requestURL = new URL(request.url);

  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "text/html",
  });

  if (requestURL.pathname === "/favicon.jpg") {
    const head = new Headers();

    head.set("content-type", "image/jpg");

    return new Response(favicon, {
      headers: head,
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

  return new Response(
    html`
    <head>
      <meta charset="utf-8" />
      <link rel="icon" type="image/jpg" href="/favicon.jpg"/>
      <title>Create your redirector</title>
    <style>body {font-family: Helvetica, serif;margin: 30px;}</style>
    </head>
    <p>GET /?page=URL</p>
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

await serve(handler);
