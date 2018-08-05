import React from 'react';
import { Redirect } from 'react-router'
import { ROOT } from '../appSettings'

export default function LoginSwitch(props) {

    if (props.isSignedIn) {
        let base = `${ROOT}/${props.username}`
        switch (props.userComponent){
            case "add":
                return <Redirect to={base+"/add"}/>
            case "view":
                return <Redirect to={base+"/view"}/>
            default:
                return <Redirect to={base} />
        }
    }
    else { // not signed in
        switch (props.formToDisplay){
            case "signin":
                return <Redirect to={`${ROOT}/signin`} />
            case "signup":
                return <Redirect to={`${ROOT}/signup`} />
            default:
                return <Redirect to={ROOT} />
        }
    }
}
