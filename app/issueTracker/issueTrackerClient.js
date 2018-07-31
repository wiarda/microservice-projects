import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import TaskListApp from './components/TaskListApp'
import commonStyles from 'App/shared/styles/main.scss'
import styles from './issueTracker.scss'

console.log("hydrating")

const initialState = window.__STATE
delete window.__STATE // allow garbage collection

const store = createStore(rootReducer, initialState)

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <TaskListApp />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);