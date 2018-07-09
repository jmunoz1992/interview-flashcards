/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Flashcard = db.model('flashcard')

describe('Flashcard model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let flashcard

      beforeEach(async () => {
        flashcard = await Flashcard.create({
          question: 'What is closure?',
          answer: 'A closure is the combination of a function and the lexical environment within which that function was declared. ',
          type: 'frontend'
        })
      })

      it('returns the correct question', () => {
        expect(flashcard.question).to.be.equal('What is closure?');
      })

      it('returns the correct password', () => {
        expect(flashcard.answer).to.be.equal('A closure is the combination of a function and the lexical environment within which that function was declared. ');
      })

      it('returns the correct type', () => {
        expect(flashcard.type).to.be.equal('frontend');
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
