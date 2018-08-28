const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await User.update({
      totalPoints: req.body.totalPoints
    }, {
      where: {
        id: req.params.id
      }
    })
    const updatedUser = await User.findById(req.params.id);
    res.status(201).json(updatedUser)
  } catch (err) {
    next(err)
  }
})
