const router = require('express').Router()
const {Flashcard} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const flashcards = await Flashcard.findAll()
    res.json(flashcards)
  } catch (err) {
    next(err)
  }
})
