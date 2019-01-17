import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

const ApprovalDisplay = props => {
  console.log(props);
  return (
    <Segment.Group horizontal>
      <Segment basic={true}>
        <Button
          primary
          icon="add circle"
          content={`${props.currentUserParty} Approve`}
        />
      </Segment>
      <Segment color="green">{`Pending ${
        props.counterParty
      } Approval`}</Segment>
    </Segment.Group>
  );
};

export default ApprovalDisplay;
