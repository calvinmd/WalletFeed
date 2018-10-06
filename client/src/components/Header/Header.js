import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as log from 'loglevel'
import { MdChevronLeft } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

import './Header.sass';


class MenuTopBar extends Component {
  render() {
    return (
      <div className='MenuTopBar'>
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
