/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mb320: "320px",
        mb580: "580px",
        mb768: "769px",
        mb991: "991px",
        pad1024: "1024px",
        pad1280: "1280px",
        lp1366: "1366px",
        dsk1536: "1536px",
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
