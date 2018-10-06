import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from '@/constructors/axios'
import * as log from 'loglevel'

import { Link, withRouter } from 'react-router-dom'


class SignupForm extends Component {
  state = {
    email: '',
    password: '',
  }

  signUp() {
    const { classes, history } = this.props;
    const { email, password } = this.state;
    console.log('sign up');
    // axios.post('/users', { email }).then((user) => {
    //   history.push('/')
    // });
  }

  render() {
    return (
      <div>
        Email
        <input
          type="text"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br />
        Password
        <input
          type="password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button
          children={"Sign Up"}
          onClick={() => this.signUp()}
        />
        <br />
        <Link to="/login">Need to Login?</Link>
      </div>
    );
  }
}

export default withRouter(SignupForm);
