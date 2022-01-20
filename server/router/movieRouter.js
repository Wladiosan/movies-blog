const Router = require('express')

const MoviesController = require('../controllers/movieController')

const router = new Router()

router.post('/create', MoviesController.create)
router.post('/import', MoviesController.import)
router.get('/', MoviesController.getAll)
router.get('/:id', MoviesController.getById)

module.exports = router