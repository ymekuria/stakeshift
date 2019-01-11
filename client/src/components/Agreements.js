import React, { Component } from 'react';
import withDrizzle from '../utils/withDrizzle';

class Agreements extends Component {
  state = { dataKey: null };
  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;

    // connects drizzle to watch for changes on agreements method on smart contract and add to drizzleState
    const dataKey = drizzle.contracts.StakeShift.methods.agreements.cacheCall(
      drizzleState.accounts[0]
    );

    this.setState({ dataKey });
  }

  render() {
    const { StakeShift } = this.props.drizzleState.contracts;
    // use the data keyto get contract state from Drizzle
    const agreements = StakeShift.agreements[this.state.dataKey];
    // display values if they exist
    return <div>Agreements{agreements && agreements.value.description}</div>;
  }
}

export default withDrizzle(Agreements);
