import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import cx from 'classnames'
import { Link, withRouter, Route, Switch } from 'react-router-dom'
import {
  getItem,
  setItem,
} from '@/constructors/localStorage'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Input from '@/components/Input'

import './ProfilePage.sass'


@withRouter
class ProfilePage extends Component {
  dom = {
    walletsInput: null,
    watchlist: null,
  }

  render() {
    const { dispatch, match } = this.props;
    document.title = 'WalletFeed - Settings'
    
    return (
      <div className="ProfilePage">
        <h1 style={{ padding: '15px', marginBottom: '5px' }}>My Profile</h1>
        <Card>
          <Input type="text" label="Wallet" ref={c => (this.dom.wallets = c)} defaultValue={getItem('wallets')} />
          <Input type="text" label="Watchlist" ref={c => (this.dom.watchlist = c)} defaultValue={getItem('watchlist')} />
          <Button onClick={() => {
            setItem('wallets', this.dom.wallets.getValue())
            setItem('watchlist', this.dom.watchlist.getValue())
          }}>Update</Button>
        </Card>
      </div>
    )
  }
}

export default ProfilePage;
