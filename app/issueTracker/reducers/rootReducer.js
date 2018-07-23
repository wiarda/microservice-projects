import { combineReducers } from 'redux';
import tasks from './tasks'
import display from './display'

const rootReducer = combineReducers({
    tasks
    ,display
});

export default rootReducer;