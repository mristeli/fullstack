import React from 'react'
import { connect } from 'react-redux'
import { showMessage } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'

import { Form, Button } from 'react-bootstrap'

const CreateBlogForm = ({
  newBlog,
  showMessage,
  toggleVisibility
}) => {
  const onSubmit = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    newBlog({ title, author, url })
    toggleVisibility()
    showMessage(`a new blog ${title} by ${author} added`, 5)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control id="title" name="title" type="text" />
        <Form.Label>author</Form.Label>
        <Form.Control id="author" name="author" type="text" />
        <Form.Label>url</Form.Label>
        <Form.Control id="url"name="url" type="text" />
        <Button variant="primary" id="submit" type="submit">create</Button>
      </Form.Group>
    </Form>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    toggleVisibility: ownProps.toggleVisibility
  }
}

export default connect(
  mapStateToProps,
  { newBlog, showMessage }
)(CreateBlogForm)