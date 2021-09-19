const fs = require("fs")
class DB {
  constructor() {
    this.memory = {}
    this.getStoredData()
    this.saveDataToDiskInterval()
  }

  getStoredData() {
    this.getMenuFromDisk()
    this.getUsersFromDisk()
  }

  getMenuFromDisk() {
    fs.readFile("./db/menu.json", (err, data) => {
      if (!err) {
        this.memory.menu = data
      } else {
        console.log(err)
        this.memory.menu = {}
      }
    })
  }

  getUsersFromDisk() {
    fs.readFile("./db/userData.json", (err, data) => {
      if (!err) {
        this.memory.users = JSON.parse(data)
      } else {
        console.log(err)
        this.memory.users = {}
      }
    })
  }

  getMenu() {
    return this.memory.menu
  }

  getUsers() {
    return this.memory.users
  }

  saveDataToDiskInterval() {
    setInterval(() => {
      console.log("saving data")
      fs.writeFile('./db/userData.json', JSON.stringify(this.memory.users), (err) => {
        if(err) {
          console.log(err)
        }
      })
    }, 1000 * 60 * 2 )
  }

  updateUser({userId, userData = {}}) {
    this.memory.users[userId] = userData
  }

  updateMenu(newMenu) {
    this.memory.menu = newMenu
  }

  getUserData(userId) {
    if(this.memory.users[userId] !== undefined) {
      return this.memory.users[userId]
    } else {
      return null
    }
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new DB()
    }
  }

  getInstance() {
    return Singleton.instance
  }
}

module.exports = Singleton
