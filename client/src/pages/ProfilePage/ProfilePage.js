import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter, Route, Switch } from 'react-router-dom'

import './ProfilePage.sass'


@withRouter
class ProfilePage extends Component {
  render() {
    const { dispatch, match } = this.props;
    document.title = 'WalletFeed - Settings'
    
    return (
      <div className="ProfilePage">
        ProfilePage
      </div>
    )
  }
}

export default ProfilePage;
