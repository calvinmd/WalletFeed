import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Link, withRouter, Route } from 'react-router-dom'

import './TokenFeedPage.sass'


class TokenFeed extends Component {
  render() {
    return (
      <div>tokens {this.props.type}</div>
    )
  }
}


class TokenFeedPage extends Component {
  render() {
    const { history } = this.props;
    
    document.title = 'WalletFeed - Coins'
    
    return (
      <div className="TokenFeedPage">
          <Route path={"/tokens/all"} component={() => <TokenFeed type={'all'} />} />
          <Route path={"/tokens/watchlist"} component={() => <TokenFeed type={'watchlist'} />} />
          <Route path={"/tokens/me"} component={() => <TokenFeed type={'me'} />} />
      </div>
    )
  }
}

export default withRouter(TokenFeedPage);
