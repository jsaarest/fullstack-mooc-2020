import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

  
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)

  const handleNext = () => {
    const randomItem = Math.floor(Math.random() * anecdotes.length )
    setSelected(randomItem)
  }

  const increase = (selected) => {
    let arr = [...points]
    arr[selected] += 1
    setPoints(arr)
  }

  console.log(selected)
  console.log(points)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[points.indexOf(Math.max(...points))] }</p>
      <p>Has {Math.max(...points)} votes</p>
      <button onClick={() => increase(selected)}>Vote</button>
      <button onClick={handleNext}>Next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)