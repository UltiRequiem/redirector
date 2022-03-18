import { html } from "https://deno.land/x/html@v1.2.0/mod.ts";

export interface BuildSiteConfig {
  url: string;
  title?: string;
  time?: number;
}

export function buildSite({
  url,
  time = 500,
  title = "Redirecting...",
}: BuildSiteConfig) {
  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>

        <script type="module" defer>
          const seconds = document.getElementById("seconds");

          let counter = 5;

          setInterval(() => {
            seconds.innerText = counter;

            if (--counter === 0) {
              window.location.assign("${url}");
            }
          }, ${time});
        </script>
      </head>

      <body>
        Redirecting you to "${url}" in <span id="seconds"> 5 </span>
      </body>
    </html>`;
}
