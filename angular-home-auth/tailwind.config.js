/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
    './node_modules/preline/preline.js',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('flowbite/plugin'),
    require("daisyui"),
  ],
  daisyui: {
    prefix: "daisy-",
  },
}
