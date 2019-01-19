import React, { Component } from 'react';
import { Segment, Button, Item } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ApprovalDisplay extends Component {
  renderApprovalButton = currentUserParty => {
    const approved = this.props.agreements[`${currentUserParty}Approved`];
    if (approved) {
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
    console.log('props', this.props);
    const { currentUserParty, counterParty, currentUserAddress } = this.props;
    const counterPartyAddress = this.props.agreements[counterParty];
    return (
      <div>
        <Segment>
          <Segment>
            <Segment
              basic
            >{`${currentUserParty.toUpperCase()}     ${currentUserAddress}`}</Segment>
            <Segment basic={true}>
              {this.renderApprovalButton(currentUserParty)}{' '}
            </Segment>
          </Segment>
          <Segment>
            <Segment
              basic
            >{`${counterParty.toUpperCase()}      ${counterPartyAddress}`}</Segment>
            <Segment
              basic
              color="green"
            >{`PENDING ${counterParty.toUpperCase()} APPVOVAL`}</Segment>
          </Segment>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return { state };
};
export default connect(mapStateToProps)(ApprovalDisplay);
