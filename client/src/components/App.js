import React, { Component } from 'react';
import StakeShift from '../utils/ethereum/stakeShift';

class App extends Component {
  async componentDidMount() {
    const stakeShift = await StakeShift(
      '0xa53b887a9dbdc3bf75ce0bbf1fcd74158a1a1277'
    );
    console.log('stakeShift: ', stakeShift);
    console.log('test');
  }
  render() {
    return <div>Hello World</div>;
  }
}

export default App;
