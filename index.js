'use strict'
const Hapi = require('@hapi/hapi')
const handlerbars = require('handlebars')
const inert = require('inert')
const path = require('path')
const visio = require('vision')
const routes = require('./routes')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init() {
  try {
    await server.register(inert)
    await server.register(visio)

    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7,
      isSecure: process.env.NODE_ENV == 'prod',
      encoding: 'base64json'
    })

    server.views({
      engines: {
        hbs: handlerbars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })
    server.route(routes)
    await server.start()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  console.log(`Servidor lanzado en ${server.info.uri}`)
}

init()
