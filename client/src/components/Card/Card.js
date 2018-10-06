import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as log from 'loglevel'

import './Card.sass';


class Card extends Component {
  render() {
    return (
      <div className={cx({ Card: true }, (this.props.className || ''))}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
