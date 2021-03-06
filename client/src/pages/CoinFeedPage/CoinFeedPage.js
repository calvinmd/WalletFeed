import React, { Component } from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux'
import { Link, withRouter, Route, Switch } from 'react-router-dom'
import * as log from 'loglevel'
import { FaCoins, FaGamepad } from 'react-icons/fa'
import { MdArrowForward } from 'react-icons/md'
import RiseLoader from 'react-spinners/RiseLoader';
import {
  getTransfersForAddress,
} from '@/constructors/redux/actions/transfers'
import {
  getItem,
} from '@/constructors/localStorage'
import {
  truncateAddress,
} from '@/utils'
import Card from '@/components/Card'

import './CoinFeedPage.sass'


class CoinCard extends Component {
  state = {
    expanded: false,
  }

  render() {
    if (!this.props.coin) return null
    const { expanded } = this.state
    const {
      value,
      to,
      from,
      image,
      tokenSymbol,
      tokenName,
      tokenDecimal,
    } = this.props.coin
    return (
      <Card className={cx({ CoinCard: true, expanded })} onClick={() => this.setState({ expanded: !expanded })}>
        <img className="CoinCardImage" src={image} />
        <div className="CoinCardValues">
          <div className="CoinCardAmounts">
            <span>{value / (Math.pow(10, tokenDecimal))}</span>
            <span>{tokenSymbol}</span>
          </div>
          <div className="CoinCardName">
            <span>{tokenName}</span>
          </div>
          <div className="CoinCardAddresses">
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
class CoinFeed extends Component {
  constructor(props) {
    super(props)
    this.getAddressForType = this.getAddressForType.bind(this)
  }
  static defaultProps = {
    transfers: { coins: [] },
  }

  getAddressForType(type) {
    const { wallets, dispatch } = this.props
    const { watchlist, wallet } = wallets
    const ADDR_MAP = {
      all: '0xa9af3d88e5167ca6e9413cbb9b946ec95fe469ee',
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
    if (!transfers[type] || !transfers[type].coins || !transfers[type].coins.length) return <div>Nothing to see! Set your wallet...</div>
    return transfers[type].coins.map((coin, i) => <CoinCard coin={coin} key={i} />)
  }
}

@connect(
  state => ({
    wallets: state.wallets,
  })
)
@withRouter
class CoinFeedPage extends Component {
  state = {
    tokens: [],
    coins: [],
    error: null,
  }

  render() {
    const { match } = this.props;
    
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

export default CoinFeedPage;
