import { html } from "https://deno.land/x/html@v1.2.0/mod.ts";

export interface BuildSiteConfig {
  title?: string | null;
  time?: number | null;
}

export function buildSite(url: string, config: BuildSiteConfig = {}) {
  const { time = 5000, title = "Redirecting..." } = config;

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
