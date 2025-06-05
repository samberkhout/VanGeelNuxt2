export default defineEventHandler((event) => {
  const cookie = useCookie(event, 'userId', { httpOnly: true, path: '/' })
  cookie.value = null
  return { success: true }
})
