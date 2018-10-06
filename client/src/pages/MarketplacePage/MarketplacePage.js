import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter, Route, Switch } from 'react-router-dom'

import './MarketplacePage.sass'


@connect(
  state => ({

  })
)   
@withRouter
class MarketplacePage extends Component {
  render() {
    const { dispatch, match } = this.props;
    document.title = 'WalletFeed - Marketplace'
    
    return (
      <div className="MarketplacePage">
        MarketplacePage
        ... coming soon ...
      </div>
    )
  }
}

export default withRouter(MarketplacePage);
