/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      screens: {
        "1col": "350px",
        "break-400px": "400px",
        "break-500px": "500px",
        "2col": "900px",
        "3col": "1300px",
      },
      spacing: {
        400: "400px",
      },
      colors: {
        "primary-110": "hsl(49, 65%, 97%)",
        "primary-500": "hsl(45, 80%, 51%)",
        "primary-700": "hsl(0, 0%, 20%)",
        "primary-200": "hsl(0, 0%, 79%)",
      },
    },
  },
  plugins: [],
};
