import React from 'react'
import { connect } from 'react-redux'
import { addComment, addLike, removeBlog } from '../reducers/blogReducer'
import { showMessage } from '../reducers/notificationReducer'

import { Card, ListGroup, ListGroupItem,
  Form, Button } from 'react-bootstrap'

import {
  withRouter
} from 'react-router-dom'

const Blog = ({ history,
  blog, loggedInUser, addLike, 
  removeBlog, addComment, showMessage }) => {
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
    history.push('/')
    showMessage(`Blog ${blog.title} removed`)
  }

  const commentHandler = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    addComment(blog, comment)
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{blog.title} by {blog.author}</Card.Title>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} {blog.likes !== 1 ? 'likes' : 'like'} <Button id="addLike" variant="secondary" onClick={likeHandler}>like</Button></p>
        {blog.user && <p>Added by {blog.user.name}</p>}
        {blog.user && blog.user.username === loggedInUser.username &&
          <p><Button variant="secondary" onClick={removeHandler}>remove</Button></p>}
      </Card.Body>
      <h3>comments</h3>
      <Form onSubmit={commentHandler}>
        <Form.Group>
          <Form.Control name="comment" type="text" />
          <Button variant="primary" type="submit">Add comment</Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {blog.comments && blog.comments.map((c, i) =>
          <ListGroupItem key={i}>{c}</ListGroupItem>
        )}
      </ListGroup>
    </Card>
  )
}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs.find(blog => blog.id === ownProps.id),
  loggedInUser: state.user
})

export default connect(mapStateToProps,
  { addLike, removeBlog, addComment, showMessage })(withRouter(Blog))
