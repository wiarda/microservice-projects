import React from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

export default function LoginSwitch({ isLoggedIn, form, toggleForm }) {
    if (isLoggedIn) return null;
    else {
        switch (form) {
            case "signup":
                return <SignupForm toggleForm={toggleForm} />;
            case "signin":
                return <SigninForm toggleForm={toggleForm} />;
            default:
                return null;
        }
    }
}