import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter, Route, Switch } from 'react-router-dom'

import './MarketplacePage.sass'


@connect(
  state => ({
    router: state.router,
  })
)   
@withRouter
class MarketplacePage extends Component {
  render() {
    const { router: { location: { pathname } }, dispatch, match } = this.props;
    document.title = 'WalletFeed - Marketplace'
    
    return (
      <div className="MarketplacePage">
        MarketplacePage
      </div>
    )
  }
}

export default withRouter(MarketplacePage);
