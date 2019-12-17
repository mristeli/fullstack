import React from 'react'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, loggedInUser, addLike, removeBlog }) => {
  if ( blog === undefined ) {
    return null
  }

  const likeHandler = (event) => {
    event.preventDefault()
    addLike(blog)
  }

  const removeHandler = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} {blog.likes !== 1 ? 'likes' : 'like'} <button onClick={likeHandler}>like</button></p>
      {blog.user && <p>Added by {blog.user.name}</p>}
      {blog.user && blog.user.username === loggedInUser.username &&
        <p><button onClick={removeHandler}>remove</button></p>}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs.find(blog => blog.id === ownProps.id),
  loggedInUser: state.user
})

export default connect(mapStateToProps, { addLike, removeBlog })(Blog)
