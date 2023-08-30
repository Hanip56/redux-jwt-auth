/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redPin: "#e41d26",
        blueFb: "#4172b8",
      },
    },
  },
  plugins: [],
};
