import * as actionType from '../actionsTypes/profile';

const initialState = {
  userMail: '',
  userPicture: 'null',
  loading: false,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_PROFILE_INFO:
      return { ...state, loading: true };
    case actionType.GET_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userMail: action.payload.email,
        userPicture: action.payload.picture,
      };
    case actionType.GET_PROFILE_INFO_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}
