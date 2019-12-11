import React from 'react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import { connect } from 'react-redux'

const BlogList = ({ blogs, user }) => {
  const blogFormRef = React.createRef()

  return (
    <div className='blogList'>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <CreateBlogForm  />
      </Togglable>

      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} loggedInUser={user} />
      )}
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs,
    user: ownProps.user
  }
}

export default connect(mapStateToProps)(BlogList)

