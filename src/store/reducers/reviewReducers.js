import {ADD_REVIEW, EDIT_REVIEW, DELETE_REVIEW} from '../constants/reviewTypes';

const initialState = {};
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
      };
    case ADD_REVIEW:
      return {
        ...state,
      };
    case EDIT_REVIEW:
      return {
        ...state,
      };
    case DELETE_REVIEW:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default countReducer;
