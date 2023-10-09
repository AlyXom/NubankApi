const { Router } = require("express")
const UserController = require("../controller/UserController")
const authenticator = require("../middleware/authenticator")
const UserAvatarController = require("../controller/UserAvatarController")
const uploadConfig = require("../configs/upload")
const multer = require("multer")

const userRoutes = Router()

const userAvatarController = new UserAvatarController()
const userController = new UserController()
const update = multer(uploadConfig.MULTER)


userRoutes.post('/', userController.create)
userRoutes.put('/', authenticator, userController.update)
userRoutes.patch('/avatar', authenticator, update.single("avatar"), userAvatarController.create)

module.exports = userRoutes