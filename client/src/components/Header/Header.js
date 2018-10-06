import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as log from 'loglevel'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
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


@withRouter
class MenuTopBar extends Component {
  render() {
    const { dispatch, history } = this.props;
    const { location } = history
    const { pathname } = location
    if (!(pathname.startsWith('/coins') || pathname.startsWith('/tokens'))) return (
      <div className='MenuTopBar'>WalletFeed</div>
    );
    return (
      <div className='MenuTopBar'>
        <Route path="/coins" render={props => (
          <>
            <MenuTopBarButton active={pathname === '/coins/all'} onClick={() => history.push('/coins/all')}>All</MenuTopBarButton>
            <MenuTopBarButton active={pathname === '/coins/watchlist'} onClick={() => history.push('/coins/watchlist')}>Watchlist</MenuTopBarButton>
            <MenuTopBarButton active={pathname === '/coins/me'} onClick={() => history.push('/coins/me')}>Me</MenuTopBarButton>
          </>
        )} />
        <Route path="/tokens" render={props => (
          <>
            <MenuTopBarButton active={pathname === '/tokens/all'} onClick={() => history.push('/tokens/all')}>All</MenuTopBarButton>
            <MenuTopBarButton active={pathname === '/tokens/watchlist'} onClick={() => history.push('/tokens/watchlist')}>Watchlist</MenuTopBarButton>
            <MenuTopBarButton active={pathname === '/tokens/me'} onClick={() => history.push('/tokens/me')}>Me</MenuTopBarButton>
          </>
        )} />
      </div>
    );
  }
}

@withRouter
class Header extends Component {
  render() {
    return (
      <header className="Header">
        <MdChevronLeft className="icon-left" onClick={() => this.props.history.goBack()}/>
        <MenuTopBar />
        <FaUser className="icon-right" onClick={() => this.props.history.push('/profile')} />
      </header>
    );
  }
}

export default Header;
