import React from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

export default function LoginSwitch(props) {
    if (props.isLoggedIn) return null;
    else {
        switch (props.formToDisplay) {
            case "signup":
                return <SignupForm toggleForm={props.displaySignInForm} submitForm={submitForm}/>;
            case "signin":
                return <SigninForm toggleForm={props.displaySignUpForm} submitForm={submitForm}/>;
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
