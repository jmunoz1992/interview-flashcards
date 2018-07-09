/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Pack = db.model('pack')

describe('Flashcard routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/flashcards/', () => {
    beforeEach(() => {
      return Pack.create({
        name: 'frontend',
      })
    })

    it('GET /api/packs', async () => {
      const res = await request(app)
        .get('/api/packs')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('frontend')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
