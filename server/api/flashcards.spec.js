/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Flashcard = db.model('flashcard')
const agent = require('supertest')(app);

describe('Flashcard routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/flashcards/', () => {
    beforeEach(() => {
      return Flashcard.create({
        question: 'What is the difference between .call and .apply?',
        answer: 'Both .call and .apply are used to invoke functions and the first parameter will be used as the value of this within the function. However, .call takes in comma-separated arguments as the next arguments while .apply takes in an array of arguments as the next argument. An easy way to remember this is C for call and comma-separated and A for apply and an array of arguments.',
        type: 'frontend'
      })
    })

    it('GET /api/flashcards', async () => {
      const res = await request(app)
        .get('/api/flashcards')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].question).to.be.equal('What is the difference between .call and .apply?')
      expect(res.body[0].answer).to.be.equal('Both .call and .apply are used to invoke functions and the first parameter will be used as the value of this within the function. However, .call takes in comma-separated arguments as the next arguments while .apply takes in an array of arguments as the next argument. An easy way to remember this is C for call and comma-separated and A for apply and an array of arguments.')
      expect(res.body[0].type).to.be.equal('frontend')
    })

    it('POST /api/flashcards', async () => {
      const response = await agent.post('/api/flashcards')
      .send({
        question: 'What is the store for in redux?',
        answer: "An easier way to manage state",
        type: "redux"
      })
      .expect(201);
    const createdFlashcard = await Flashcard.findById(response.body.id);
    expect(createdFlashcard.question).to.be.equal('What is the store for in redux?');
    expect(createdFlashcard.answer).to.be.equal('An easier way to manage state');
    expect(createdFlashcard.type).to.be.equal('redux');
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
