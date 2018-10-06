import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter, Route, Switch } from 'react-router-dom'
import * as log from 'loglevel'
import axios from '@/constructors/axios'
import Card from '@/components/Card'

import './CoinFeedPage.sass'

@withRouter
class CoinFeed extends Component {
  render() {
    return (
      <div>
        {this.props.coins.map(t => (
          <Card className="Coin">
            <div>coin!!</div>
          </Card>
        ))}
      </div>
    )
  }
}

@connect(
  state => ({

  })
)   
@withRouter
class CoinFeedPage extends Component {
  state = {
    tokens: [{}, {}, {}],
    coins: [{}, {}, {}],
  }

  async componentDidMount() {
    try {
      const { coins, tokens, error } = await axios.get('/api/v1/transfers')
      if (error) {
        log.error(error)
        return
      }
      this.setState(coins, tokens, error)
    } catch (e) {
      log.error(e)
    }
  }

  render() {
    const { dispatch, match } = this.props;
    document.title = 'WalletFeed - Coins'
    
    return (
      <div className="CoinFeedPage">
          <Route path={"/coins/all"} component={() => <CoinFeed type={'all'} coins={this.state.coins} />} />
          <Route path={"/coins/watchlist"} component={() => <CoinFeed type={'watchlist'} coins={this.state.coins} />} />
          <Route path={"/coins/me"} component={() => <CoinFeed type={'me'} coins={this.state.coins} />} />
      </div>
    )
  }
}

export default CoinFeedPage;
