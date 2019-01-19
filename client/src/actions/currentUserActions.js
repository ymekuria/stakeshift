import { GET_CURRENT_USER } from './types';

export const getCurrentUser = (currentUserAddress, agreements) => {
  const currentUserParty = currentUserAddress === buyer ? 'buyer' : 'seller';

  const counterParty = currentUserParty === 'buyer' ? 'seller' : 'buyer';
  const counterPartyAddress = agreements[counterParty];

  const currentUserApproved = agreements[`${currentUserParty}Approved`];

  return {
    type: GET_CURRENT_USER,
    payload: {
      currentUserParty,
      currentUserAddress,
      currentUserApproved,
      counterParty,
      counterPartyAddress
    }
  };
};
