import React, { useEffect, useState } from 'react'
import Card from './Card';


export default function Game() {

  const [dogs, setDogs] = useState({});

  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/list/all`)
      .then(response => response.json())
      .then(data => setDogs(data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Card dogs={dogs} />
    </div>
  )
}

