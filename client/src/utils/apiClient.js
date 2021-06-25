function updateOptions (options) {
  const optionsWithToken = { ...options }
  const token = localStorage.token
  if (token) {
    optionsWithToken.headers = {
      ...optionsWithToken.headers,
      'x-access-token': token
    }
  }
  return optionsWithToken
}

export default function fetcher (url, options) {
  return fetch(url, updateOptions(options))
}
