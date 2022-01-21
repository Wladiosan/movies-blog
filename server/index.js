require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')

const sequelize = require('./db')
const router = require('./router/index')
const models = require('./models/models')
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

// Error handler. Should be the last line!
app.use(ErrorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()