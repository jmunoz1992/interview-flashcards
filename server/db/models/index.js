const User = require('./user')
const Flashcard = require('./flashcard')
const Pack = require('./pack')

Pack.hasMany(Flashcard);
Flashcard.belongsTo(Pack);

module.exports = {
  User,
  Flashcard,
  Pack,
}
