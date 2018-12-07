import * as actionType from '../actionsTypes/register';

const initialState = {
  error: '',
  token: '',
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.POST_REGISTER:
      return { ...state, loading: true };
    case actionType.POST_REGISTER_SUCCESS:
      return { ...state, loading: false, token: action.payload.token };
    case actionType.POST_REGISTER_FAIL:
      return { ...state, loading: false, token: action.payload.error };
    default:
      return state;
  }
}
