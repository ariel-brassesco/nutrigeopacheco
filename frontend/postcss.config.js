module.exports = {
  plugins: [
    "tailwindcss",
    "postcss-simple-vars",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        stage: 1,
        autoprefixer: {
          flexbox: "no-2009",
        },
      },
    ],
  ],
};
