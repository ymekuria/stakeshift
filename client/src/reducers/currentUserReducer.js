import { GET_CURRENT_USER } from './types';

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...action.payload };

    default:
      return state;
  }
};
