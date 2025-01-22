// @ts-check
import angular from "@analogjs/astro-angular";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      SUPABASE_SERVER_URL: envField.string({
        context: "server",
        access: "public",
      }),
      SUPABASE_SERVER_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      SUPABASE_CLIENT_URL: envField.string({
        context: "client",
        access: "public",
      }),
      SUPABASE_CLIENT_KEY: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [tailwind(), angular(), react(), svelte(), vue()],
});
