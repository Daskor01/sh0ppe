export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    if (import.meta.dev) {
      console.error('[vue:error]', info, error, instance?.$?.type?.name ?? instance)
    }
  })
})
