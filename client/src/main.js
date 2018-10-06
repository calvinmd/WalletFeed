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

import { ConnectedRouter } from 'connected-react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import '@/style.sass'

import createReduxStore from '@/constructors/redux/store'
import loglevel from '@/constructors/loglevel'
import history from '@/constructors/history'

import CoinFeedPage from '@/pages/CoinFeedPage'
import TokenFeedPage from '@/pages/TokenFeedPage'
import MarketplacePage from '@/pages/MarketplacePage'
import SettingsPage from '@/pages/SettingsPage'
import ProfilePage from '@/pages/ProfilePage'

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

const store = createReduxStore();


class App extends React.Component {
  constructor(props) {
    super(props)
    history.listen((location, action) => {
      log.info('Routing to location: ', location);
      this.forceUpdate() // TODO fix
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Layout>
            <Route exact path="/" component={CoinFeedPage} />
            <Route path="/coins" component={CoinFeedPage} />
            <Route path="/tokens" component={TokenFeedPage} />
            <Route path="/marketplace" component={MarketplacePage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/profile" component={ProfilePage} />
          </Layout>
        </Router>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('app'))
