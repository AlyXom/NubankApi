const { Router } = require("express")
const authenticator = require("../middleware/authenticator")
const AccountController = require("../controller/AccountController")

const accountController = new AccountController()
const accountRoutes = Router()

accountRoutes.get('/', authenticator, accountController.index)
accountRoutes.post('/', authenticator, accountController.create)
accountRoutes.patch('/', authenticator, accountController.update)

module.exports = accountRoutes