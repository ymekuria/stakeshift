import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (
  currentUserAddress,
  agreements,
  history
) => async dispatch => {
  if (
    currentUserAddress !== agreements.buyer &&
    currentUserAddress !== agreements.seller
  ) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: {
        currentUserParty: 'NA',
        currentUserAddress: 'NA',
        currentUserApproved: 'NA',
        counterParty: 'NA',
        counterPartyAddress: 'NA'
      }
    });
    history.push('/create');
  }
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
