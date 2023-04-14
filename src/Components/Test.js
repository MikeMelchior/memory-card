import React, { useEffect, useState } from 'react'



export default function Test() {

  const [dogs, setDogs] = useState({});

  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/list/all`)
      .then(response => response.json())
      .then(data => setDogs(data.message))
      .catch(error => console.error(error));
  }, []);

  const getDogsArray = () => {
    let array = [];
    for (let dog in dogs) {
      array.push(dog)
    }
    console.log(array)
    return array
  }

 
  return (
    <div>
      {getDogsArray().map(dog => {
        return <div>{dog}</div>
      })}
    </div>
  )
}

