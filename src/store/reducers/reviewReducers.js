import reviewTypes from '../constants/reviewTypes';

const initialState = [];

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case reviewTypes.ADD_REVIEW:
      return [...state, action.review];
    case reviewTypes.EDIT_REVIEW:
      return {
        ...state,
      };
    case reviewTypes.DELETE_REVIEW:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reviewReducer;
