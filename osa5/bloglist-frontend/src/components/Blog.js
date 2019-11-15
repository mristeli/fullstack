import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, loggedInUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const showWhenDetailsHidden = { display: showDetails ? 'none' : '' }
  const showWhenDetailsVisible= { display: showDetails ? '' : 'none' }

  const toggleShowDetails = ({ target }) => {
    if(target.tagName !== 'BUTTON') {
      setShowDetails(!showDetails)
    }
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
    <div style={blogStyle}>
      <div style={showWhenDetailsHidden} onClick={toggleShowDetails}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenDetailsVisible} onClick={toggleShowDetails}>
        <p>{blog.title} {blog.author}</p>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} {blog.likes !== 1 ? 'likes' : 'like'} <button onClick={likeHandler}>like</button></p>
        {blog.user && <p>Added by {blog.user.name}</p>}
        {blog.user && blog.user.username === loggedInUser.username &&
          <p><button onClick={removeHandler}>remove</button></p>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired
}


export default Blog