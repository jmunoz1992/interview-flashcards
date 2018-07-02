const Sequelize = require('sequelize')
const db = require('../db')

const Flashcard = db.define('flashcard', {
  question: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  answer: {
    type: Sequelize.TEXT,
  },
})

module.exports = Flashcard

