import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as log from 'loglevel'

import './Button.sass';


class Button extends Component {
  render() {
    return (
      <button
        className={cx({ Button: true }, this.props.className || '')}
        onClick={this.props.onClick || (() => {})}
      >
        {this.props.children}
      </button>
    )
  }
}

export default Button;
