/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Pack = db.model('pack')
const agent = require('supertest')(app);

describe('Packs routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/packs/', () => {
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
  })

  describe('Pack POST routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })

      it('POST /api/packs', async () => {
        const response = await agent.post('/api/packs')
        .send({
          name: 'Test',
        })
        .expect(201);
        const createdPack = await Pack.findById(response.body.id);
        expect(createdPack.name).to.be.equal('Test');
        })
    })
  })

  describe('Pack PUT routes', () => {
    let pack;

    beforeEach(() => {
      return Pack.create({
        name: 'TestPack',
      })
        .then((createdPack) => {
        pack = createdPack;
      });
    })
    it('PUT /api/packs/:id', async () => {
        return agent.put(`/api/packs/${pack.id}`)
        .send({
          name: 'UpdatedPack',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.id).to.not.be.an('undefined');
          expect(res.body.name).to.equal('UpdatedPack');
        });
    })
  })

  describe('pack DELETE routes', () => {
    let pack;

    beforeEach(() => {
      return Pack.create({
        name: 'AnotherPack',
      })
        .then((createdPack) => {
        pack = createdPack;
      });
    })

    it('DELETE /api/flashcards/:id', () => {
      return agent
       .delete(`/api/flashcards/${pack.id}`)
        .expect(204)
    });
  });
