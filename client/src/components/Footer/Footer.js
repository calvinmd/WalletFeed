import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as log from 'loglevel'
import { withRouter } from 'react-router'
import { FaCoins, FaPuzzlePiece, FaGamepad } from 'react-icons/fa'
import { MdSwapHoriz, MdSettings, MdMoreHoriz } from 'react-icons/md'

import './Footer.sass';


class FooterMenuButton extends Component {
  render() {
    return (
      <div className='FooterMenuButton' onClick={this.props.onClick || (() => {})}>
        {this.props.children}
      </div>
    );
  }
}

@withRouter
class Footer extends Component {
  render() {
    const { history, match } = this.props
    return (
      <footer className="Footer">
        <FooterMenuButton onClick={() => history.push('/coins/watchlist')}>
          <FaCoins />
        </FooterMenuButton>
        <FooterMenuButton onClick={() => history.push('/tokens/watchlist')}>
          <FaGamepad />
        </FooterMenuButton>
        <FooterMenuButton onClick={() => history.push('/marketplace')}>
          <MdSwapHoriz />
        </FooterMenuButton>
        <FooterMenuButton onClick={() => history.push('/settings')}>
          <MdSettings />
        </FooterMenuButton>
        <FooterMenuButton onClick={() => history.push('/settings/more')}>
          <MdMoreHoriz />
        </FooterMenuButton>
      </footer>
    );
  }
}

export default Footer;
