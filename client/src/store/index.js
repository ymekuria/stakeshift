import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true,
  predicate: () => process.env.NODE_ENV === 'development'
});

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk, logger))
);

if (module.hot) {
  // Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
