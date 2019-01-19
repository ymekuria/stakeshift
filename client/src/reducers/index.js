import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUserReducer from './currentUserReducer';

export default combineReducers({
  test: [],
  form: formReducer
});
