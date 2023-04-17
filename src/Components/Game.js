import React, { useEffect, useState } from 'react'
import Card from './Card';
import uniqid from 'uniqid'

export default function Game() {
  const [load, setLoad] = useState(true);
  const [dogArray, setDogArray] = useState([]);
  const [level, setLevel] = useState(1)
  
  useEffect(() => {
    let length;
    if (level === 1) {
      length = 4
    } else if ( level === 2) {
      length = 5
    } else length = level * 2

    setLoad(true);
    fetch(`https://dog.ceo/api/breeds/image/random/${length}`)
      .then(response => response.json())
      .then(data => {
        setDogArray(data.message);
        setLoad(false)
      })
  }, [level])


  return (
    <>
      {load 
        ? <div>Loading . . . </div> 
        : <div>
            {dogArray.map(d => {
              return <Card key={uniqid()} dog={d}/>
            })}
          </div>}
    </>
    
  )
}