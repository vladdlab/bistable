import type { RegisterUserInput, LoginUserInput } from '~~/schemas/user.schema'

export const useAuth = () => {
  const isAuth = useCookie('logged_in');

  const login = async (credentials: LoginUserInput) => {
    return await useFetch('/api/auth/login', { method: 'POST', body: credentials });
  }

  const register = async (credentials: RegisterUserInput) => {
    return await useFetch('/api/auth/register', { method: 'POST', body: credentials });
  }

  const logout = async () => {
    return await useFetch('/api/auth/logout', { method: 'POST' });
  }

  return { isAuth, login, register, logout }
}
