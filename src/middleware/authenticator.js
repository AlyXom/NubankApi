const { verify } = require("jsonwebtoken")
const authConfig = require("../configs/auth")

function authenticator(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.send("Token nao informado")
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        req.user = {
            id: Number(user_id)
        }

        return next()
    } catch (error) {
        return res.send("JWT invalido")
    }


}

module.exports = authenticator