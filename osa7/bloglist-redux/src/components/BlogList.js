import React from 'react'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import { connect } from 'react-redux'

import {
  Link
} from 'react-router-dom'

import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  const blogFormRef = React.createRef()

  return (
    <div className='blogList'>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <CreateBlogForm toggleVisibility={() =>  blogFormRef.current.toggleVisibility()} />
      </Togglable>

      <Table striped>
        <tbody>
          {blogs && blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)

