const BASE_URL = 'http://localhost:3001/user'

export const userApi = {
  getUser: async () => {
    const response = await fetch(`${BASE_URL}/me`, {
      credentials: 'include',
    })
    if (response.status === 401) {
      return null
    }
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário')
    }
    return response.json()
  },
}