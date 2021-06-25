import apiClient from './apiClient'

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''
const USER_URL = '/user'

function getOptions (body) {
  return {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

async function login (email, password) {
  const options = getOptions({ email, password })
  const response = await apiClient(`${BASE_URL}${USER_URL}/login`, {
    ...options,
    method: 'POST'
  })
  return response.json()
}

async function register (email, password) {
  const options = getOptions({ email, password })
  const response = await apiClient(`${BASE_URL}${USER_URL}/register`, {
    ...options,
    method: 'POST'
  })
  return response.json()
}

async function deleteUser (email, password) {
  const options = getOptions({ email, password })
  const response = await apiClient(`${BASE_URL}${USER_URL}/delete`, {
    ...options,
    method: 'DELETE'
  })
  return response.json()
}

async function changePassword (email, password, newPassword) {
  const options = getOptions({ email, password, newPassword })
  const response = await apiClient(`${BASE_URL}${USER_URL}/changePassword`, {
    ...options,
    method: 'PUT'
  })
  return response.json()
}

export default {
  login,
  register,
  deleteUser,
  changePassword
}
