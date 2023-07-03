/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    maxWidth: {
      container: "1520px",
      contentContainer: "1280px",
    },
    extend: {
      // backgroundImage: {
      //   mainBackground: "url('/images/background.png')",
      // },
      colors: {
        lightskyblue: "#a2d2ff",
        lightblue: "#bde0fe",
        aliceblue: "#ecf3f9",
        gainsboro: "#d9d9d9",
        lightpink: "#ffafcc",
      },
      borderRadius: {
        "7xl": "26px",
        "23xl": "42px",
        "41xl": "60px",
        "39xl": "58px",
        "31xl": "50px",
        "56xl": "75px",
      },
    },
    fontFamily: {
      antic: "Antic",
      inter: "Inter",
      "im-fell-double-pica-sc": "'IM FELL Double Pica SC'",
    },
    fontSize: {
      xs: "12px",
      "xl" : "20px",
      "7xl": "22px",
      lg: "18px",
      base: "16px",
      "8xl": "26px",
      "45xl": "36px",
      "3xs": "10px",
    },
  },
  plugins: [],
}
