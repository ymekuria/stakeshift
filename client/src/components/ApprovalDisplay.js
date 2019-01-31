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
        color="teal"
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

    const { partyContainer, partyText } = styles;
    return (
      <div>
        <Segment>
          <Segment basic>
            <div style={partyContainer}>
              <div style={partyText}>{currentUserParty.toUpperCase()}</div>
              <div style={partyText}>{currentUserAddress}</div>
            </div>
          </Segment>
          <Segment basic={true}>
            {this.renderApprovalButton(currentUserParty, currentUserApproved)}
          </Segment>
        </Segment>
        <Segment>
          <Segment basic>
            <div style={partyContainer}>
              <div style={partyText}>{counterParty.toUpperCase()}</div>
              <div style={partyText}>{counterPartyAddress}</div>
            </div>
          </Segment>
          <Segment basic>
            <div style={partyText}>
              {`PENDING ${counterParty.toUpperCase()} APPVOVAL`}
            </div>
          </Segment>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

const styles = {
  partyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  partyText: { padding: '10px', fontSize: '20px' }
};
export default connect(mapStateToProps)(ApprovalDisplay);
