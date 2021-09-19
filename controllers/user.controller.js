const Auth = require("../services/Auth.service")
const DB = require("../db/DB")
const AuthService = new Auth()
const db = new DB().getInstance()

exports.create = (req, res, next) => {
  const user = createUser(req.body.userId)
}

createUser = (userId) => {
  const userData = {
    scorecards: {},
  }

  const user = {
    userId,
    userData,
  }

  return user
}

exports.read = async ({ body: { userId } }, res, next) => {
  try {
    const payload = await AuthService.verify(userId)
    if (Object.keys(payload).length >= 1) {
      const userId = payload.sub
      let userData = db.getUserData(userId)

      if (userData === null) {
        console.log(`Creating new User: ${userId.slice(0, 10)}`)
        const newUser = createUser(userId)
        db.updateUser(newUser)
        userData = newUser.userData
      }
      res.send(userData)
    } else {
      res.send({})
    }
  } catch (err) {
    console.log(err)
    res.send({})
  }
}

exports.update = async ({ body: { userId, userData } }, res, next) => {
  const payload = await AuthService.verify(userId)
  if (Object.keys(payload).length >= 1) {
    const userId = payload.sub
    if (userData !== null) {
      db.updateUser({ userId, userData })
      res.send(db.getUserData(userId))
    } else {
      res.send("No Data")
    }
  } else {
    res.send({})
  }
}

exports.delete = (req, res, next) => {}
