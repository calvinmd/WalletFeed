import React, { Component } from 'react'
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import { Link, withRouter, Route } from 'react-router-dom'
import axios from '@/constructors/axios'
import Card from '@/components/Card'

import './TokenFeedPage.sass'


class TokenFeed extends Component {
  render() {
    return (
      <div>
        {this.props.tokens.map(t => (
          <Card className="Token">
            <div>token!!</div>
          </Card>
        ))}
      </div>
    )
  }
}

@withRouter
class TokenFeedPage extends Component {

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
    const { history } = this.props;
    
    document.title = 'WalletFeed - Coins'
    
    return (
      <div className="TokenFeedPage">
          <Route path={"/tokens/all"} component={() => (
            <TokenFeed type={'all'} tokens={this.state.tokens} />
          )
        } />
          <Route path={"/tokens/watchlist"} component={() => (
            <TokenFeed type={'watchlist'} tokens={this.state.tokens} />
          )
        } />
          <Route path={"/tokens/me"} component={() => (
            <TokenFeed type={'me'} tokens={this.state.tokens} />
          )
        } />
      </div>
    )
  }
}

export default TokenFeedPage;
