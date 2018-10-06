import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter, Route, Switch } from 'react-router-dom'

import './SettingsPage.sass'


@withRouter
class SettingsPage extends Component {
  render() {
    const { dispatch, match } = this.props;
    document.title = 'WalletFeed - Settings'
    
    return (
      <div className="SettingsPage">
        SettingsPage
      </div>
    )
  }
}

export default SettingsPage;
