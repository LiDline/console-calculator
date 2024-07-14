import { type Config } from "tailwindcss";
// import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.tsx"],
  daisyui: {
    themes: ["light"],
  },
  plugins: [daisyui],
} satisfies Config;
