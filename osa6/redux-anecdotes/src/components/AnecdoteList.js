import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer' 
import { showNotification, removeNotification } from '../reducers/notificationReducer' 

const AnecdoteList = ({
    visibleAnecdotes, 
    notification,
    vote,
    showNotification,
    removeNotification
  }) => {

  const voteFor = anecdote => {
    vote(anecdote.id)
    const [, removeHandle] = notification 
    if(removeHandle !== -1) {
      clearTimeout(removeHandle)
    }
    showNotification(
      `you voted '${anecdote.content}'`,
      setTimeout(() => removeNotification(), 5000)
    )
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
    visibleAnecdotes: anecdotesToShow(state),
    notification: state.notification
  }
}


export default connect(
  mapStateToProps,
  { vote, showNotification, removeNotification } 
)(AnecdoteList)