const router = require('express').Router()
const {Pack, Flashcard} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const packs = await Pack.findAll()
    res.json(packs)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const createdPack = await Pack.create({
      name: req.body.name,
    })
    res.status(201).json(createdPack)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Pack.update({
      name: req.body.name,
    }, {
      where: {
        id: req.params.id
      }
    })
    const updatedPack = await Pack.findById(req.params.id);
    res.status(201).json(updatedPack)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Flashcard.destroy({
      where: {
        packId: req.params.id
      }
    })
    await Pack.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).send('this pack has been destroyed')
  } catch (err) {
    next(err)
  }
})
