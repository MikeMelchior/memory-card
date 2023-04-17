import React from 'react'

export default function ScoreBoard( { score, highScore }) {
  return (
    <div className='score'>
      Score: {score} High Score: {highScore}
    </div>
  )
}
