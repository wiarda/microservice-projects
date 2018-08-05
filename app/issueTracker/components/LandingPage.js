import React from 'react'
import Signup from '../containers/Signup.container'

export default function LandingPage(props) {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <h1 className="text-center">TaskList</h1>
                <h2 className="text-center">a simple todo app</h2>
                <div>
                    <img className="landing-page__task-image" src="/public/images/list.jpg" />
                </div>
            </div>
            <div className="p-3"/>
            <Signup />
        </React.Fragment>
    )
}