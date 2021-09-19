const express = require("express")
const cors = require("cors")
const config = require('dotenv').config()

const DB = require("./db/DB")
const db = new DB().getInstance()

const { PORT, APP_NAME } = require("./config.js")

const app = express()

app.use(cors())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

const userRouter = express.Router()

const user_controller = require("./controllers/user.controller")

userRouter.post("/create", user_controller.create)

userRouter.put("/get", user_controller.read)

userRouter.put("/update", user_controller.update)

userRouter.delete("/:userId/delete", user_controller.delete)

app.use("/user", userRouter)

const dataRouter = express.Router()

dataRouter.get("/menu", (req, res) => {
  const data = db.getMenu()
  res.send(data)
})

dataRouter.get("/users", (req, res) => {
  const data = db.getUsers()
  res.send(data)
})

app.use("/data", dataRouter)

app.listen(PORT, () => {
  console.log(`${APP_NAME} backend is running on: ${PORT}`)
})
