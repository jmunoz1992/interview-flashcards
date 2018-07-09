const router = require('express').Router()
const {Pack} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const packs = await Pack.findAll()
    res.json(packs)
  } catch (err) {
    next(err)
  }
})
