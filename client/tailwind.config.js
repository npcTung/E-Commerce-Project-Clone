/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        main: "1220px",
      },
      colors: {
        main: "#ee3131",
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
