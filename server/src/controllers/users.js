import jwt from 'jsonwebtoken'
import userModel from '../models/users'
import { validatePassword } from '../utils/validation'

async function create (request, response, next) {
  try {
    const { body: { name, email, password } } = request
    const user = { name, email, password }
    await userModel.create(user)
    response.json({
      status: 'success',
      message: `User ${email} has been created.`
    })
  } catch (error) {
    next(error)
    console.log(error)
  }
}

async function login (request, response, next) {
  try {
    const { body: { email, password } } = request
    const user = await userModel.findOne({ email })

    if (!user) {
      response.json({
        status: 'error',
        message: 'Invalid email/password.'
      })
      return
    }

    const passwordMismatchError = validatePassword(password, user.password)
    if (passwordMismatchError) {
      response.json(passwordMismatchError)
      return
    }

    const secretKey = request.app.get('secretKey')
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' })

    response.json({
      status: 'success',
      message: 'Login successful.',
      data: { token }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function changePassword (request, response, next) {
  try {
    const { body: { email, password, newPassword } } = request
    const user = await userModel.findOneAndUpdate({ email }, { password: newPassword }, { new: true })
    if (!user) {
      response.json({
        status: 'error',
        message: 'User not found'
      })
      return
    }

    const passwordMismatchError = validatePassword(password, user.password)
    if (passwordMismatchError) {
      response.json(passwordMismatchError)
      return
    }

    await user.save()
    response.json({
      status: 'success',
      message: 'Password change successful.'
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function deleteUser (request, response, next) {
  try {
    const { body: { email, password } } = request
    const user = await userModel.findOne({ email })
    if (!user) {
      response.json({
        status: 'error',
        message: 'User not found'
      })
      return
    }

    const passwordMismatchError = validatePassword(password, user.password)
    if (passwordMismatchError) {
      response.json(passwordMismatchError)
      return
    }

    await user.remove()
    response.json({
      status: 'success',
      message: `User ${email} has been deleted.`
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function list (_, response, next) {
  try {
    const users = await userModel.find({})
    const usersNames = users.map(({ name }) => name)
    response.json({
      status: 'success',
      message: 'User name list has been acquired.',
      data: { list: usersNames }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default {
  create,
  login,
  changePassword,
  deleteUser,
  list
}
