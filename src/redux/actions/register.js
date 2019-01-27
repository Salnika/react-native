import axios from 'axios';
import * as ActionTypes from '../actionsTypes/register';

const apiUrl = 'http://api.food-o.eu/auth/register';

export const registerSuccess = ({ token }) => ({
  type: ActionTypes.POST_REGISTER_SUCCESS,
  payload: {
    token,
  },
});
export const registerFail = error => ({
  type: ActionTypes.POST_REGISTER_FAIL,
  payload: {
    error,
  },
});

export const register = (username, password) => dispatch => axios
  .post(`${apiUrl}`, { email: username, password })
  .then((response) => {
    dispatch(registerSuccess(response.data));
  })
  .catch((error) => {
    dispatch(registerFail(error));
  });
