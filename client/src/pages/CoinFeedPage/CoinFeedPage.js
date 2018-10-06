import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter, Route, Switch } from 'react-router-dom'

import './CoinFeedPage.sass'

@withRouter
class CoinFeed extends Component {
  render() {
    return (
      <div>coins {this.props.type}</div>
    )
  }
}

@connect(
  state => ({
    router: state.router,
  })
)   
@withRouter
class CoinFeedPage extends Component {
  render() {
    const { router: { location: { pathname } }, dispatch, match } = this.props;
    console.log('pathname', pathname, match.url)
    document.title = 'WalletFeed - Coins'
    
    return (
      <div className="CoinFeedPage">
          <Route path={"/coins/all"} component={() => <CoinFeed type={'all'} />} />
          <Route path={"/coins/watchlist"} component={() => <CoinFeed type={'watchlist'} />} />
          <Route path={"/coins/me"} component={() => <CoinFeed type={'me'} />} />
      </div>
    )
  }
}

export default withRouter(CoinFeedPage);
