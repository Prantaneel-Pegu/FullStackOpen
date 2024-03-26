/* eslint-disable no-unused-vars */

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array(anecdotes.length).fill(0)
  )

  let updatedVotes = [...votes]
  let nextAnecdote = Math.floor(Math.random() * anecdotes.length)
  if (nextAnecdote === selected) nextAnecdote++

  function indexOfMax(arr) { 
    let maxIndex = 0; 
    for (let i = 1; i < arr.length; i++) { 
        if (arr[i] > arr[maxIndex]) { 
            maxIndex = i; 
        } 
    } 
    return maxIndex; 
  } 

  const mostVoted = indexOfMax(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => {
        updatedVotes[selected]++
        setVotes(updatedVotes)
      }} text="vote" />
      <Button handleClick={() => {setSelected(nextAnecdote)}} text="next" />

      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
      <p>has {votes[mostVoted]} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default App