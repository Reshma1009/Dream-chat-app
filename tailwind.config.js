/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#680A83",
        secondary: "#FFA977",
        heading:"#262626"
      },
      fontFamily: {
        pophins: "Poppins, sans-serif",
      },
    },
  },
  plugins: [],
};
