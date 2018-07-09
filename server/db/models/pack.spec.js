/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Pack = db.model('pack')

describe('Pack model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let pack

      beforeEach(async () => {
        pack = await Pack.create({
          name: 'frontend',
        })
      })

      it('returns the correct name for the pack', () => {
        expect(pack.name).to.be.equal('frontend');
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
