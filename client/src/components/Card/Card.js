import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as log from 'loglevel'

import './Card.sass';


class Card extends Component {
  static defaultProps = {
    wide: true,
  }
  render() {
    return (
      <div className={cx({
        Card: true,
        wide: this.props.wide,
      }, (this.props.className || ''))}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
