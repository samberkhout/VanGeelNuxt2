export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useFetch('/api/auth/me', {
    headers: useRequestHeaders(['cookie'])
  })
  if (!data.value || data.value.rol !== 'ADMIN') {
    return navigateTo('/login')
  }
})
