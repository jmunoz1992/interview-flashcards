const router = require('express').Router()
const {Flashcard, Pack} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const flashcards = await Flashcard.findAll()
    res.json(flashcards)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const createdFlashcard = await Flashcard.create({
      question: req.body.question,
      answer: req.body.answer,
      type: req.body.type,
    })
    const type = req.body.type[0].toUpperCase() + req.body.type.slice(1);
    const matchingPack = await Pack.findOne({
      where: {
        name: type
      }
    })
    createdFlashcard.setPack(matchingPack.id)
    res.status(201).json(createdFlashcard)
  } catch (err) {
    next(err)
  }
})
