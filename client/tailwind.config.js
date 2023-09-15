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
        overlay90: "rgba(0,0,0,0.9)",
        overlay80: "rgba(0,0,0,0.8)",
        overlay70: "rgba(0,0,0,0.7)",
        overlay60: "rgba(0,0,0,0.6)",
        overlay50: "rgba(0,0,0,0.5)",
        overlay40: "rgba(0,0,0,0.4)",
        overlay30: "rgba(0,0,0,0.3)",
        overlay20: "rgba(0,0,0,0.2)",
        overlay10: "rgba(0,0,0,0.1)",
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
        "scale-in-center": {
          "0%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        "slide-bottom": {
          "0%": {
            "-webkit-transform": "translateY(-50px);",
            transform: "translateY(-50px);",
          },
          " 100%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
          },
        },
        "scale-up-tl": {
          "0%": {
            "-webkit-transform": "scale(0.5);",
            transform: "scale(0.5);",
            "-webkit-transform-origin": "0% 0%;",
            "transform-origin": "0% 0%;",
          },
          "100%": {
            "-webkit-transform": "scale(1);",
            transform: "scale(1);",
            "-webkit-transform-origin": "0% 0%;",
            "transform-origin": "0% 0%;",
          },
        },
        "scale-up-br": {
          "0%": {
            "-webkit-transform": "scale(0.5);",
            transform: "scale(0.5);",
            "-webkit-transform-origin": "100% 100%;",
            "transform-origin": "100% 100%;",
          },
          "100%": {
            "-webkit-transform": "scale(1);",
            transform: "scale(1);",
            "-webkit-transform-origin": "100% 100%;",
            "transform-origin": "100% 100%;",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "scale-in-center":
          "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-bottom":
          "slide-bottom 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "scale-up-tl":
          "scale-up-tl 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
        "scale-up-br":
          "scale-up-br 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
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
      listStyleType: {
        square: "square",
        roman: "upper-roman",
      },
    },
  },
  plugins: [require("daisyui")],
};
