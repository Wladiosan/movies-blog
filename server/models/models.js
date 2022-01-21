const {DataTypes} = require('sequelize')

const sequelize = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    f_name: {type: DataTypes.STRING, allowNull: false},
    l_name: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: process.env.NO_ACCESS_ROLE}
})

const Movies = sequelize.define('movies', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    format: {type: DataTypes.ENUM('VHS', 'DVD', 'Blu-Ray'), allowNull: false}
})

const Stars = sequelize.define('stars', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    actor: {type: DataTypes.STRING, unique: true, allowNull: false, notEmpty: true}
})

const MoviesStars = sequelize.define('movies_stars', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

/*Movies.belongsToMany(Stars, {through: MoviesStars, as: 'stars', foreignKey: 'movies_id'})
Stars.belongsToMany(Movies, {through: MoviesStars, as: 'movies', foreignKey: 'stars_id'})*/

MoviesStars.belongsTo(Movies)
MoviesStars.belongsTo(Stars)

Movies.hasMany(MoviesStars)
Stars.hasMany(MoviesStars)

/*const addMoviesStars = (moviesId, starsId) => {
    return Movies.findByPk(moviesId)
        .then((movie) => {
            if (!movie) {
                console.log('Movie not found!')
                return null
            }
            return Stars.findByPk(starsId).then((star) => {
                if (!star) {
                    console.log('Actor not found!')
                }
                Movie.addStar()

            })
        })
}*/


module.exports = {
    User,
    Movies,
    Stars,
    MoviesStars
}