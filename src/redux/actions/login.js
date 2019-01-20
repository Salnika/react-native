import axios from 'axios';
import * as ActionTypes from '../actionsTypes/login';

const apiUrl = 'http://api.food-o.eu/auth/sign_in';

export const loginSuccess = ({ token }) => ({
  type: ActionTypes.POST_LOGIN_SUCCESS,
  payload: {
    token,
  },
});

export const loginFail = error => ({
  type: ActionTypes.POST_LOGIN_FAIL,
  payload: {
    error,
  },
});

export const startLogin = () => ({
  type: ActionTypes.POST_LOGIN,
  payload: {},
});

export const login = (username, password) => (dispatch) => {
  dispatch(startLogin());
  axios
    .post(`${apiUrl}`, { email: username, password })
    .then((response) => {
      dispatch(loginSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loginFail(error));
    });
};
