import * as actionType from '../actionsTypes/barcode';

const initialState = {
  error: '',
  productData: '',
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_PRODUCT_INFOS:
      return { ...state, loading: true };
    case actionType.GET_PRODUCT_INFO_SUCCESS:
      if (action.payload.productData.status) {
        return { ...state, loading: false, productData: action.payload.productData };
      }
      return { ...state, loading: false, error: 'Product not found' };
    case actionType.GET_PRODUCT_INFO_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}
