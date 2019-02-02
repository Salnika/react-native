import axios from 'axios';
import FormData from 'form-data';

import * as ActionTypes from '../actionsTypes/profile';

const apiUrl = 'http://api.food-o.eu/user/me';
const urlUpload = 'http://api.food-o.eu/user/me/profilePicture';

export const startGetInfo = () => ({
  type: ActionTypes.GET_PROFILE_INFO,
  payload: {},
});

export const getInfoSuccess = data => ({
  type: ActionTypes.GET_PROFILE_INFO_SUCCESS,
  payload: {
    email: data.user.email,
    picture: data.user.picture ? data.user.picture
      : 'http://www.super-blagues.fr/assets/images/profil/profil_defaut.png',
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

export const uploadPictureSuccess = data => ({
  data,
});

export const uploadPictureFail = error => ({
  error,
});

export const uploadProfilePicture = (token, image) => (dispatch) => {
  const formData = new FormData();
  const formatedFile = {
    uri: image.uri,
    name: 'photo.jpeg',
    type: 'image/jpeg',
  };
  formData.append('picture', formatedFile);
  fetch(urlUpload, {
    method: 'post',
    headers: new Headers({
      Authorization: `JWT ${token}`,
    }),
    body: formData,
  })
    .then((response) => {
      dispatch(uploadPictureSuccess(response));
    })
    .catch((error) => {
      dispatch(uploadPictureFail(error));
    });
};
