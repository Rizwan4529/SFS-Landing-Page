import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

function injectGoogleAnalytics(gaId: string | undefined) {
  if (!gaId) return null;

  const snippet = `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { send_page_view: false });
    </script>`;

  return {
    name: "inject-google-analytics",
    transformIndexHtml(html: string) {
      return html.replace("<head>", `<head>\n    ${snippet}`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const gaId = env.VITE_GA_MEASUREMENT_ID;

  return {
    plugins: [
      injectGoogleAnalytics(gaId),
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
    ].filter(Boolean),
  };
});
