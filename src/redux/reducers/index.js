import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import nav from './nav';
import barcode from './barcode';
import profile from './profile';

export default combineReducers({
  login,
  register,
  nav,
  barcode,
  profile,
});
