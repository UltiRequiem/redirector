import { buildSite } from "../../mod.ts";

import { parse } from "./cli_deps.ts";

const args = parse(Deno.args);

const {
  _: [url, fileOutput = "bundle.html"],
  time,
  title,
} = args;

if (!url) {
  console.error("Please provide a URL!");
  Deno.exit(1);
}

const site = buildSite(url.toString(), { time, title });

await Deno.writeTextFile(fileOutput.toString(), site);
