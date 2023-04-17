import React, { useEffect, useState } from 'react'
import Card from './Card';
import uniqid from 'uniqid'

export default function Game() {
  const [newGame, setNewGame] = useState(true)
  const [load, setLoad] = useState(true);
  const [urlArray, setUrlArray] = useState([]);
  const [level, setLevel] = useState(1)
    // level length used to determine how many pictures
    // to display based on level
  const [levelLength, setLevelLength] = useState(4);
  const [cards, setCards] = useState([])
  const [loss, setLoss] = useState(false)

    // new Game setup
  useEffect(() => {
    setLevel(1)
    setLoss(false)
    setLoad(true)
    setNewGame(true)
  }, [loss])

    // create array of dog picture urls based on level
  useEffect(() => {
    if (level === 1) {
      setLevelLength(4)
    } else if ( level === 2) {
      setLevelLength(5)
    } else setLevelLength(level * 2)

    fetch(`https://dog.ceo/api/breeds/image/random/${levelLength}`)
      .then(response => response.json())
      .then(data => {
        setUrlArray(data.message)
      })

    setTimeout(() => {
      setLoad(false)
      setNewGame(false)
    }, 1000)

  }, [levelLength, level])

    // set up memory cards
  useEffect(() => {
    setCards([])
    urlArray.forEach(url => {
      let dog = {url: url, id: uniqid(), clicked:false}
      setCards(prev => [...prev, dog])
    })
  }, [urlArray])


    // shuffle pictures on click
  const shuffleDoggos = () => {
    let tempArray = cards;
    let length = cards.length;
    let shuffled = []
    for (let i = 0; i < length; i++) {
      let dog = tempArray.splice(Math.floor(Math.random() * tempArray.length), 1)
      shuffled.push(...dog)
    }
    setCards(shuffled);
  }

  useEffect(() => {
    if(loss) {
      alert('you clicked the same picture twice')
    }
  }, [loss])

  
  useEffect(() => {
    const win = () => {
      for (let card in cards) {
        if (cards[card].clicked === false) return false 
      }
      return true
    }
    if (win() && !newGame) {
      setLevel(prevLevel => prevLevel + 1)
      setLoad(true)
    } 
  }, [cards, newGame])

  

  return (
    <>
      {load 
        ? <>
            {newGame 
              ? <div className='loading'>Loading Level {level} . . .</div> 
              : <div className='loading'>Nice! Loading Level {level} . . .</div>}
            
          </>
         
        : <>
            <p className='info'>Get points by clicking on a doggo, 
                but don't click the same one twice!
            </p>
            <div onLoad={null} className='game'>
              {cards.map(card => {
                return (<Card 
                          card={card}
                          key={card.id} 
                          url={card.url} 
                          shuffle={shuffleDoggos}
                          setLoss={setLoss}
                        />)
              })}
            </div>
          </>
      }

    </>
    
  )
}