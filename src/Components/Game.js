import React, { useEffect, useState } from 'react'
import Card from './Card';
import uniqid from 'uniqid'
import ScoreBoard from './ScoreBoard';

export default function Game() {
  const [newGame, setNewGame] = useState(true);
  const [load, setLoad] = useState(true);
  const [urlArray, setUrlArray] = useState([]);
  const [level, setLevel] = useState(1);
    // level length used to determine how many pictures
    // to display based on level
  const [levelLength, setLevelLength] = useState(4);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [loss, setLoss] = useState(false);
  const [error, setError] = useState(false);

    // new Game setup
  useEffect(() => {
    setLevel(1)
    setLoss(false)
    setLoad(true)
    setNewGame(true)
    setScore(0)
  }, [loss])

    // create array of dog picture urls based on level
  useEffect(() => {
    if (level === 1) {
      setLevelLength(4)
    } else if ( level === 2) {
      setLevelLength(5)
    } else setLevelLength(level * 2)


    setError(false)
    
    fetch(`https://dog.ceo/api/breeds/image/random/${levelLength}`)
      .then(response => response.json())
      .then(data => {
        setUrlArray(data.message)
      })

    

    setTimeout(() => {
      setNewGame(false)
      setLoad(false)
    }, 1500)

  }, [levelLength, level, error])

    // set up memory cards
  useEffect(() => {
    setCards([])
    urlArray.forEach(url => {
      let dog = {url: url, id: uniqid(), clicked:false}
      setCards(prev => [...prev, dog])
    })
  }, [urlArray])

  useEffect(() => {
    if (score > highScore) setHighScore(score)
  }, [score, highScore])


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
            <ScoreBoard 
              score={score}
              highScore={highScore}
            />
            <div onLoad={null} className='game'>
              {cards.map(card => {
                return (<Card 
                          card={card}
                          key={card.id} 
                          shuffle={shuffleDoggos}
                          setLoss={setLoss}
                          setScore={setScore}
                          setError={setError}
                        />)
              })}
            </div>
          </>
      }

    </>
    
  )
}