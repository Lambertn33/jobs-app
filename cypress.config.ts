import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  env: { ...process.env },
  e2e: {
    baseUrl: "http://localhost:5173/",
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
