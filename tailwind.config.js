/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mb320: { "max": "320px" },
        mb480: { "max": "480px" },
        mb768: { "max": "768px" },
        mb991: { "max": "991px" },
        pad1024: { "max": "1024px" },
        pad1280: { "max": "1280px" },
        lp1366: { "max": "1366px" },
        dsk1536: { "max": "1536px" },
      },
      colors: {
        primary: "#680A83",
        secondary: "#FFA977",
        heading: "#262626",
      },
      fontFamily: {
        pophins: "Poppins, sans-serif",
      },
    },
  },
  plugins: [],
};
