export default defineNuxtRouteMiddleware((to) => {
  const { isAuth } = useAuth();

  if (!isAuth.value && to.meta.layout !== 'auth') {
    return navigateTo('/auth/login')
  }

  if (isAuth.value && to.meta.layout === 'auth') {
    return navigateTo('/dashboard')
  }
})
