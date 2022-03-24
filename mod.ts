import { html } from "./mod_deps.ts";

export interface BuildSiteConfig {
  title?: string | null;
  time?: number | null;
}

export function buildSite(url: string, config: BuildSiteConfig = {}) {
  const { time = 1000, title = "Redirecting..." } = config;

  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>

        <script type="module" defer>
          const seconds = document.getElementById("seconds");

          let counter = 3;

          setInterval(() => {
            seconds.innerText = counter;

            if (--counter === 0) {
              window.location.assign("${url}");
            }
          }, ${time});
        </script>
      </head>

      <body>
        Redirecting you to "${url}" in <span id="seconds"> 3 </span>
      </body>
    </html>`;
}
