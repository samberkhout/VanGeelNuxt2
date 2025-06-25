export default defineNuxtConfig({
  css: ['@/assets/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    configPath: 'tailwind.config.js'
  },
  app: {
    head: {
      title: 'BBQ Garage',
      meta: [
        { name: 'description', content: 'Industriële BBQ catering en verhuur van licht en geluid' }
      ]
    }
  }
})
