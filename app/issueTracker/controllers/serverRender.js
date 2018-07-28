import React from 'react';
import { renderToString} from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import rootReducer from '../reducers/rootReducer'
import pageTemplate from '../../../components/pageTemplate';
import TaskListApp from '../containers/TaskListApp'

let store = createStore(rootReducer)

let content = renderToString(
    <Provider store={store}>
        <TaskListApp/>
    </Provider>
)

export const initialState = store.getState()

export const page = pageTemplate(
    {
        title: "To-do App"
        ,content
        ,scriptsArr: ["/build/shared.bundle.js","/build/tracker.bundle.js"]
        ,stylesArr: ["/build/shared.css","/build/tracker.css"]
        ,initialState
    }
) 

