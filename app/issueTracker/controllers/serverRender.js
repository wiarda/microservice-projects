import React from 'react';
import { renderToString} from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import rootReducer from '../reducers/rootReducer'
import TrackerLandingPage from '../components/TrackerLandingPage';
import pageTemplate from '../../../components/pageTemplate';


let store = createStore(rootReducer)

let content = renderToString(
    <Provider store={store}>
        <TrackerLandingPage/>
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

