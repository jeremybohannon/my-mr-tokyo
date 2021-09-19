import React, { useState } from "react"

import styled from "styled-components"

import EditScoreCard from "./EditScoreCard.js"

const ScoreCards = ({ userData, setUserData, menuData }) => {
  const [showEditCard, setShowEditCard] = useState(false)
  const [isNew, setIsNew] = useState("")
  const scorecards = userData.scorecards

  const createNewScoreCard = () => {
    setIsNew("")
    setShowEditCard(true)
  }

  const editScoreCard = (scoreCardId) => {
    setIsNew(scoreCardId)
    setShowEditCard(true)
  }

  const generatePoints = (menu) => {
    let score = 0

    Object.keys(menu).forEach(category => {
      Object.keys(menu[category]).forEach(item => {
        const _item = menu[category][item]
        score += _item.value * _item.userCount
      })
    })
    
    return score
  }

  return (
    <section className="flex justify-center flex-column items-center mv2">
      {showEditCard && (
        <EditScoreCard
          menuData={menuData}
          userData={userData}
          setShowEditCard={setShowEditCard}
          setUserData={setUserData}
          isNew={isNew}
        />
      )}
      {!showEditCard && (
        <section className="w-100">
          {Object.keys(scorecards).length === 0 && (
            <div>
              <p className="text-center">
                Look's like you don't have any scorecards. Click below to create
                your first!
              </p>
            </div>
          )}
          <section className="flex flex-column">
            {Object.keys(scorecards).map((item, i) => (
              <span key={i} className="flex flex-row w-100 items-center pv1 justify-between">
                <span className="flex w-50">
                  <h4>Date:</h4>
                  {scorecards[item].time}
                </span>
                <span className="flex">
                  <h4>Points:</h4>
                  {generatePoints(scorecards[item].menuData)}
                </span>
                <span className="flex ph2">
                  <ButtonWrapperSmall onClick={() => editScoreCard(item)}>Edit</ButtonWrapperSmall>
                </span>
              </span>
            ))}
          </section>

          <section className="flex justify-center pv4">
            <ButtonWrapper onClick={createNewScoreCard}>
              Create new ScoreCard
            </ButtonWrapper>
          </section>
        </section>
      )}
    </section>
  )
}

const ButtonWrapper = styled.button`
  background-color: #008600;
  border-style: none;
  border-width: 0;
  height: 48px;
  font-size: 17px;
  color: white;
  padding-left: 32px;
  padding-right: 32px;
  border-radius: 6px;
`

const ButtonWrapperSmall = styled.button`
  width: 50px;
  padding: 5px;
  background-color: #354d54;
  border-style: none;
  color: white;
`

export default ScoreCards
