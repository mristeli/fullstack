import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message, className }) => {
  return (
    <div className={className}>
      {message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.notification[0].text,
    className: state.notification[0].className
  }
} 

export default connect(mapStateToProps)(Notification)