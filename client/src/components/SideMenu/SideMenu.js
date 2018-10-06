import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as log from 'loglevel'
import cx from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './SideMenu.sass';


const SideMenuOption = withRouter(({ children, to, history }) => {
  return (
    <div onClick={() => { if (to) history.push(to) }} className="SideMenuOption">
      {children}
    </div>
  );
});


class SideMenu extends Component {
  dom = {
    nav: null,
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick.bind(this), false)
  }
  componentDidUnount() {
    document.removeEventListener('mousedown', this.handleClick.bind(this), false)
  }
  handleClick(e) {
    if (this.props.layout.menuOpen && !this.dom.nav.contains(e.target)) {
      setTimeout(() => {
        if (this.props.layout.menuOpen) {
          this.props.dispatch({ type: 'SET_MENU_STATE', payload: false })
        }
      }, 300)
    }
  }
  render() {
    return (
      <nav className={cx({ SideMenu: true, show: this.props.show })} ref={(component) => (this.dom.nav = component)}>
        <SideMenuOption to={'/'}>Home</SideMenuOption>
        <SideMenuOption to={'/mission'}>Mission</SideMenuOption>
        <SideMenuOption to={'/advertise'}>Advertise</SideMenuOption>
        <SideMenuOption to={'/legal'}>Legal</SideMenuOption>
        <SideMenuOption to={'/terms'}>Terms</SideMenuOption>
        <SideMenuOption to={'/privacy'}>Privacy</SideMenuOption>
        <SideMenuOption to={'/copywrite'}>Copywrite</SideMenuOption>
      </nav>
    );
  }
}

export default connect(
  state => ({
    layout: state.layout,
  })
)(withRouter(SideMenu));
