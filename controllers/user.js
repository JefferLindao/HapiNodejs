'use strict'
const users = require('../models/index').users
const boom = require('boom')

async function createUser(req, h) {
  let result
  try {
    result = await users.create(req.payload)
  } catch (error) {
    console.error(error)
    return h.view('register', {
      title: 'Registro',
      error: 'Problemas creando el usuario'
    })
  }
  return h.view('register', {
    title: 'Registro',
    success: `  Usuario creado ID: ${result}`
  })
}

async function validateUser(req, h) {
  let result
  try {
    result = await users.validateUser(req.payload)
    if (!result) {
      return h.view('login', {
        title: 'Login',
        error: 'Email y/o contraseña incorrecta'
      })
    }
  } catch (error) {
    console.error(error)
    return h.view('login', {
      title: 'Login',
      error: 'Problemas validando usuario'
    })
  }
  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email
  })
}

function logout(req, h) {
  return h.redirect('/login').unstate('user')
}

function failValidation(req, h, err) {
  return boom.badRequest('Fallo la validación', req.payload)
}

module.exports = {
  createUser: createUser,
  logout: logout,
  validateUser: validateUser,
  failValidation: failValidation
}
