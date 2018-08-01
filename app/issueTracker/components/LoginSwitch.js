import React from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { Redirect } from 'react-router-dom'
import {ROOT} from '../appSettings'

export default function LoginSwitch(props) {

    if (props.isSignedIn) return <Redirect to={`${ROOT}/${props.username}`}/>;
    else {
        switch (props.formToDisplay) {
            case "signup":
                return <SignupForm toggleForm={props.displaySignInForm} submitForm={submitForm} />;
            case "signin":
                return <SigninForm 
                    toggleForm={props.displaySignUpForm} 
                    submitForm={submitForm} 
                    signIn={function(username, tasks){
                        props.loadUser(username, tasks);
                        props.signIn();
                    }} 
                />;
            default:
                return null;
        }
    }
}


function submitForm(address, method, form) {
    return fetch(address, {
        method
        , body: form
        , credentials: "include"
    }).then(body => body.json())
}
