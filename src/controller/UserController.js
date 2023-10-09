const knex = require("../database/knex")
const { hash, compare } = require("bcryptjs")

class UserController {

    async create(req, res) {
        const { name, email, password } = req.body
        const userEmailExist = await knex("users").where({ email }).first()

        if (userEmailExist) {
            return res.status(401).send("E-mail ja esta em uso")
        }

        const hashedPassword = await hash(password, 8)

        await knex("users").insert({ name, email, password: hashedPassword })

        return res.status(201).json({ message: "Usuario criado" })
    }

    async update(req, res) {
        const { name, email, password, oldPassword } = req.body
        const user_id = req.user.id
        const user = await knex("users").where({ id: user_id }).first()
        const userExist = await knex("users").where({ email }).first()

        if (userExist && userExist.id != user.id) {
            return res.send("email ja esta em uso")
        }

        const passwordMatched = await compare(oldPassword, user.password)

        if (!passwordMatched) {
            return res.send("E-mail ou senha incorreto")
        }

        const newPassword = await hash(password, 8)

        user.name = name ?? user.name
        user.email = email ?? user.email
        user.password = newPassword ?? user.password

        await knex("users").update(user).where({ id: user_id })


        return res.send("Rota de atualizacao")
    }
}

module.exports = UserController