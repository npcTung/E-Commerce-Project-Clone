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
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(40px);",
            transform: "translateY(40px);",
          },
          "100%": {
            "-webkit-transform": "translateY(-10px);",
            transform: "translateY(-10px);",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
      fontWeight: {
        600: "600",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
        10: "10 10 0%",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
