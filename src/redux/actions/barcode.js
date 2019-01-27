import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as ActionTypes from '../actionsTypes/barcode';

const openFoodFactUrl = 'https://fr.openfoodfacts.org/api/v0/produit/';

export const getProductSuccess = productData => ({
  type: ActionTypes.GET_PRODUCT_INFO_SUCCESS,
  payload: {
    productData,
  },
});

export const getProductFail = async error => ({
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
    .then(async (response) => {
      const previousProducts = await AsyncStorage.getItem('itemList');
      const items = previousProducts !== null ? JSON.parse(previousProducts) : [];
      const timestamp = new Date().getUTCMilliseconds();
      items.push({
        name: response.data.product.product_name_fr,
        uri: response.data.product.image_url,
        id: timestamp,
      });
      await AsyncStorage.setItem('itemList', JSON.stringify(items));
      dispatch(getProductSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getProductFail(error));
    });
};
