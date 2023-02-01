export default defineNuxtRouteMiddleware((to) => {
  const loggedIn = useCookie('logged_in');

  if (!loggedIn.value && to.meta.layout !== 'auth') {
    return navigateTo('/auth/login')
  }

  if (loggedIn.value && to.meta.layout === 'auth') {
    return navigateTo('/dashboard')
  }
})
