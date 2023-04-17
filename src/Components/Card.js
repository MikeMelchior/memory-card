import React from "react"

export default function Card({ url, shuffle, card, setLoss, setScore }) {
  
  const handleClick = () => {
    console.log(card.clicked)
    if(card.clicked === true) {
      setLoss(true)
      return;
    }
    setScore(currScore => currScore + 1)
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
