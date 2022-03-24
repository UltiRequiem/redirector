import { buildSite } from "../../mod.ts";

import { Command, error } from "./cli_deps.ts";

import { validHttpURL } from "../utils.ts";

const { args, options } = await new Command()
  .name("redirector")
  .version("0.1.0")
  .description("Create your own redirector service 🚀")
  .arguments("<...urls>")
  .option("-t, --time <number>", "Time to live make the user wait.", {
    default: 3000,
  })
  .option("-ti,--tittle <string>", "The title of the redirector.", {
    default: "Redirecting...",
  })
  .option("-f, --file <file>", "File to save the build to.", {
    default: "bundle.html",
  })
  .parse(Deno.args);

const [urls] = args;

for (const url of urls) {
  if (!validHttpURL(url)) {
    error(`"${url}" is not a valid URL!`);
  }
}

for (const url of urls) {
  console.log(`Building redirector for ${url}`);
  const site = buildSite(url, options);
  await Deno.writeTextFile(options.file, site);
}
