import React, { Component } from 'react'
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import cx from 'classnames';
import { Link, withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from '@/constructors/axios'
import Card from '@/components/Card'
import { FaGamepad } from 'react-icons/fa'
import { MdArrowForward } from 'react-icons/md'
import RiseLoader from 'react-spinners/RiseLoader';
import {
  getTransfersForAddress,
} from '@/constructors/redux/actions/transfers'
import {
  truncateAddress,
} from '@/utils'

import './TokenFeedPage.sass'


class TokenCard extends Component {
  state = {
    expanded: false,
  }

  render() {
    if (!this.props.token) return null
    const {
      to,
      from,
      image,
      tokenSymbol,
      tokenName,
      tokenId,
      contractAddress,
    } = this.props.token
    console.log(JSON.stringify(this.props.token, null, 2))
    const { expanded } = this.state
    return (
      <Card className={cx({ TokenCard: true, expanded })} onClick={() => this.setState({ expanded: !expanded })}>
        {image ? <img className="TokenCardImage" src={image} /> : <FaGamepad style={{ fontSize: '40px', margin: '20px' }} />}
        <div className="TokenCardValues">
          <div className="TokenCardAmounts">
            <span>{tokenId}</span>
            <span>{tokenSymbol}</span>
          </div>
          <div className="TokenCardName">
            <span>{tokenName}</span>
          </div>
          <div className="TokenCardAddresses">
            <span>{truncateAddress(from)}</span>
            <MdArrowForward />
            <span>{truncateAddress(to)}</span>
          </div>
        </div>
      </Card>
    )
  }
}


@withRouter
@connect(
  state => ({
    wallets: state.wallets,
    transfers: state.transfers,
  })
)
class TokenFeed extends Component {
  constructor(props) {
    super(props)
    this.getAddressForType = this.getAddressForType.bind(this)
  }
  static defaultProps = {
    transfers: { tokens: [] },
  }

  getAddressForType(type) {
    const { wallets, dispatch } = this.props
    const { watchlist, wallet } = wallets
    const ADDR_MAP = {
      all: '',
      watchlist,
      me: wallet,
    }
    return ADDR_MAP[type]
  }

  async componentDidMount() {
    const { type, dispatch } = this.props
    await dispatch(await getTransfersForAddress(this.getAddressForType(type), type))
  }

  loader() {
    return (
      <div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <RiseLoader color={'rgb(40,156,244)'} />
      </div>
    )
  }

  render() {
    const { wallets, transfers, type } = this.props
    const { watchlist, wallet } = wallets
    if (transfers.loading) return this.loader()
    if (!transfers[type] || !transfers[type].tokens || !transfers[type].tokens.length) return <div>Nothing to see! Set your wallet...</div>
    return transfers[type].tokens.map((token, i) => <TokenCard token={token} key={i} />)
  }
}

@withRouter
@connect(
  state => ({
    wallets: state.wallets,
  })
)
class TokenFeedPage extends Component {
  render() {
    const { history } = this.props;
    
    document.title = 'WalletFeed - Tokens'

    return (
      <div className="TokenFeedPage">
          <Route path={"/tokens/all"} component={() => (
            <TokenFeed type={'all'} />
          )
        } />
          <Route path={"/tokens/watchlist"} component={() => (
            <TokenFeed type={'watchlist'} />
          )
        } />
          <Route path={"/tokens/me"} component={() => (
            <TokenFeed type={'me'} />
          )
        } />
      </div>
    )
  }
}

export default TokenFeedPage;
