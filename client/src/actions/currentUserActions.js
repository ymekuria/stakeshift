import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (currentUserAddress, agreements, history) => {
  // redirects user to create an agreement if they are niether the buyer or seller
  if (
    currentUserAddress !== (agreements && agreements.buyer) &&
    currentUserAddress !== (agreements && agreements.seller)
  ) {
    console.log('curentUserAddress redirect', currentUserAddress);
    console.log(' buyer', agreements && agreements.buyer);
    history.push('/create');
    return {
      type: SET_CURRENT_USER,
      payload: {
        currentUserAddress,
        currentUserParty: '',
        currentUserApproved: '',
        counterParty: '',
        counterPartyAddress: ''
      }
    };
  }
  console.log('currentUser setting');
  const currentUserParty =
    currentUserAddress === agreements.buyer ? 'buyer' : 'seller';

  const counterParty = currentUserParty === 'buyer' ? 'seller' : 'buyer';
  const counterPartyAddress = agreements[counterParty];

  const currentUserApproved = agreements[`${currentUserParty}Approved`];

  return {
    type: SET_CURRENT_USER,
    payload: {
      currentUserParty,
      currentUserAddress,
      currentUserApproved,
      counterParty,
      counterPartyAddress
    }
  };
};
