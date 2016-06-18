import {createStore} from 'redux';
import reducer from './reducer';

module.exports = function makeStore() {
  return createStore(reducer);
}
