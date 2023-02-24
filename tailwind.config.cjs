const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backdrop: colors.gray["900"],
        muted: colors.gray["500"],
        primary: colors.red["500"],
        gray: {
          DEFAULT: colors.gray["400"],
          ...colors.gray,
        },
      },
      borderColor: {
        DEFAULT: colors.gray["600"],
      },
      transitionDuration: {
        DEFAULT: "250ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
    },
  },
  plugins: [],
};
