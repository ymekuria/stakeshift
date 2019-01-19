import { GET_CURRENT_USER } from './types';

export const getCurrentUser = agreement => {
  return { type: GET_CURRENT_USER, payload: agreement };
};
