import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom'

import Header from '@/components/Header'

@connect(
  state => ({
    layout: state.layout,
  })
)
@withRouter
class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default Layout;
