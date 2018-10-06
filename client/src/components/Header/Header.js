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
@connect(
  state => ({
    router: state.router,
  })
)
class MenuTopBar extends Component {
  render() {
    const { router: { location: { pathname } }, dispatch, history } = this.props;
    return (
      <div className='MenuTopBar'>
        <Route path="/coins" render={props => (
          <>
            <MenuTopBarButton active={history.location.pathname === '/coins/all'} onClick={() => history.push('/coins/all')}>All</MenuTopBarButton>
            <MenuTopBarButton active={history.location.pathname === '/coins/watchlist'} onClick={() => history.push('/coins/watchlist')}>Watchlist</MenuTopBarButton>
            <MenuTopBarButton active={history.location.pathname === '/coins/me'} onClick={() => history.push('/coins/me')}>Me</MenuTopBarButton>
          </>
        )} />
        <Route path="/tokens" render={props => (
          <>
            <MenuTopBarButton active={history.location.pathname === '/tokens/all'} onClick={() => history.push('/tokens/all')}>All</MenuTopBarButton>
            <MenuTopBarButton active={history.location.pathname === '/tokens/watchlist'} onClick={() => history.push('/tokens/watchlist')}>Watchlist</MenuTopBarButton>
            <MenuTopBarButton active={history.location.pathname === '/tokens/me'} onClick={() => history.push('/tokens/me')}>Me</MenuTopBarButton>
          </>
        )} />
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
