const {DataTypes} = require('sequelize')

const sequelize = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    f_name: {type: DataTypes.STRING, allowNull: false},
    l_name: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Movies = sequelize.define('movies', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    format: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {
    User,
    Movies
}