
import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = (await userService.getAll())
      .sort((a, b) => a.name.localeCompare(b.name))
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const newUser = (content) => {
  return async dispatch => {
    const createdUser = await userService.create(content)
    dispatch({
      type: 'NEW_USER',
      data: createdUser
    })
  }
}

export const removeUser = (blog) => {
  return async dispatch => {
    const id = blog.id
    await userService.removeUser(id)
    dispatch({
      type: 'REMOVE_USER',
      data: { id }
    })
  }
}

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'NEW_USER':
    return state.concat(
      action.data
    )
  default:
  }

  return state
}

export default userReducer