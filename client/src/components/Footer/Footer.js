import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as log from 'loglevel'
import { FaCoins, FaPuzzlePiece, FaGamepad } from 'react-icons/fa'
import { MdSwapHoriz, MdSettings, MdMoreHoriz } from 'react-icons/md'

import './Footer.sass';


class FooterMenuButton extends Component {
  render() {
    return (
      <div className='FooterMenuButton'>
        {this.props.children}
      </div>
    );
  }
}


class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <FooterMenuButton onClick={() => console.log('onclick')}>
          <FaCoins />
        </FooterMenuButton>
        <FooterMenuButton onClick={() => console.log('onclick')}>
          <FaGamepad />
        </FooterMenuButton>
        <FooterMenuButton onClick={() => console.log('onclick')}>
          <MdSwapHoriz />
        </FooterMenuButton>
        <FooterMenuButton onClick={() => console.log('onclick')}>
          <MdSettings />
        </FooterMenuButton>
        <FooterMenuButton onClick={() => console.log('onclick')}>
          <MdMoreHoriz />
        </FooterMenuButton>
      </footer>
    );
  }
}

export default Footer;
