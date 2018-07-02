/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Flashcard = db.model('flashcard')

describe('Flashcard routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/flashcards/', () => {
    beforeEach(() => {
      return Flashcard.create({
        question: 'What is the difference between .call and .apply?',
        answer: 'Both .call and .apply are used to invoke functions and the first parameter will be used as the value of this within the function. However, .call takes in comma-separated arguments as the next arguments while .apply takes in an array of arguments as the next argument. An easy way to remember this is C for call and comma-separated and A for apply and an array of arguments.'
      })
    })

    it('GET /api/flashcards', async () => {
      const res = await request(app)
        .get('/api/flashcards')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].question).to.be.equal('What is the difference between .call and .apply?')
      expect(res.body[0].answer).to.be.equal('Both .call and .apply are used to invoke functions and the first parameter will be used as the value of this within the function. However, .call takes in comma-separated arguments as the next arguments while .apply takes in an array of arguments as the next argument. An easy way to remember this is C for call and comma-separated and A for apply and an array of arguments.')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
