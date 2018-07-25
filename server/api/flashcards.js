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
    if(matchingPack) createdFlashcard.setPack(matchingPack.id)
    res.status(201).json(createdFlashcard)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Flashcard.update({
      question: req.body.question,
      answer: req.body.answer,
      gotCorrect: req.body.gotCorrect,
      type: req.body.type,
    }, {
      where: {
        id: req.params.id
      }
    })
    const updatedFlashcard = await Flashcard.findById(req.params.id);
    res.status(201).json(updatedFlashcard)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Flashcard.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).send('this flashcard has been destroyed')
  } catch (err) {
    next(err)
  }
})
