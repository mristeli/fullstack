import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer' 
import { setNotification } from '../reducers/notificationReducer' 

const AnecdoteList = ({
    visibleAnecdotes,
    vote,
    setNotification
  }) => {

  const voteFor = anecdote => {
    vote(anecdote)
    setNotification(`you voted '${anecdote.content}'`, 3)
  }
  
  return (
    <div>
      {visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) =>
  filter ? anecdotes.filter(a => a.content.includes(filter)) : anecdotes

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

export default connect(
  mapStateToProps,
  { vote, setNotification } 
)(AnecdoteList)