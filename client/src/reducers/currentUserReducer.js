import { SET_CURRENT_USER } from '../actions/types';

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...action.payload };

    default:
      return state;
  }
};
