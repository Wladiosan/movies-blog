const {Movies} = require('../models/models')

class MovieController {

    async create(req, res) {

        try {

            const {title, year, format} = req.body

            const movie = await Movies.create({title, year, format})

            return res.status(201).json({
                movie
            })

        } catch (e) {
            console.log(e)
        }
    }

    async import(req, res) {

    }

    async getAll(req, res, next) {

    }

    async getById(req, res, next) {

    }

}

module.exports = new MovieController()