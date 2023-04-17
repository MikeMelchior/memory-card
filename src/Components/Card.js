import React, { useState } from "react"

export default function Card({ url, shuffle, card, setLoss }) {
  
  const handleClick = () => {
    console.log(card.clicked)
    if(card.clicked === true) {
      setLoss(true)
    }
    card.clicked = true
  }

  return ( 
    <div className='card' onClick={() => {
      handleClick()
      shuffle();
      
    }}>    
      <img src={url} alt="dog" />
    </div>
    
  )
}
