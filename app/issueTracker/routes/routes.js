import React from 'react'
import { ROOT } from '../appSettings'
import Signin from '../containers/Signin.container'
import Signup from '../containers/Signup.container'
import User from '../containers/User.container'
import AddTask from '../containers/AddTask.container'
import ViewTasks from '../containers/ViewTasks.container'
import { Route, Switch } from 'react-router'

// route config for server use
export const routesConfig = [
    { name: "root", exact: true, path: ROOT, component: null }
    , { name: "signin", exact: true, path: ROOT + "/signin", component: Signin }
    , { name: "signup", exact: true, path: ROOT + "/signup", component: Signup }
    , { name: "user", exact: true, path: ROOT + "/:username", component: User }
    , { name: "addtask", exact: true, path: ROOT + "/:username/add", component: AddTask }
    , { name: "viewtasks", exact: true, path: ROOT + "/:username/view", component: ViewTasks }
]


// route component for client use
export default function Routes(props) {

    let routes = routesConfig.map((el) => {
        return (
            <Route
                key={el.name}
                exact={el.exact}
                path={el.path}
                component={el.component}
            />
        )
    })


    return (
        <Switch>
            {routes}
        </Switch>
    )
}

