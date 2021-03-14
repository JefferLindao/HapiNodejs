'use strict'

class Questions {
  constructor(db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('questions')
  }

  async create(data, user) {
    data.ower = user
    const question = this.collection.push()
    return question.key
  }
}

module.exports = Questions
