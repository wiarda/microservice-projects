import React from 'react'
import { renderToString} from 'react-dom/server'
import { store, page } from './serverRender'

console.log("controller")


export function landingPage(req,res){
    res.send(page)
}

async function addTask(){

}