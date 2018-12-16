import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DrizzleContext } from 'drizzle-react';
import App from './components/App';
import store from './store';
import drizzleOptions from './utils/drizzleOptions';

ReactDOM.render(
  <Provider store={store}>
    <DrizzleContext.Provider drizzle={drizzleOptions}>
      <App />
    </DrizzleContext.Provider>
  </Provider>,
  document.getElementById('root')
);
