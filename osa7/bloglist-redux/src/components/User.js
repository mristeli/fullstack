import React from 'react'
import { connect } from 'react-redux'

import {
  Link
} from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const User = ({ user }) => {
  if ( user === undefined ) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs && user.blogs.map(blog =>
          <ListGroupItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link> 
          </ListGroupItem>
        )}
      </ListGroup>
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