import React from 'react'
import InputField from './InputField'
import { isEmail, isAlphanumeric } from 'validator'

const DEFAULT_STATE = {
    usernameFeedback: null
    , passwordFeedback: null
    , emailFeedback: null
};

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
        this.switchToSignin = this.switchToSignin.bind(this)
        this.validateAndSubmit = this.validateAndSubmit.bind(this)
    }

    switchToSignin(e) {
        e.preventDefault()
        this.props.toggleForm("signin")
    }

    validateAndSubmit(e) {
        console.log("validating")
        e.preventDefault()
        let invalid, usernameFeedback, passwordFeedback, emailFeedback

        // username validation
        let username = e.target.username.value
        if (username.length === 0) {
            invalid = true
            usernameFeedback = "Please enter a username"
        }
        else if (!isAlphanumeric(username)) {
            invalid = true
            usernameFeedback = "Usernames may only contain letters and numbers"
        }

        // password validation
        let password = e.target.password.value
        if (password.length === 0) {
            invalid = true
            passwordFeedback = "Please enter a password"
        }
        else if (!isAlphanumeric(password)) {
            invalid = true
            passwordFeedback = "Passwords may only contain letters and numbers"
        }

        // email validation
        let email = e.target.email.value
        if (email.length === 0) {
            invalid = true
            emailFeedback = "Please enter your email"
        }
        else if (!isEmail(email)) {
            invalid = true
            emailFeedback = "Please enter a valid email"
        }

        // give validation feedback
        if (invalid) {
            console.log("updating validation state",usernameFeedback,emailFeedback,passwordFeedback)
            this.setState({usernameFeedback, emailFeedback, passwordFeedback})
        }

        // submit form
        else {
            console.log("submitting form")
            let form = new FormData(e.target)
        }

    }

    render() {
        return (
            <form action="/api/tracker/signup" method="post" onSubmit={this.validateAndSubmit} noValidate>
                
                <InputField
                    inputName="username"
                    displayName="Username"
                    inputType="text"
                    feedback={this.state.usernameFeedback}
                    autocomplete="new-password"
                />
                
                <InputField
                    inputName="password"
                    displayName="Password"
                    inputType="password"
                    feedback={this.state.passwordFeedback}
                    autocomplete="new-password"
                />
                
                <InputField
                    inputName="email"
                    displayName="Email"
                    inputType="email"
                    feedback={this.state.emailFeedback}
                    autocomplete="email"
                />

                <div className="form-group">
                    <button className="btn btn-primary" type="submit" value="Sign Up">
                        Sign up
                        </button>
                    <span className="btn">
                        <a href="" onClick={this.switchToSignin}>or sign in to your account</a>
                    </span>
                </div>

            </form>
        )
    }


}


function submitForm(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    console.log("form", form)
    fetch("/api/tracker/signup", {
        method: "POST"
        , body: form
        , credentials: "include"
    }).then(body => body.json())
        .then(response => console.log(response))

}