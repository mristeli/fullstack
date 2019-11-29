import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ 
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: createdAnecdote
    })
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const updated = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updated
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE': 
      return state.concat(
        action.data
      )
    case 'VOTE':
      const id = action.data.id
      return state.reduce((newState, next) => (
        newState.concat(next.id === id ? { 
            ...next,
            votes : next.votes + 1
          } : next) 
      ), []).sort((a, b) => b.votes - a.votes)
    default:
  }

  return state
}


export default anecdoteReducer