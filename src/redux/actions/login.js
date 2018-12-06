import axios from 'axios';
import * as ActionTypes from '../actionsTypes/login';

const apiUrl = 'http://api.food-o.eu/auth/sign_in';

export const loginSuccess = ({ token }) => {
  return {
    type: ActionTypes.POST_LOGIN_SUCCESS,
    payload: {
      token,
    },
  };
};

export const LoginFail = error => ({
  type: ActionTypes.POST_LOGIN_FAIL,
  payload: {
    error,
  },
});

export const login = (username, password) => dispatch => axios
  .post(`${apiUrl}`, { email: username, password })
  .then((response) => {
    dispatch(loginSuccess(response.data));
  })
  .catch((error) => {
    throw error;
  });
