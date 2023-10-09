const { Router } = require("express")
const userRoutes = require("../routes/user.routes")
const sessionRoutes = require("../routes/session.routes")
const accountRoutes = require("../routes/account.routes")

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/session', sessionRoutes)
routes.use('/account', accountRoutes)

module.exports = routes