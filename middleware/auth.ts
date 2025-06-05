export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login') return
  const { data } = await useFetch('/api/auth/me', {
    headers: useRequestHeaders(['cookie'])
  })
  if (!data.value) {
    return navigateTo('/login')
  }
})
