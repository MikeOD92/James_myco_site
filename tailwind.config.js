module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lens-white": "#fcfdeb",
        "lens-green": "#e5dcb7",
        mushroom: "#7b7864",
        lightmushroom: "#cacabc",
        bruise: "#af9ab1",
        darkbruise: "#8C7090",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
