import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ApprovalDisplay extends Component {
  renderApprovalButton = (currentUserParty, currentUserApproved) => {
    if (currentUserApproved) {
      return <Segment>You Have Approved</Segment>;
    }
    return (
      <Button
        primary
        icon="add circle"
        content={`${currentUserParty.toUpperCase()} APPROVE`}
      />
    );
  };
  render() {
    // console.log('props', this.props); counterParty: "seller"
    // counterPartyAddress: "0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413"
    // currentUserAddress: "0x79F9Bb6AbF20Df043a7cC0Ed2b299D06C08b0a6A"
    // currentUserApproved: false
    // currentUserParty: "buyer"
    const {
      currentUserParty,
      currentUserApproved,
      currentUserAddress,
      counterParty,
      counterPartyAddress
    } = this.props.currentUser;
    return (
      <div>
        <Segment>
          <Segment>
            <Segment
              basic
            >{`${currentUserParty.toUpperCase()}     ${currentUserAddress}`}</Segment>
            <Segment basic={true}>
              {this.renderApprovalButton(currentUserParty, currentUserApproved)}
            </Segment>
          </Segment>
          <Segment>
            <Segment
              basic
            >{`${counterParty.toUpperCase()}      ${counterPartyAddress}`}</Segment>
            <Segment
              basic
            >{`PENDING ${counterParty.toUpperCase()} APPVOVAL`}</Segment>
          </Segment>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};
export default connect(mapStateToProps)(ApprovalDisplay);
