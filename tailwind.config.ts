import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgWhite: "var(--bg-white)",
        foreground: "var(--foreground)",
        navbarColor: "var(--navbar-color)",
        lightGray: "var(--light-gray)",
        darkPrimary: "var(--dark-primary)",
        darkBlue: "var(--dark-blue)",
      },
      fontFamily: {
        clash: ["Clash Display", "sans-serif"],
        clash2: ["Clash Display 2", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      screens: {
        xs: { max : '639px'},
        xxs: { max : '534px'},
    },

    },
  },
  plugins: [],
};
export default config;
