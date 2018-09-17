import {combineReducers} from 'redux';
import todos from './todos'
import user from './user'
import error from './error'

const rootReducer = combineReducers({
    user,
    todos,
    error,
});

export default rootReducer;