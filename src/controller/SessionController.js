const knex = require("../database/knex")
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth")

class SessionController {
    async create(req, res) {
        const { email, password } = req.body
        const user = await knex("users").where({email}).first()

        if(!user) {
            return res.send("E-mail ou senha incorreto")
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched) {
            return res.send("E-mail ou senha incorreto")
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn: 30
        })


        return res.json({user, token})
        
    }

    async index(req, res) {
        const user = {
            id: 1
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })


        return res.json({user, token})

    }
}

module.exports = SessionController