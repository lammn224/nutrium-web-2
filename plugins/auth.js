import axios from 'axios'

export default function ({ $auth }, inject) {
  axios.interceptors.request.use((request) => {
    const token = $auth.strategy.token.get()
    if (token) {
      request.headers.common.Authorization = `${token}`
    }

    return request
  })

  inject('can', (checkRole) => {
    if (!checkRole) {
      return true
    }

    return checkRole.includes($auth.user.role)
  })
}
