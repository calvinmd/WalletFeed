import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'

import './CoinFeedPage.sass'

class CoinFeedPage extends Component {
  render() {
    const { history } = this.props;
    
    document.title = 'WalletWatcher - Coins'
    
    return (
      <div className="CoinFeedPage">
        <h1 className="title">My Coin Feed</h1>
      </div>
    )
  }
}

export default withRouter(CoinFeedPage);
