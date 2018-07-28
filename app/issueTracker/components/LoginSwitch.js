import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function LoginSwitch({isLoggedIn,form, toggleForm}){
    if (isLoggedIn) return null;
    else {
        switch(form){
            case "signup":
                return <SignupForm toggleForm={toggleForm}/>;
            case "signin":
                return <LoginForm toggleForm={toggleForm}/>;
            default:
                return null;
        }
    }
}