import React, { useState } from "react"

import styled from "styled-components"

const getDate = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  const yyyy = today.getFullYear()

  return `${mm}/${dd}/${yyyy}`
}

const getMenuDataToEdit = (isNew, menuData, userData) => {
  if (isNew === "") {
    return { ...menuData }
  } else {
    return { ...userData.scorecards[isNew].menuData }
  }
}

const ScoreCards = ({
  menuData,
  userData,
  setShowEditCard,
  setUserData,
  isNew,
}) => {
  const [scoreCard, setScoreCard] = useState({
    time: getDate(),
    menuData: getMenuDataToEdit(isNew, menuData, userData),
  })
  const [hasValueChange, setHasValueChanged] = useState(false)

  const generateId = () => {
    return new Date().getTime()
  }
  const saveScoreCard = () => {
    const newUserData = { ...userData }
    if (isNew === "") {
      newUserData.scorecards[generateId()] = scoreCard
    } else {
      newUserData.scorecards[isNew] = scoreCard
    }
    if (hasValueChange) {
      setUserData(newUserData, (data) => {
        console.log("Success")
      })
    }

    setShowEditCard(false)
  }

  const add = (category, itemName, count) => {
    setHasValueChanged(true)
    setScoreCard({
      ...scoreCard,
      menuData: {
        ...scoreCard.menuData,
        [category]: {
          ...scoreCard.menuData[category],
          [itemName]: {
            ...scoreCard.menuData[category][itemName],
            userCount: scoreCard.menuData[category][itemName].userCount + count,
          },
        },
      },
    })
  }

  return (
    <section className="flex flex-column w-100 mv2">
      {scoreCard.menuData !== {} &&
        Object.keys(scoreCard.menuData).map((category, i) => (
          <section key={i} className="flex flex-column mv2">
            <h2 className="mb2">{category}</h2>
            {Object.keys(scoreCard.menuData[category]).map((item, j) => (
              <span key={j} className="flex justify-between">
                <p>{item}</p>
                <span className="flex flex-row w-40 justify-between pv1">
                  <PlusMinusButtonWrapper
                    onClick={() => add(category, item, -1)}
                    disabled={scoreCard.menuData[category][item].userCount <= 0}
                  >
                    {" "}
                    -{" "}
                  </PlusMinusButtonWrapper>
                  <p> {scoreCard.menuData[category][item].userCount} </p>
                  <PlusMinusButtonWrapper onClick={() => add(category, item, 1)}> + </PlusMinusButtonWrapper>
                </span>
              </span>
            ))}
          </section>
        ))}
      <ButtonWrapper onClick={saveScoreCard}>Save</ButtonWrapper>
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
  margin-top: 2rem;
`

const PlusMinusButtonWrapper = styled.button`
  border: 2px solid #a1a8af;
  background-color: #fff;
  font-size: 16px;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 999px;
  position: relative;
`

export default ScoreCards
