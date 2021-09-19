import React, { useState, useEffect } from "react"

import NavBar from "../NavBar"
import WelcomeMessage from "./WelcomeMessage"
import ScoreCards from "../ScoreCards"
import BackendService from "../../services/Backend"

const backendService = new BackendService()

const Home = () => {
  const [user, setUser] = useState({ authId: null })
  const [userData, setUserData] = useState({})
  const [menuData, setMenuData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (Object.entries(user).length > 1) {
      const userId = user.getAuthId()

      backendService.getAllData(userId).then(({ userData, menuData }) => {
        if (userData !== null) {
          setUserData(userData)
        }
        if (menuData !== null) {
          setMenuData(menuData)
        }

        setIsLoggedIn(true)
      })
    } else {
      setUserData({})
      setIsLoggedIn(false)
    }
  }, [user, setUserData, setMenuData])

  const updateServer = async (newUserData, callback = () => {}) => {
    if (Object.entries(user).length > 1) {
      setUserData(newUserData)
      const userId = user.getAuthId()
      const resp = await backendService.updateUserData(userId, newUserData)
      const data = await resp.json()
      callback(data)
    }
  }

  return (
    <div>
      <NavBar setUser={setUser} />
      <section className="container">
        <section>
          {!isLoggedIn && <WelcomeMessage />}
          {isLoggedIn && (
            <ScoreCards
              userData={userData}
              setUserData={updateServer}
              menuData={menuData}
            />
          )}
        </section>
      </section>
      <section className="footer"></section>
    </div>
  )
}

export default Home
