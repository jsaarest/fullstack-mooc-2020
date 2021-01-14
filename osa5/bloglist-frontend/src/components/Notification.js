import React from 'react'
import PropTypes from 'prop-types';

const Notification = ({ message, variant }) => {
  if (!message) {
    return null
  }

  const style = {
    color: 'white',
    background: variant === 'error' ? '#d04545' : '#2fd440',
    fontSize: 14,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  variant: PropTypes.oneOf(['success', 'error', ''])
};

export default Notification