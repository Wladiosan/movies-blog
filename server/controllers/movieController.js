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
        let {title, year, limit, page} = req.body
        let movies
        let offset

        page = page || 1
        limit = limit || 10
        offset = page * limit - limit

        if (!title && !year) {
            movies = await Movies.findAndCountAll({limit, offset})
        }

        if (title && !year) {
            movies = await Movies.findAndCountAll({where: {title}, limit, offset})
        }

        if (!title && year) {
            movies = await Movies.findAndCountAll({where: {year}, limit, offset})
        }

        if (title && year) {
            movies = await Movies.findAndCountAll({where: {title, year}, limit, offset})
        }

        return await res.json(movies)

    }

    async getById(req, res, next) {

    }

}

module.exports = new MovieController()