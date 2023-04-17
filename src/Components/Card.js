import React from "react"

export default function Card({ card, shuffle, setLoss, setScore, setLevel }) {
  
  const handleClick = () => {
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
      <img src={card.url} alt="dog" onError={() => {
        // error handle if image doesn't load
        // change level to re trigger render
        // with new batch of images
        console.log('error handled')
        setLevel(currLevel => currLevel + 1);
        setLevel(currLevel => currLevel - 1);
      }} />
    </div>
    
  )
}
