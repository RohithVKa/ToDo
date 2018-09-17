import {combineReducers} from 'redux';
import todos from './todos'
import user from './user'
import error from './error'
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    user,
    todos,
    error,
    form: formReducer
});

export default rootReducer;