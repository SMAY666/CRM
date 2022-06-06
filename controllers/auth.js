const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHendler = require('../utils/errorHendler')

module.exports.login = async function(req, res) {
    const condidate = await User.findOne({email: req.body.email})

    if (condidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, condidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: condidate.email,
                userId: condidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else {
            res.status(401).json({
                message: 'Пороли не совпадают. Попробуйте снова'
            })
        }
    }
    else {
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({
            message: 'Такой emai уже занят. Пожалуйста, попробуйте другой'
        })
    }
    else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        }
        catch(e) {
            errorHendler(res, e)
        }
    }
}