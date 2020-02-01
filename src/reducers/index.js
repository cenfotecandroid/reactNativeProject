import { combineReducers } from 'redux';

// Reducers
import user from './user';
//import searchLayoutReducer from './search-layout-reducer';

// Combine Reducers
var reducers = combineReducers({
    user
});

export default reducers;