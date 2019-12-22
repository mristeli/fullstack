import React from 'react'
import { connect } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = ({ message, className }) => {
  return (<div>
    { message &&
      <Alert variant={className}>
        {message}
      </Alert>
    }
  </div>)
}

const mapStateToProps = state => {
  return {
    message: state.notification[0].text,
    className: state.notification[0].className
  }
}

export default connect(mapStateToProps)(Notification)