const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
    async create(req, res) {
        const avatarName =  req.file.filename
        const user_id = req.user.id
        const diskStorage = new DiskStorage()
        const user = await knex("users").where({ id: user_id}).first()

        if(!user) {
            return res.send("Usuario nao existe")
        }

        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const fileName = await diskStorage.saveFile(avatarName)
        user.avatar = fileName

        await knex("users").update(user).where({ id: user_id })

        return res.send(user)

    }
}

module.exports = UserAvatarController