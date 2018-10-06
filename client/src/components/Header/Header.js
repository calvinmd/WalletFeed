import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as log from 'loglevel'
import { MdChevronLeft } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

import './Header.sass';


class MenuTopBarButton extends Component {
  render() {
    return (
      <div
        className={cx({
          MenuTopBarButton: true,
          active: this.props.active,
        })}
        onClick={this.props.onClick || (() => {})}>
        {this.props.children}
      </div>
    );
  }
}

class MenuTopBar extends Component {
  render() {
    return (
      <div className='MenuTopBar'>
        <MenuTopBarButton active={false} onClick={() => console.log('All')}>All</MenuTopBarButton>
        <MenuTopBarButton active={true} onClick={() => console.log('Watchlist')}>Watchlist</MenuTopBarButton>
        <MenuTopBarButton active={false} onClick={() => console.log('Me')}>Me</MenuTopBarButton>
      </div>
    );
  }
}


class Header extends Component {
  render() {
    return (
      <header className="Header">
        <MdChevronLeft className="back" />
        <MenuTopBar />
        <FaUser className="profile" />
      </header>
    );
  }
}

export default Header;
