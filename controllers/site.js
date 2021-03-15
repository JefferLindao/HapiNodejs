'use strict'

const question = require('../models/index').questions

function register(req, h) {
  if (req.state.user) {
    return h.redirect('/')
  }
  return h.view('register', {
    title: 'Registro',
    user: req.state.user
  })
}

function login(req, h) {
  if (req.state.user) {
    return h.redirect('/')
  }
  return h.view('login', {
    title: 'Ingreso',
    user: req.state.user
  })
}

function ask(req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }
  return h.view('ask', {
    title: 'Crear pregunta',
    user: req.state.user
  })
}

async function home(req, h) {
  let data
  try {
    data = await question.getLast(10)
  } catch (error) {
    console.error(error)
  }
  return h.view('index', {
    title: 'home',
    user: req.state.user,
    questions: data
  })
}

function notFound(req, h) {
  return h.view('404', {}, { layout: 'error-layout' }).code(404)
}

function fileNotFound(req, h) {
  const response = req.response
  if (response.isBoom && response.output.statusCode === 404) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404)
  }
  return h.continue
}

module.exports = {
  register: register,
  login: login,
  ask: ask,
  fileNotFound: fileNotFound,
  notFound: notFound,
  home: home
}
