import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import styled from 'styled-components'
import { Google_Client_Id } from '../../config'

import User from '../../models/User'

export default function Login({setUser}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function onSignIn(googleUser) {
    if (googleUser && googleUser.error !== undefined) {
      return
    }
    const authId = googleUser.getAuthResponse().id_token
    const userDetails = googleUser.getBasicProfile()
    const newUser = new User(authId, userDetails)

    setUser(newUser)
    setIsLoggedIn(true)
  }

  function onLogOut() {
    setUser({})
    setIsLoggedIn(false)
  }

  return (
    <SignInWrapper>
      {
        !isLoggedIn ? <GoogleLogin
          clientId={Google_Client_Id}
          buttonText="Login"
          onSuccess={onSignIn}
          onFailure={onSignIn}
          isSignedIn={onSignIn}
          cookiePolicy={'single_host_origin'} />
          : <GoogleLogout
            clientId={Google_Client_Id}
            buttonText="Logout"
            onLogoutSuccess={onLogOut} />
      }
    </SignInWrapper>
  )
}

const SignInWrapper = styled.div`
`