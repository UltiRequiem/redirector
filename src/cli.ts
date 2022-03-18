import { buildSite } from "./mod.ts";

import { parse } from "./cli_deps.ts";

const args = parse(Deno.args);

const {
  _: [url],
} = args;

const site = buildSite({ url: url.toString() });

await Deno.writeTextFile("bundle.html", site);
