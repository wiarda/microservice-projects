import React from 'react'
import InputField from './InputField'
import { isEmail, isAlphanumeric } from 'validator'

const DEFAULT_STATE = {
    usernameFeedback: null
    , passwordFeedback: null
    , emailFeedback: null
    , usernameValue: null
    , isUnique: null
};

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
        this.switchToSignin = this.switchToSignin.bind(this)
        this.validateAndSubmit = this.validateAndSubmit.bind(this)
        this.uniqueCheckHandler = this.uniqueCheckHandler.bind(this)
        this.isUsernameUnique = this.isUsernameUnique.bind(this)
    }

    switchToSignin(e) {
        e.preventDefault();
        this.props.toggleForm("signin");
    }

    validateAndSubmit(e) {
        console.log("validating")
        e.preventDefault();
        let invalid, usernameFeedback, passwordFeedback, emailFeedback;

        // username validation
        let username = e.target.username.value;
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
            console.log("updating validation state", usernameFeedback, emailFeedback, passwordFeedback)
            this.setState({ usernameFeedback, emailFeedback, passwordFeedback })
        }

        // submit form
        else {
            console.log("submitting sign up form")
            let form = new FormData(e.target)
        }

    }

    uniqueCheckHandler(e) {
        let username = e.target.value;

        // prevent excessive checks while user is inputting username
        clearTimeout(this.uniqueCheck);
        if (username.length > 0) {
            this.uniqueCheck = setTimeout(function () {
                this.isUsernameUnique(username)
            }.bind(this), 500);
        }

        // log the current username form value and reset the unique feedback
        this.setState({ usernameValue: username, isUnique: null })
    }

    isUsernameUnique(username) {
        fetch(
            `tracker/checkaccount?username=${username}`
            , { method: "get" }
        ).then(body => body.json())
            .then(res => {
                console.log(res)
                // feedback if chosen username is unique and
                // api response is for current username value
                if (res.type == "unique" && this.state.usernameValue === res.username) {
                    this.setState({ isUnique: "unique" })
                }
                // feedback if username already taken
                else if (res.type == "duplicate" && this.state.usernameValue == res.username) {
                    this.setState({ isUnique: "duplicate" })
                }
            })
    }

    render() {

        return (
            <form action="/api/tracker/signup" method="post" onSubmit={this.validateAndSubmit} noValidate>

                <div className="form-group">
                    <h2>Sign up</h2>
                    <small>or <a href="" onClick={this.switchToSignin}>sign in to your account</a></small>
                </div>

                <InputField
                    inputName="username"
                    displayName="Username"
                    inputType="text"
                    feedback={this.state.usernameFeedback}
                    autoComplete="new-password"
                    onChange={this.uniqueCheckHandler}
                >
                    <div
                        className="input--success-indicator"
                        data-visibility={this.state.isUnique ? true : false}
                    >
                        {displaySuccessIndicator(this.state.isUnique)}
                    </div>
                </InputField>

                <InputField
                    inputName="password"
                    displayName="Password"
                    inputType="password"
                    feedback={this.state.passwordFeedback}
                    autoComplete="new-password"
                />

                <InputField
                    inputName="email"
                    displayName="Email"
                    inputType="email"
                    feedback={this.state.emailFeedback}
                    autoComplete="email"
                />

                <div className="form-group">
                    <button className="btn btn-primary" type="submit" value="Sign Up">
                        Sign up
                    </button>
                </div>

            </form>
        )
    }


}

function displaySuccessIndicator(isUnique) {
    switch (isUnique) {
        case "unique":
            return (
                <span className="text-success">
                    Username available
                </span>
            )
        case "duplicate":
            return (
                <span className="text-danger">
                    This username is not available
                </span>
            )
        default:
            return null
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