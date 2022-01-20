const Router = require('express')

const userRouter = require('./userRouter')
const moviesRouter = require('./movieRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/movies', moviesRouter)

module.exports = router