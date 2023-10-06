/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-circularSp)"],
      },
      boxShadow: {
        base: "0 8px 24px rgba(0,0,0,.5)",
      },
      colors: {
        desc: "hsla(0,0%,100%,.7)",
      },
    },
  },
  plugins: [],
};
