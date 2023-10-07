/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
