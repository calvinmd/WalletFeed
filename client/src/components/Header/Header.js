import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as log from 'loglevel'

import Logo from '@/components/Logo'

import './Header.sass';


class Header extends Component {
  render() {
    return (
      <header className="Header">
        <Logo />
      </header>
    );
  }
}

export default Header;
