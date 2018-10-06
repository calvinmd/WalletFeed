/*
 * Client (Web) - Entrypoint, Bootstrap
**/


import 'normalize.css'

import React from 'react'
import * as log from 'loglevel'

import {
  Router,
  Link,
  Redirect,
  Route,
} from 'react-router-dom'

import { render } from 'react-dom'
import { Provider } from 'react-redux'

import '@/style.sass'

import createReduxStore from '@/constructors/redux/store'
import loglevel from '@/constructors/loglevel'
import history from '@/constructors/history'

import CoinFeedPage from '@/pages/CoinFeedPage'
import TokenFeedPage from '@/pages/TokenFeedPage'

import Layout from '@/components/Layout'

log.info(`Bootstrapping Client (Web) app...`)

loglevel()


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => {
//     const authenticated = true;  /* TODO - auth */
//     return (authenticated) ? <Component {...props} {...rest} /> : <Redirect to='/login' />
//     }}
//   />
// );


function App() {
  const store = createReduxStore();
  history.listen((location, action) => {
    log.info('Routing to location: ', location);
  });
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout>
          <Route exact path="/coins" component={CoinFeedPage} />
          <Route path="/tokens" component={TokenFeedPage} />
        </Layout>
      </Router>
    </Provider>
  )
}

render(<App />, document.getElementById('app'))
