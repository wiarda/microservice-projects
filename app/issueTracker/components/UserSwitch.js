import React from 'react'
import { Route, Redirect } from 'react-router'
import { ROOT } from '../appSettings'

export default (props) => {
    console.log("user switch", props)
    if (props.isLoggedIn) {
        // user routes
        return (
            <Route exact path={ROOT + "/:user"} component={<div>User interface here</div>} />
        )
    }
    else {
        return <Redirect to={ROOT} />
    }
}
