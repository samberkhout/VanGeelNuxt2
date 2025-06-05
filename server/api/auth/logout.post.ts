export default defineEventHandler((event) => {
  const cookie = useCookie('userId', { httpOnly: true, path: '/' })
  cookie.value = null
  return { success: true }
})
