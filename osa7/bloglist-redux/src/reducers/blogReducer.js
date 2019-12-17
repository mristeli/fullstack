
import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = (await blogService.getAll())
      .sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (content) => {
  return async dispatch => {
    const createdBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: createdBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const id = blog.id
    await blogService.removeBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}


export const addLike = blog => {
  return async dispatch => {
    const updated = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      data: updated
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(
      action.data
    )
  case 'LIKE':
    const id = action.data.id
    return state.reduce((newState, next) => (
      newState.concat(next.id === id ? {
        ...next,
        likes : next.likes + 1
      } : next)
    ), []).sort((a, b) => b.likes - a.likes)
  default:
  }

  return state
}

export default blogReducer