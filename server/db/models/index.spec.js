/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Flashcard = db.model('flashcard');
const Pack = db.model('pack')
const Promise = require('bluebird')

describe('Flashcard and Pack Association', () => {

  it("each flashcard belongs to a pack, and a pack has many flashcards", () => {

    let creatingFlashcard = Flashcard.create({
      question: 'What is question?',
      answer: 'A closure is the combination of a function and the lexical environment within which that function was declared. ',
      type: 'frontend'
    });
    let creatingPack = Pack.create({
      name: 'frontend',
    });

    return Promise.all([creatingFlashcard, creatingPack])
    .spread((flashcard, pack) => {
      // this method `setAuthor` method automatically exists if you set up the association correctly
      return flashcard.setPack(pack);
    })
    .then(() => {
      return Flashcard.findOne({
        where: { question: 'What is question?' },
        include: { model: Pack }
      });
    })
    .then((foundFlashcard) => {
      expect(foundFlashcard.question).to.exist; // eslint-disable-line no-unused-expressions
      expect(foundFlashcard.question).to.equal('What is question?');
    });

  });
}) // end describe('User model')
