import _ from 'lodash';
import * as actionType from '../actionsTypes/nav';
import Login from '../../components/login';
import Routes from '../../routes';

const initialState = {
  view: ['login'],
  component: Login,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.NEW_VIEW:
      return {
        ...state,
        view: action.payload.newView,
        component: _.find(Routes, { name: action.payload.view }).component,
      };
    case actionType.PREVIOUS_VIEW:
      return {
        ...state,
        view: action.payload.newView,
        component: _.find(Routes, { name: action.payload.view }).component,
      };
    default:
      return state;
  }
}
