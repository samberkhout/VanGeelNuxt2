module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        steel: '#43464b',
        'steel-light': '#5a5d63',
        copper: '#b87333',
        'copper-dark': '#995f27',
        dark: '#1c1c1c'
      },
      fontFamily: {
        vintage: ['\"Bebas Neue\"', 'sans-serif']
      }
    }
  },
  darkMode: 'class'
}
