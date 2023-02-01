/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rainbow-image': "url('~/assets/images/rainbow.svg')",
        'monstera-image': "url('~/assets/images/monstera.svg')",
      }
    },
  },
  plugins: [],
}
