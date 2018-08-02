import React from 'react';
import { renderToString } from 'react-dom/server';
import { store, page } from './serverRender';
import Users from '../models/Users';
import Issues from '../models/Issues';

console.log("controller");


export function landingPage(req, res) {
    res.send(page);
}

export async function addTask(req, res) {
    console.log("add task controller");
    let { task } = req.body;
    let userId = req.user._id;
    console.log("task:", task, "userid:", userId);

    // add task to db
    let newTask = new Issues({
        name:task
        ,status: "Open"
        ,userId
    });
    newTask.save(errHandler);
    let taskId = newTask._id


    // link task in user db
    Users.update(
        {_id:userId}
        ,{$push: {issues:taskId}}
        ,{safe:true}
        ,function(err, rawResponse){
            if (err) console.log(err)
            if (rawResponse) { // success
                console.log(rawResponse)
                
            }
        }
    )

}



function errHandler(err){
    if (err) return console.log(err);
}