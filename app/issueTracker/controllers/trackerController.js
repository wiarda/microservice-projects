import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import pageTemplate from '../../../components/pageTemplate';
import { StaticRouter } from 'react-router-dom';
import { page } from './serverRender';
import { ROOT } from '../appSettings';
import Users from '../models/Users';
import Issues from '../models/Issues';
import TaskListApp from '../components/TaskListApp'

/**
 * funnels to app's non-root entry points based on authentication status:
 * a) signed in --> user page
 * b) signed out --> sign in form
 */
export function funnel(req,res){
    if (req.isAuthenticated()){
        res.redirect(`${ROOT}/${req.user}`)
    }
    else res.redirect(`${ROOT}/signin`)
}

/**
 * populates the redux store for the 2 non-root entry points
 */
export function landingPage(req, res) {
    let preloadedState    
    if (req.isAuthenticated()) { //preload state
        preloadedState = {
            display: { isSignedIn: true, isLoading:false, loadingMessage:"Loading..." }
            , user: { username: req.user.username, tasks: req.user.issues }
        };
    }
    else {
        preloadedState = {
            display: {isSignedIn: false, isLoading:false, loadingMessage:"Signing in...", formToDisplay:"signin"}
        }
    }
    console.log("url:",ROOT+req.url)
    let store = createStore(rootReducer, preloadedState);
    let content = renderToString(
        <Provider store={store}>
            <StaticRouter location={ROOT+req.url} context={{}}>
                <TaskListApp />
            </StaticRouter>
        </Provider>
    );
    let initialState = store.getState();
    
    let statefulLanding = pageTemplate(
        {
            title: "To-do App"
            , content
            , scriptsArr: ["/build/shared.bundle.js", "/build/tracker.bundle.js"]
            , stylesArr: ["https://fonts.googleapis.com/icon?family=Material+Icons","/build/shared.css", "/build/tracker.css"]
            , initialState
        }
    );
    res.send(statefulLanding);
}

export function entry(req,res){
    if (req.isAuthenticated()) {
        res.redirect(`${ROOT}/${req.user.username}`)
    }
    else res.send(page)

}




