import React from 'react'
import User from './User'
import { Route, Redirect } from 'react-router'
import { ROOT } from '../appSettings'

export default (props) => {
    console.log("user switch", props)
    if (props.isSignedIn) {
        // user routes
        return (
            <Route exact path={ROOT + "/:user"} component={User} />
        )
    }
    else {
        return <Redirect to={ROOT} />
    }
}
