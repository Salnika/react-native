import { combineReducers } from 'redux';
import login from './login';
import nav from './nav';

export default combineReducers({
  login,
  nav,
});
