/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-circularSp)'],
      },
      boxShadow: {
        base: '0 8px 24px rgba(0,0,0,.5)',
      },
      colors: {
        desc: 'hsla(0,0%,100%,.7)',
      },
      gridTemplateColumns: {
        'list-2': 'minmax(200px, 4fr) 50px !important',
        'list-3': '[index] 16px [first] 6fr [last] minmax(120px,1fr)',
        'list-4':
          '[index] 16px [first] 4fr [var1] 2fr [last] minmax(120px,1fr)',
        'list-5':
          '[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr)',
        'search-2': 'minmax(200px, 4fr) 50px !important',
        'album-3': '16px minmax(300px, 4fr) 50px !important',
      },
    },
  },
  plugins: [],
}
