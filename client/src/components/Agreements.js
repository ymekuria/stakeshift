import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { setCurrentUser } from '../actions';
import withDrizzle from '../utils/withDrizzle';
import ApprovalDisplay from './ApprovalDisplay';

class Agreements extends Component {
  state = { dataKey: null };

  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;

    // connects drizzle to watch for changes on agreements method on smart contract and add to drizzleState
    const dataKey = await drizzle.contracts.StakeShift.methods.agreements.cacheCall(
      drizzleState.accounts[0]
    );

    this.setState({ dataKey });
  }

  renderAgreements = () => {
    const currentUserAddress = this.props.drizzleState.accounts[0];
    const { StakeShift } = this.props.drizzleState.contracts;
    // use the dataKey to get contract state from Drizzle
    const agreements = StakeShift.agreements[this.state.dataKey];
    if (agreements) {
      const { description, amount, isComplete } = agreements.value;

      this.props.setCurrentUser(currentUserAddress, agreements.value);

      return (
        <Segment>
          <Segment basic>{`descrpition ${description}`}</Segment>
          <Segment basic>
            <Segment basic>{`Agreement Amount ${amount}`}</Segment>
            <Segment basic>{`Status ${isComplete}`}</Segment>
            <ApprovalDisplay />
          </Segment>
        </Segment>
      );
    }
  };
  render() {
    return <Segment.Group>{this.renderAgreements()}</Segment.Group>;
  }
}

export default connect(
  null,
  { setCurrentUser }
)(withDrizzle(Agreements));
