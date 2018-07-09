const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/flashcards', require('./flashcards'))
router.use('/packs', require('./packs'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
