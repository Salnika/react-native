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
        return {
          ...state,
          loading: false,
          productData: {
            image_url: action.payload.productData.product.image_url,
            product_name_fr: action.payload.productData.product.product_name_fr,
            quantity: action.payload.productData.product.quantity,
            nutrition_grades: action.payload.productData.product.nutrition_grades,
            brands: action.payload.productData.product.brands,
          },
        };
      }
      return { ...state, loading: false, error: 'Product not found' };
    case actionType.GET_PRODUCT_INFO_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}
