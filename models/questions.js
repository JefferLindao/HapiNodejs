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

  async setAnswerRigth(questionId, answerId, user) {
    const query = await this.collection.child(questionId).once('value')
    const question = query.val()
    const answers = question.answer
    if (!user.email === question.ower.email) {
      return false
    }
    for (let key in answers) {
      answers[key].correct = (key === answerId)
    }
    const update = await this.collection.child(questionId).child('answer').update(answers)
    return update
  }
}

module.exports = Questions
