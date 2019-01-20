import axios from 'axios';
import * as ActionTypes from '../actionsTypes/barcode';

const openFoodFactUrl = 'https://fr.openfoodfacts.org/api/v0/produit/';

export const getProductSuccess = productData => ({
  type: ActionTypes.GET_PRODUCT_INFO_SUCCESS,
  payload: {
    productData,
  },
});

export const getProductFail = error => ({
  type: ActionTypes.GET_PRODUCT_INFO_FAIL,
  payload: {
    error,
  },
});

export const startGetProduct = () => ({
  type: ActionTypes.GET_PRODUCT_INFOS,
  payload: {},
});

export const getProduct = barcode => (dispatch) => {
  dispatch(startGetProduct());
  axios
    .get(`${openFoodFactUrl}${barcode}.json`)
    .then((response) => {
      dispatch(getProductSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getProductFail(error));
    });
};
