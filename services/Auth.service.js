const { OAuth2Client } = require('google-auth-library')
const { Google_Client_Id } = require('../config')


class Auth {
  constructor() {
    this.client = new OAuth2Client(Google_Client_Id);
  }

  async verify (token) {
    try {
      const ticket = await this.client.verifyIdToken({
          idToken: token,
          audience: Google_Client_Id,  
      });
      const payload = ticket.getPayload();payload['sub'];
  
      if(Object.keys(payload).length >= 1 ) {
        return payload
      } else {
        return {}
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Auth