import React from "react"

import Login from "../Login"

const NavBar = ({setUser}) => {
  return (
    <section className="nav-bar">
      <span className="flex justify-between pa2 w-100 w-60-l">
        <h1 className="brand-font">My Mr. Tokyo</h1>
        <Login  setUser={setUser}/>
      </span>
    </section>
  )
}

export default NavBar
