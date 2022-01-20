const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ApiError = require('../error/ApiError')
const {User} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {

    async registration(req, res, next) {
        const {email, password, fname, lname, role} = req.body

        if (!email || !password || !fname || !lname) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }

        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(ApiError.badRequest('Such email already exist'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, f_name: fname, l_name: lname, role})

        const token = generateJwt(user.id, user.email, user.role)

        return res.status(201).json({token})

    }

    async login(req, res, next) {
        const {email, password} = req.body

        const user = await User.findOne({where: {email}})

        if (!user) {
            next(ApiError.badRequest('User with such email does not exist'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.badRequest('Incorrect password'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.status(200).json({token})

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)

        return res.status(200).json({token})
    }
}

module.exports = new UserController()