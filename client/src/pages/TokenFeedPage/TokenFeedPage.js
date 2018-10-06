import React, { Component } from 'react'
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import { Link, withRouter, Route } from 'react-router-dom'
import axios from '@/constructors/axios'
import Card from '@/components/Card'
import {
  getTransfersForAddress,
} from '@/constructors/redux/actions/transfers'

import './TokenFeedPage.sass'


class TokenFeed extends Component {
  render() {
    return (
      <div>
        {this.props.tokens.map((t, i) => (
          <Card className="Token" key={i}>
            <div>
              token!!
              <pre>
                {JSON.stringify(t)}
              </pre>
            </div>
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
      const address = '0x4baa512a919ba56cc4da7a1274e75e7183267bbe'
      const { coins, tokens, error } = await getTransfersForAddress(address)
      console.log(coins, tokens, error);
      if (error) {
        log.error(error)
        return
      }
      this.setState({ coins, tokens, error })
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
