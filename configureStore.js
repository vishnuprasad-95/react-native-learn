import {createStore} from 'redux';
import rootReducer from './src/store/reducers';

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
