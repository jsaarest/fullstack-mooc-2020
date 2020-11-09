import React from 'react'
import './notification.css'

const Notification = ({ message, severity }) => {
  if (message === '') {
    return null
  }

  return (
    <div className={severity === 'error' ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification