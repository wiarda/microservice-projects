import React from 'react'
import { renderToString} from 'react-dom/server'
import TrackerLandingPage from '../components/TrackerLandingPage'
import pageTemplate from '../../../components/pageTemplate'

export function landingPage(req,res){
    let page = pageTemplate({
        title: "Issue Tracker Service"
        ,content: renderToString(<TrackerLandingPage/>)
        ,scriptsArr: ["/build/shared.bundle.js","/build/tracker.bundle.js"]
        ,stylesArr: ["/build/shared.css","/build/tracker.css"]
    })

    res.send(page)
}