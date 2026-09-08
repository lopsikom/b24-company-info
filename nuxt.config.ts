// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  ssr : true,

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@bitrix24/b24jssdk-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  runtimeConfig: {
    public :{
      BaseUri : "http://localhost:3000"
    },
    Token : "",
    DadataPath : "",
    DadataPathBrand : "",
    SecretKey  : ""
  },
  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL ?? '/b24/'
  },
  vite: {
    server: {
      allowedHosts: ['ib.minta365.ru']
    }
  },
})