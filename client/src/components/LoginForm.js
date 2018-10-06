import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from '@/constructors/axios'
import * as log from 'loglevel'

import { Link, withRouter } from 'react-router-dom'


class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  logIn() {
    const { email, password } = this.state;
    console.log('do something with email and password');
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        Email
        <input
          type="text"
          margin="normal"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br />
        Password
        <input
          type="password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button
          children={"Log In"}
          onClick={() => this.logIn()}
        />
        <br />
        <Link to="/signup">Want to Sign up?</Link>
      </div>
    );
  }
}

export default withRouter(LoginForm);
