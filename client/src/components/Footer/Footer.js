import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as log from 'loglevel'
import cx from 'classnames'
import { withRouter } from 'react-router'
import { FaCoins, FaPuzzlePiece, FaGamepad } from 'react-icons/fa'
import { MdSwapHoriz, MdSettings, MdMoreHoriz } from 'react-icons/md'

import './Footer.sass';


class FooterMenuButton extends Component {
  render() {
    return (
      <div
        className={cx({
          FooterMenuButton: true,
          active: this.props.active,
        })}
        onClick={this.props.onClick || (() => {})}
      >
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
        <FooterMenuButton active={history.location.pathname.startsWith('/coins')} onClick={() => history.push('/coins/watchlist')}>
          <FaCoins />
        </FooterMenuButton>
        <FooterMenuButton active={history.location.pathname.startsWith('/tokens')} onClick={() => history.push('/tokens/watchlist')}>
          <FaGamepad style={{ fontSize: '32px' }} />
        </FooterMenuButton>
        <FooterMenuButton active={history.location.pathname.startsWith('/marketplace')} onClick={() => history.push('/marketplace')}>
          <MdSwapHoriz style={{ fontSize: '32px' }} />
        </FooterMenuButton>
        <FooterMenuButton active={history.location.pathname.startsWith('/settings')} onClick={() => history.push('/settings')}>
          <MdSettings style={{ fontSize: '26px' }} />
        </FooterMenuButton>
      </footer>
    );
  }
}

export default Footer;
