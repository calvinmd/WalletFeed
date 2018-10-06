import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'

import SignupForm from '@/components/SignupForm';


class SignupPage extends Component {
  render() {
    const { history } = this.props;
    
    document.title = 'Example - Signup'
    
    return (
      <div>
        <SignupForm />
      </div>
    )
  }
}

export default withRouter(SignupPage);
