import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

function Button(props) {
  return (
    <button
      className="btn btn-primary"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <p>
      {props.children}
      </p>
    </button>
  )
}

Button.propTypes = propTypes
export default Button;