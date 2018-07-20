import React from 'react'
import ReactDOM from 'react-dom'
import TrackerLandingPage from './components/TrackerLandingPage'
import commonStyles from 'App/shared/styles/main.scss'
import styles from './issueTracker.scss'

console.log("hydrating")

ReactDOM.hydrate( <TrackerLandingPage/>, 
    document.getElementById("root")
)