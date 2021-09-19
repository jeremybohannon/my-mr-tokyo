const DB = require('../db/DB')

const DBService = null

getDBService = () => {
  if(DBService === null) {
    DBService = new DB()
  }
  return DBService
}

module.exports = this.getDBService