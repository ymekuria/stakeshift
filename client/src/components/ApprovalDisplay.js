import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';

class ApprovalDisplay extends Component {
  render() {
    return (
      <Segment.Group horizontal>
        <Segment basic={true}>
          <Button
            primary
            icon="add circle"
            content={`${this.props.currentUserParty} Approve`}
          />
        </Segment>
        <Segment color="green">{`Pending ${
          this.props.counterParty
        } Approval`}</Segment>
      </Segment.Group>
    );
  }
}
export default ApprovalDisplay;
