import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from '@/constructors/redux/reducers';
import history from '@/constructors/history'

export default function createReduxStore() {
  return createStore(
    connectRouter(history)(rootReducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
}
