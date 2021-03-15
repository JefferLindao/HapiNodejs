'use strict'
class Questions {
  constructor(db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('questions')
  }

  async create(data, user) {
    data.ower = user
    const question = {
      ...data
    }
    const newQuestion = this.collection.push(question)

    return newQuestion.key
  }
}

module.exports = Questions
