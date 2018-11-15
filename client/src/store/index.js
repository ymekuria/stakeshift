import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
  predicate: () => process.env.NODE_ENV === 'development'
});

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk, logger))
);

export default store;
