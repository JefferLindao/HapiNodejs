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

  async getLast(amount) {
    const query = await this.collection.limitToLast(amount).once('value')
    const data = query.val()
    return data
  }

  async getOne(id) {
    const query = await this.collection.child(id).once('value')
    const data = query.val()
    return data
  }

  async answer(data, user) {
    const answers = {
      text: data.answer,
      user: user
    }
    const newAnswers = await this.collection.child(data.id).child('answer').push(answers)
    return newAnswers
  }
}

module.exports = Questions
