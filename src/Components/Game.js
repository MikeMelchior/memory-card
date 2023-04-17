import React, { useEffect, useState } from 'react'
import Card from './Card';
import uniqid from 'uniqid'

export default function Game() {
    // page is loading? 
  const [load, setLoad] = useState(true);

    // initial dog pictures array
  const [dogArray, setDogArray] = useState([]);

    // set intitial level to 1
  const [level, setLevel] = useState(1)

    // level length used to determine how many pictures
    // to display based on level
  const [levelLength, setLevelLength] = useState(4);

    // use array of game card objects to control game
  const [levelArray, setLevelArray] = useState([])

    // manually set levels one and two
  const determineLevelLength = () => {
    if (level === 1) {
      setLevelLength(4)
    } else if ( level === 2) {
      setLevelLength(5)
    } else setLevelLength(level * 2)
  }
  
    // create array of dog pictures based on level
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
      fetch(`https://dog.ceo/api/breeds/image/random/${levelLength}`)
        .then(response => response.json())
        .then(data => {
          setDogArray(data.message);
          setLoad(false)
        })
    }, 1000)
    
  }, [levelLength])


    // shuffle pictures on click
  const shuffleDoggos = () => {
    let tempArray = dogArray;
    let length = tempArray.length;
    let shuffled = []
    for (let i = 0; i < length; i++) {
      let dog = tempArray.splice(Math.floor(Math.random() * tempArray.length), 1)
      shuffled.push(dog)
    }
    setDogArray(shuffled);
  }

  const checkLevelStatus = () => {

  }

  

  return (
    <>
      {load 
        ? <div className='loading'>Loading . . . Level {level}</div> 
        : <>
            <p className='info'>Get points by clicking on a doggo, 
                but don't click the same one twice!
            </p>
            <div onLoad={determineLevelLength} className='game'>
              {dogArray.map(d => {
                return (<Card 
                          key={uniqid()} 
                          dog={d} 
                          shuffle={shuffleDoggos}
                        />)
              } )}
            </div>
          </>
      }

    </>
    
  )
}