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
          <Segment>{`descrpition ${description}`}</Segment>
          <Segment>
            <Segment>{`Agreement Amount ${amount}`}</Segment>
            <Segment>{`Status ${isComplete}`}</Segment>
            {this.renderApprovalButtons(
              buyer,
              buyerApproved,
              seller,
              sellerApproved
            )}
          </Segment>
        </Segment.Group>
      );
    }
  };

  renderApprovalButtons = (buyer, buyerApproved, seller, sellerApproved) => {
    const currentUser = this.props.drizzleState.accounts[0];

    if (currentUser === buyer) {
      return (
        <div>
          <Segment>
            <Segment>{`Buyer ${buyer}`}</Segment>
            <Segment>
              {buyerApproved ? 'You Approved' : 'Approve Agreement'}
            </Segment>
          </Segment>
          <Segment>
            <Segment horizontal>{`Seller ${seller}`}</Segment>
            <Segment horizontal>
              {sellerApproved
                ? 'Seller Approved'
                : 'Waiting on Seller Approval'}
            </Segment>
          </Segment>
        </div>
      );
    }
    return (
      <div>
        <Segment>
          <Segment>{`Buyer ${buyer}`}</Segment>
          <Segment>{`buyerApproved ${buyerApproved}`}</Segment>
        </Segment>
        <Segment>
          <Segment horizontal>{`Seller ${seller}`}</Segment>
          <Segment horizontal>{`Seller Approved ${sellerApproved}`}</Segment>
        </Segment>
      </div>
    );
  };
  render() {
    // display values if they exist
    return <Segment.Group>{this.renderAgreements()}</Segment.Group>;
  }
}

export default withDrizzle(Agreements);
