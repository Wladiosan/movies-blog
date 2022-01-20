const Router = require('express')

const MoviesController = require('../controllers/movieController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/create', checkRoleMiddleware, MoviesController.create)
router.post('/import', checkRoleMiddleware, MoviesController.import)
router.get('/', MoviesController.getAll)
router.get('/:id', MoviesController.getById)

module.exports = router