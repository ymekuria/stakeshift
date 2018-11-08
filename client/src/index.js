import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleContext } from 'drizzle-react';
import App from './components/App';
// import { Drizzle, generateStore } from 'drizzle';
import drizzleOptions from './utils/drizzleOptions';
// console.log('stakeShift: ', StakeShift);
// const options = {
//   contracts: [StakeShift]
// };

// const drizzleStore = generateStore(options);
// const drizzle = new Drizzle(options, drizzleStore);

// console.log('drizzle: ', drizzleOptions);
ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzleOptions}>
    <App />
  </DrizzleContext.Provider>,
  document.getElementById('root')
);
ReactDOM.render(<App />, document.getElementById('root'));
// import { Drizzle, generateStore } from 'drizzle';
// import StakeShift from './ethereum/build/StakeShift.json';

// console.log('stakeShift: ', StakeShift);
// const options = {
//   contracts: [StakeShift]
// };

// const drizzleStore = generateStore(options);
// const drizzle = new Drizzle(options, drizzleStore);

// export default drizzle;
