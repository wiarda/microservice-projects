import { combineReducers } from 'redux';
import user from './user'
import tasks from './tasks'
import display from './display'
import api from './api'

const rootReducer = combineReducers({
    user
    ,tasks
    ,display
    ,api
});

export default rootReducer;