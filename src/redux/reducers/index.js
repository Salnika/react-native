import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import nav from './nav';

export default combineReducers({
  login,
  register,
  nav,
});
