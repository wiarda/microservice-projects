import React from 'react'
import ReactDOM from 'react-dom'
import TaskListApp from './containers/TaskListApp'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import commonStyles from 'App/shared/styles/main.scss'
import styles from './issueTracker.scss'

console.log("hydrating")

const initialState = window.__STATE
delete window.__STATE // allow garbage collection

const store = createStore(rootReducer, initialState)

ReactDOM.hydrate( 
    <Provider store={store}>
        <TaskListApp/>
    </Provider>, 
    document.getElementById("root")
);