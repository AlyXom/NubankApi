require("dotenv").config()
const express = require("express")
const routes = require("./routes/index")
const uploadConfig = require("./configs/upload")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)


const PORT = process.env.PORT
app.listen(PORT, () => console.log("Rodando servidor"))