import { combineReducers } from 'redux';
import user from './user'
import tasks from './tasks'
import display from './display'

const rootReducer = combineReducers({
    user
    ,tasks
    ,display
});

export default rootReducer;