import React from 'react'
import { connect } from 'react-redux'
import { showNotification, removeNotification } from '../reducers/notificationReducer'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ 
  notification,
  newAnecdote,
  showNotification,
  removeNotification
 }) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    newAnecdote(anecdote)
   
    const [, removeHandle] = notification 
    if(removeHandle !== -1) {
      clearTimeout(removeHandle)
    }
    showNotification(
      `anecdote ${anecdote} added`,
      setTimeout(() => removeNotification(), 5000)
    )
    event.target.anecdote.value = ''
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  { newAnecdote, showNotification, removeNotification }
)(AnecdoteForm)