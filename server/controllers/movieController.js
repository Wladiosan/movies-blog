const {Movies, Stars, MoviesStars} = require('../models/models')
const ApiError = require('../error/ApiError')

class MovieController {

    async create(req, res, next) {

        try {

            const {title, year, format} = req.body
            let {stars} = req.body

            if (!title || !year || !format || !stars.length) {
                next(ApiError.badRequest('Some fields are empty'))
            }

            if (format !== 'DVD' && format !== 'VHS' && format !== 'Blu-Ray') {
                next(ApiError.badRequest('Field format is incorrect'))
            }

            const checkMovie = await Movies.findOne({where: {title}})

            if (checkMovie) {
                next(ApiError.badRequest('Such movie already exist'))
            }

            const movie = await Movies.create({title, year, format})
            await stars.map(async actor => {

                const checkActor = await Stars.findOne({where: {actor}})

                if (!checkActor) {
                    const actorResponse = await Stars.create({actor})
                    await MoviesStars.bulkCreate([{movieId: movie.id, starId: actorResponse.id}])
                    console.log('Actor has been create')
                    return
                }
                await MoviesStars.bulkCreate([{movieId: movie.id, starId: checkActor.id}])
                console.log('Actor already exist')

            })

            return res.status(201).json({
                movie
            })

        } catch (e) {
            res.status(400).json({
                message: e.message
            })
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
        const {id} = req.params
        const movie = await Movies.findOne({where: {id}})
        return res.status(200).json({movie})
    }

    async deleteById(req, res, next) {

    }
}

module.exports = new MovieController()