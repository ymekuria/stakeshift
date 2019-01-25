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
      </div>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};
export default connect(mapStateToProps)(ApprovalDisplay);
