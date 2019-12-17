import React from 'react'
import { connect } from 'react-redux'

const User = ({ user }) => {
  if ( user === undefined ) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs && user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user =>
      user.id === ownProps.id
    )
  }
}

export default connect(mapStateToProps)(User)