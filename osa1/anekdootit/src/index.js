import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Votes = ({count}) => {
    if(count) {
       return <p>has {count} votes</p> 
    } 
    return <></>
}

const AnecdoteWithMostVotes = ({mostVoted, anecdotes}) => {
  if(mostVoted.count !== 0) {
    return <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted.anecdote]}</p>
      <Votes count={mostVoted.count}/>
    </div>
  }
  return <></>
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length))
  const [mostVoted, setMostVoted] = useState({ count: 0 });

  const voteSelected = () => {
    const updatedVoteCount = votes[selected]?votes[selected] + 1:1
    if(updatedVoteCount > mostVoted.count) {
      setMostVoted({
        anecdote: selected,
        count: updatedVoteCount 
      })
    }
    const updatedVotes = [...votes]
    updatedVotes[selected] = updatedVoteCount
    setVotes(updatedVotes)
  }
  const nextAnecdote = () => {
    let next = selected;
    // always show different anedote
    while (selected === next) {
      next = Math.floor(Math.random() * anecdotes.length) 
    }
    setSelected(next)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Votes count={votes[selected]} anecdote={selected}/>
      <p>
        <Button onClick={voteSelected} text="vote" /> 
        <Button onClick={nextAnecdote} text="next anecdote" /> 
      </p>
      <AnecdoteWithMostVotes mostVoted={mostVoted} anecdotes={anecdotes} />
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