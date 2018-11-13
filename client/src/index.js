import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleContext } from 'drizzle-react';
import App from './components/App';
import drizzleOptions from './utils/drizzleOptions';

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzleOptions}>
    <App />
  </DrizzleContext.Provider>,
  document.getElementById('root')
);
