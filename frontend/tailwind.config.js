/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'sidbar': 'minmax(170px, 1fr) minmax(250px, 4fr)',
      },
      gridTemplateRows:{
        'topbar': '1fr 8fr',
      },
      outlineWidth: {
        player: 'w-12 h-12 bg-green-600 rounded-full z-10',
      }
    },
  },
  plugins: [],
};
