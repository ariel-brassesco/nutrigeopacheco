const { colors: defaultColors } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const { NODE_ENV } = process.env;

const colorMap = {
  ...defaultColors,
  ...colors,
};

module.exports = {
  purge: {
    enabled: NODE_ENV === "production",
    content: ["./src/**/*.tsx"],
  },
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: ["Poppins", "-apple-system", '"Segoe UI"', "sans-serif"],
    },
    colors: {
      ...colorMap,
      primary: colorMap.blue,
      secondary: colorMap.violet,
      gray: colorMap.blueGray,
    },
  },
  plugins: [],
};
