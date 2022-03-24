export { Command } from "https://deno.land/x/cliffy@v0.22.2/command/mod.ts";

import { colors } from "https://deno.land/x/cliffy/ansi/mod.ts";

const warn = colors.bold.yellow;
const info = colors.bold.blue;

export { warn, info };

export const error = (message: string) => {
  console.error(colors.bold.red("[ERROR]"), message);
  Deno.exit(1);
};
