import React from 'react'
import {ROOT} from '../appSettings'
import Signin from '../containers/Signin.container'
import Signup from '../containers/Signup.container'
import User from '../containers/User.container'
import AddTask from '../components/AddTask'
import ViewTasks from '../containers/ViewTasks.container'
import { Route, Switch } from 'react-router'

export default function Routes(props){
    return (
    <Switch>
        <Route exact path={ROOT} component={null} />
        <Route exact path={ROOT+"/signin"} component={Signin} />
        <Route exact path={ROOT+"/signup"} component={Signup} />
        <Route exact path={ROOT + "/:username"} component={User} />
        <Route exact path={ROOT + "/:username/add"} component={AddTask} />
        <Route exact path={ROOT + "/:username/view"} component={ViewTasks} />
    </Switch>
    )
}