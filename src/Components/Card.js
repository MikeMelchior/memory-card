import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import React, { useState, useEffect } from 'react'

export default function Card({ dogs }) {

  const [dogArray, setDogArray] = useState([])
  
  useEffect(() => {
    const getDogsArray = () => {
      let array = [];
      for (let dog in dogs) {
        array.push(dog)
      }
      return array
    }

    setDogArray(getDogsArray())
  }, [dogs])

   
  

 
  return (
    <div>Card</div>
  )
}
