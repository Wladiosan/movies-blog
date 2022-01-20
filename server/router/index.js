const Router = require('express')

const router = new Router()

router.use('/', (req, res) => {
    res.status(200).json({
        message: 'All worked!'
    })
})

module.exports = router