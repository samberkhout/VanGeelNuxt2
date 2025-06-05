import { deleteCookie } from 'h3'

export default defineEventHandler((event) => {
  deleteCookie(event, 'userId', { path: '/' })
  return { success: true }
})
