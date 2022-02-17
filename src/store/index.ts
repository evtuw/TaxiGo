import accountReducer from '../reducers/accountReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  accountReducer,
});

export default reducers;
