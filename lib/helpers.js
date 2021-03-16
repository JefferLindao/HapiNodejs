'use strict'
const handlebars = require('handlebars')
function registerHelpers() {
  handlebars.registerHelper('answerNumber', (answer) => {
    const keys = Object.keys(answer)
    return keys.length
  })
  handlebars.registerHelper('ifEqual', (a, b, options) => {
    if (a === b) {
      return options.fn(this)
    }
    return options.inverse(this)
  })
  return handlebars
}

module.exports = registerHelpers()
