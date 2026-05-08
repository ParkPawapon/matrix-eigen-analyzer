import type { Config } from "tailwindcss";
import { tailwindTokens } from "./src/core/theme/tailwind-tokens";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: tailwindTokens,
  },
  plugins: [],
};

export default config;
