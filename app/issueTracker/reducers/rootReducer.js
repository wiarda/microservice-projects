import { combineReducers } from 'redux';
import user from './user'
import display from './display'
import api from './api'

const rootReducer = combineReducers({
    user
    ,display
    ,api
});

export default rootReducer;