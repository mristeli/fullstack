import React from 'react'
import { connect } from 'react-redux'
import { addComment, addLike, removeBlog } from '../reducers/blogReducer'

import { ListGroup, ListGroupItem } from 'react-bootstrap'

const Blog = ({ blog, loggedInUser, addLike, removeBlog, addComment }) => {
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

  const commentHandler = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    addComment(blog, comment)
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} {blog.likes !== 1 ? 'likes' : 'like'} <button onClick={likeHandler}>like</button></p>
      {blog.user && <p>Added by {blog.user.name}</p>}
      {blog.user && blog.user.username === loggedInUser.username &&
        <p><button onClick={removeHandler}>remove</button></p>}

      <h3>comments</h3>
      <form onSubmit={commentHandler}>
        <input type="text" name="comment"></input> <button type="submit">Add comment</button>
      </form>
      <ListGroup>
        {blog.comments && blog.comments.map((c, i) =>
          <ListGroupItem key={i}>{c}</ListGroupItem>
        )}
      </ListGroup>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs.find(blog => blog.id === ownProps.id),
  loggedInUser: state.user
})

export default connect(mapStateToProps, { addLike, removeBlog, addComment })(Blog)
