import React, { Component } from 'react';
import withDrizzle from '../utils/withDrizzle';

class Agreements extends Component {
  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;

    const contract = drizzle.contracts.StakeShift;

    const agreements = await contract.methods
      .agreements(drizzleState.accounts[0])
      .call();
    console.log('agreements ', agreements);
  }
  render() {
    return <div>Agreements</div>;
  }
}

export default withDrizzle(Agreements);
