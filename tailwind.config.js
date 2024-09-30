/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {screens: {
        'xs': '480px', // Define un tamaño xs como 480px
      }
    },
  },
  plugins: [],
}

