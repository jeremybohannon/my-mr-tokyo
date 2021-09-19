import { SERVER_URL } from '../../config'

class BackendService {
  constructor() {
    this.path = SERVER_URL
  }

  async getAllData(userId) {
    const [userData, menuData] = await Promise.all([this.getUserData(userId), this.getMenuData()])
    return {userData, menuData}
  }

  async getMenuData() {
    const resp = await fetch(`${this.path}/data/menu`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
    })
    const json = await resp.json()
    return json
  }

  async getUserData(userId) {
    const resp = await fetch(`${this.path}/user/get`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({userId})
    })
    const json = await resp.json()
    return json
  }

  async updateUserData(userId, userData) {
    const resp = await fetch(`${this.path}/user/update`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({userId, userData})
    })
    return resp
  }
}

export default BackendService