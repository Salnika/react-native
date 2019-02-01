import axios from 'axios';
import * as ActionTypes from '../actionsTypes/profile';

const apiUrl = 'http://api.food-o.eu/user/me';

export const startGetInfo = () => ({
  type: ActionTypes.GET_PROFILE_INFO,
  payload: {},
});

export const getInfoSuccess = data => ({
  type: ActionTypes.GET_PROFILE_INFO_SUCCESS,
  payload: {
    email: data.user.email,
    picture: data.user.picture ? data.user.picture : '',
  },
});

export const getInfoFail = error => ({
  type: ActionTypes.GET_PROFILE_INFO_FAIL,
  payload: {
    error,
  },
});

export const getInfo = token => (dispatch) => {
  dispatch(startGetInfo());
  const headers = {
    Authorization: `JWT ${token}`,
  };
  axios
    .get(apiUrl, { headers })
    .then((response) => {
      dispatch(getInfoSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getInfoFail(error));
    });
};
