import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { DrizzleContext } from 'drizzle-react';
import App from './components/App';

// import drizzleOptions from './utils/drizzleOptions';

ReactDOM.render(
  <Provider drizzle={drizzleOptions}>
    <App />
  </Provider>,
  document.getElementById('root')
);
