import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "focus-shadow": "0px 0px 75px -33px #633CFF",
        "bg-shadow":"0px 0px 100px -75px #000;"
      },
      colors: {
        blue100: "#633CFF",
        activeBlue: "#BEADFF",
        mutedBlue: "#EFEBFF",
        dark_grey: "#333333",
        white100: "#FFFFFF",
        white50: "#FAFAFA",
        border: "#D9D9D9",
        grey:"#737373",
        red: "#FF3939",
        grey50:"#EEEEEE",
      },
      backgroundColor:{
        blue100: "#633CFF",
        activeBlue: "#BEADFF",
        mutedBlue: "#EFEBFF",
        dark_grey: "#333333",
        white100: "#FFFFFF",
        lightPurple:"#EFEBFF",
        white50: "#FAFAFA",
        border: "#D9D9D9",
        grey:"#737373",
        grey50:"#EEEEEE",
        red: "#FF3939"
      },
      borderColor:{
        blue100: "#633CFF",
        activeBlue: "#BEADFF",
        mutedBlue: "#EFEBFF",
        grey50:"#EEEEEE",
      }
    },
  },
  plugins: [],
};
export default config;
