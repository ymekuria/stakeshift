import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

const renderApprovalButton = (
  currentUser,
  buyer,
  seller,
  buyerApproved,
  sellerApproved
) => {
  if (currentUser === buyer) {
    if (buyerApproved) {
      return 'You Have Approved';
    } else {
      return <Button primary icon="add circle" content="Approve" />;
    }
  } else {
    if (sellerApproved) {
      return 'You Have Approved';
    } else {
      return <Button primary icon="add circle" content="Approve" />;
    }
  }
};

const ApprovalDisplay = ({
  currentUser,
  buyer,
  seller,
  buyerApproved,
  sellerApproved
}) => {
  return (
    <Segment>
      {renderApprovalButton(
        currentUser,
        buyer,
        seller,
        buyerApproved,
        sellerApproved
      )}
    </Segment>
  );
};

export default ApprovalDisplay;
