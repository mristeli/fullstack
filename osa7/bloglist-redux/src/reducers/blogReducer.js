
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
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const id = blog.id
    await blogService.addComment(blog, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: { id, comment }
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
    return state.concat(action.data)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.data.id)
  case 'LIKE':
    return state.map(b => b.id === action.data.id ?
      { ...b, likes : action.data.likes } : b)
      .sort((a, b) => b.likes - a.likes)
  case 'NEW_COMMENT':
    return state.map(b => b.id === action.data.id ?
      { ...b,
        comments: b.comments.concat(action.data.comment) 
      } : b)
  default:
  }

  return state
}

export default blogReducer