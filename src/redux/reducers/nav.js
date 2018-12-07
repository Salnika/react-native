import * as actionType from '../actionsTypes/nav';

const initialState = {
  view: ['login'],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.NEW_VIEW:
      return { ...state, view: action.payload.newView };
    case actionType.PREVIOUS_VIEW:
      return { ...state, view: action.payload.newView };
    default:
      return state;
  }
}
