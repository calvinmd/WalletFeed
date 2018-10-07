import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as log from 'loglevel'

import './Input.sass';


class Input extends Component {
  static defaultProps = {
    type: 'text',
  }

  dom = {
    input: null,
  }

  getValue() {
    return this.dom.input.value;
  }

  render() {
    const { className, defaultValue,label, ...rest } = this.props
    return (
      <div className={cx({ Input: true }, (className || ''))}>
        {label ? <label>{label}</label> : null}
        <input {...rest} ref={c => (this.dom.input = c)} defaultValue={defaultValue} />
      </div>
    );
  }
}

export default Input;
