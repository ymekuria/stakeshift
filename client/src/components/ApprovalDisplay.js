import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ApprovalDisplay extends Component {
  renderApprovalButton = (currentUserParty, currentUserApproved) => {
    if (currentUserApproved) {
      return <Segment>You Have Approved</Segment>;
    }
    return (
      <button>
        <i className="yellow large plus icon" />
        `${currentUserParty.toUpperCase()} APPROVE`
      </button>
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
