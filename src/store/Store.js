import { createStore } from 'redux';
import reducers  from '../reducers/Reducers';

const initialState = {
  markdown: {
    content: '',
    title: '',
    cover: ''
  }
};

const store = createStore(reducers, initialState);
export default store;
