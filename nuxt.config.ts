// https://nuxt.com/docs/api/configuration/nuxt-config
const useNetlifyPreset = process.env.NITRO_PRESET === 'netlify' || process.env.NETLIFY === 'true'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  devtools: { enabled: true },

  nitro: {
    ...(useNetlifyPreset ? { preset: 'netlify' as const } : {}),
  },

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  css: ['~/assets/scss/main.scss'],

  app: {
    head: {
      title: 'SHOPPE — Jewelry',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Allerta+Stencil&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap',
        },
      ],
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/scss/variables" as vars; @use "~/assets/scss/mixins" as mixins;',
        },
      },
    },
  },
})
