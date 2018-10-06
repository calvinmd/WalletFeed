import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'

import './HomePage.sass'

class HomePage extends Component {
  render() {
    const { history } = this.props;
    
    document.title = 'Example - Signup'
    
    return (
      <div className="HomePage">
        <h1 className="title">Home Page</h1>
      </div>
    )
  }
}

export default withRouter(HomePage);
