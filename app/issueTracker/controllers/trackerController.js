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

export function landingPage(req, res) {
    console.log("landing page")
    
    if (req.isAuthenticated()) { //preload state
        let preloadedState = {
            display: { isSignedIn: true }
            , user: { username: req.user.username, tasks: req.user.issues }
        };
        let store = createStore(rootReducer, preloadedState);
        let content = renderToString(
            <Provider store={store}>
                <StaticRouter location={ROOT} context={{}}>
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
    else {
        res.send(page); // prerendered version of page with default store
    }
}

export async function addTask(req, res) {
    console.log("add task controller");
    let { task } = req.body;
    let userId = req.user._id;
    console.log("task:", task, "userid:", userId);

    // add task to db
    let newTask = new Issues({
        name: task
        , status: "Open"
        , userId
    });
    newTask.save(errHandler);
    let taskId = newTask._id


    // link task in user db
    Users.update(
        { _id: userId }
        , { $push: { issues: taskId } }
        , { safe: true }
        , function (err, rawResponse) {
            if (err) console.log("error:", err)
            if (rawResponse) { // success
                console.log("success:", rawResponse)
                res.json({type:"addTaskSuccess", newTask})
            }
        }
    )

}



function errHandler(err) {
    if (err) return console.log(err);
}