import {combineReducers} from 'redux';
import reviewReducers from './reviewReducers';

const rootReducer = combineReducers({
  reviews: reviewReducers,
});

export default rootReducer;
