import * as ActionTypes from '../actionsTypes/nav';

export const nextPage = (oldView, view) => {
  const newView = oldView;
  newView.push(view);
  return {
    type: ActionTypes.NEW_VIEW,
    payload: {
      newView,
      view,
    },
  };
};

export const previousPage = (oldView) => {
  const newView = oldView.slice(0, -1);
  const view = newView[newView.length - 1];
  return {
    type: ActionTypes.PREVIOUS_VIEW,
    payload: {
      newView,
      view,
    },
  };
};
