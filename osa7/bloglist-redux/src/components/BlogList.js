import React from 'react'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import { connect } from 'react-redux'

import {
  Link
} from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const blogFormRef = React.createRef()

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blogList'>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <CreateBlogForm  />
      </Togglable>

      {blogs && blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)

