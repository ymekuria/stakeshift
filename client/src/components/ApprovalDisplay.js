import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import withDrizzle from '../utils/withDrizzle';

class ApprovalDisplay extends Component {
  onApproveButtonPress = async () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.StakeShift;
    const { currentUserParty, counterPartyAddress } = this.props.currentUser;

    if (currentUserParty === 'seller') {
      await contract.methods.sellerApprove.cacheSend(counterPartyAddress, {
        from: drizzleState.accounts[0]
      });
    } else {
      await contract.methods.buyerApprove.cacheSend({
        from: drizzleState.accounts[0]
      });
    }
  };

  onCancelButtonPress = async () => {};

  renderApprovalButton = (currentUserParty, currentUserApproved) => {
    if (currentUserApproved) {
      return <Segment>You Have Approved</Segment>;
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Button
          color="teal"
          icon="add circle"
          content={`${currentUserParty.toUpperCase()} APPROVE`}
          onClick={this.onApproveButtonPress}
        />
        <Button
          color="red"
          icon="minus circle"
          content={'CANCEL AGREEMENT'}
          onClick={this.onCancelButtonPress}
        />
      </div>
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

export default connect(mapStateToProps)(withDrizzle(ApprovalDisplay));
