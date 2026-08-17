// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    componentInspector: false
  },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  compatibilityDate: '2024-10-17',
  modules: [ 
    "@nuxtjs/tailwindcss",
    "@nuxt/ui"
  ]
});