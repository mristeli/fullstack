import React from 'react'
import { connect } from 'react-redux'

import {
  Link
} from 'react-router-dom'

import { Table } from 'react-bootstrap'

const UserList = ({ users }) => (
  <div className='userList'>
    <h2>Users</h2>
    <Table striped>
      <thead>
        <tr>
          <th></th>
          <th><b>blogs created</b></th>
        </tr>
      </thead>
      <tbody>
        {users && users.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)