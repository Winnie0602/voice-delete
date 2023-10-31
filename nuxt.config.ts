// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-auth'],

  runtimeConfig: {
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    public: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    },
  },
})
