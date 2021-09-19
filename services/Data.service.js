class Data {
  constructor() {
    this.data = this.generateData()
  }

  getData () {
    return this.data
  }

  generateData () {
    return {
      scorecards: []
    }
  }
}

module.exports = Data