import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export function validateUser (request, response, next) {
  try {
    const tokenHeader = request.headers['x-access-token']
    const secretKey = request.app.get('secretKey')
    const decoded = jwt.verify(tokenHeader, secretKey)
    request.body.userId = decoded.id
    next()
  } catch (error) {
    response.json({
      status: 'error',
      message: error.message
    })
  }
}

export function validatePassword (providedPassword, userPassword) {
  const hasPasswordMatch = bcrypt.compareSync(providedPassword, userPassword)
  if (hasPasswordMatch) {
    return false
  }

  return {
    status: 'error',
    message: 'Invalid email/password.'
  }
}
