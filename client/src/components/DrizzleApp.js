import React, { Component } from 'react';

class DrizzleApp extends Component {
  state = { dataKey: null };
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.StakeShift;
    // const dataKey = contract.methods[]
  }
  render() {
    return <div>Test</div>;
  }
}

export default DrizzleApp;
