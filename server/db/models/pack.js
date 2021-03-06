const Sequelize = require('sequelize')
const db = require('../db')

const Pack = db.define('pack', {
  name: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  amtCorrect: {
    type: Sequelize.INTEGER
  }
})

module.exports = Pack
