import React from 'react'
import { connect } from 'react-redux'

const Notification = ({notification}) => {
  const [message] = notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: message ? 'block' : 'none'
  }
  return (
   <div style={style}>
      {message}
    </div>
  )
}

const mapStatsToProps = state => {
  return {
    notification: state.notification
  }
} 

export default connect(mapStatsToProps)(Notification)