import React, { Component } from 'react';
import { Segment, Item, Button } from 'semantic-ui-react';
import withDrizzle from '../utils/withDrizzle';

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
  // amount: "5245423543523"
  // buyer: "0x79F9Bb6AbF20Df043a7cC0Ed2b299D06C08b0a6A"
  // buyerApproved: false
  // description: "gsdgdfsg"
  // isComplete: false
  // seller: "0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413"
  // sellerApproved: false

  renderAgreements = () => {
    const { StakeShift } = this.props.drizzleState.contracts;
    // use the dataKey to get contract state from Drizzle
    const agreements = StakeShift.agreements[this.state.dataKey];
    if (agreements) {
      const {
        description,
        amount,
        buyer,
        seller,
        buyerApproved,
        sellerApproved,
        isComplete
      } = agreements.value;
      return (
        <Segment.Group>
          <Segment>Top</Segment>
          <Segment>{`descrpition ${description}`}</Segment>
          <Segment.Group>
            <Segment>{`Agreement Amount ${amount}`}</Segment>
            <Segment>{`Status ${isComplete}`}</Segment>
            <Segment.Group horizontal>
              <Segment>{`Buyer ${buyer}`}</Segment>
              <Segment>{`Buyer Approved ${buyerApproved}`}</Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>{`Seller ${seller}`}</Segment>
              <Segment>{`Seller Approved ${sellerApproved}`}</Segment>
            </Segment.Group>
          </Segment.Group>
        </Segment.Group>
      );
    }
  };
  render() {
    // display values if they exist
    return <Segment.Group>{this.renderAgreements()}</Segment.Group>;
  }
}

export default withDrizzle(Agreements);
