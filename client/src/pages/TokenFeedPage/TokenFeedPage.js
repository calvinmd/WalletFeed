import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'

import './TokenFeedPage.sass'

class TokenFeedPage extends Component {
  render() {
    const { history } = this.props;
    
    document.title = 'WalletWatcher - Tokens'
    
    return (
      <div className="TokenFeedPage">
        <h1 className="title">My Coin Feed</h1>
      </div>
    )
  }
}

export default withRouter(TokenFeedPage);
