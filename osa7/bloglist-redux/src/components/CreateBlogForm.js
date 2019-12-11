import React from 'react'
import { connect } from 'react-redux'
import { showMessage } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'

const CreateBlogForm = ({
  newBlog,
  showMessage
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

    showMessage(`a new blog ${title} by ${author} added`, 5)
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        title: <input
          name="title"
        />
      </div>
      <div>
        author: <input
          name="author"
        />
      </div>
      <div>
        url: <input
          name="url"
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default connect(
  null,
  { newBlog, showMessage }
)(CreateBlogForm)