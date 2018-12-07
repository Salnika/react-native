import * as ActionTypes from '../actionsTypes/nav';

export const nextPage = (oldView, view) => {
  const newView = oldView;
  newView.push(view);
  return {
    type: ActionTypes.NEW_VIEW,
    payload: {
      newView,
    },
  };
};

export const previousPage = (oldView) => {
  const newView = oldView.pop();
  return {
    type: ActionTypes.PREVIOUS_VIEW,
    payload: {
      newView,
    },
  };
};
