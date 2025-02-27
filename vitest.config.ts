import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Utilise jsdom comme environnement de test
  },
});
