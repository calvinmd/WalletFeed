import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'

import LoginForm from '@/components/LoginForm'


class LoginPage extends Component {
  render() {
    const { classes } = this.props;
    
    document.title = 'Example - Login'
    
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
}

export default withRouter(LoginPage);