import React from 'react'
import InputField from './InputField'
import { isAlphanumeric } from 'validator'
import { validate } from '../helpers/validationHelpers';

const DEFAULT_STATE = {
    usernameFeedback: null
    , passwordFeedback: null
    , passwordValidity: null
    , emailFeedback: null
    , emailValidity: null
    , usernameValue: null
    , usernameValidity: null
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
        this.clearFeedback = this.clearFeedback.bind(this)
        this.validateInput = this.validateInput.bind(this)
    }

    switchToSignin(e) {
        e.preventDefault();
        console.log("switching to signin")
        this.props.displaySignin();
    }

    validateAndSubmit(e) {
        e.preventDefault();

        let [usernameFeedback, usernameValidity] = validate.username(e.target.username.value,this.state.isUnique);
        let [passwordFeedback, passwordValidity] = validate.password(e.target.password.value);
        let [emailFeedback, emailValidity] = validate.email(e.target.email.value);

        // provide validation feedback
        if (usernameFeedback || passwordFeedback || emailFeedback) {
            this.setState({ usernameFeedback, usernameValidity, emailFeedback, emailValidity, passwordFeedback, passwordValidity })
        }
        // otherwise, submit form
        else {
            console.log("Signing up")
            let form = new FormData(e.target)
            this.submitForm("/api/tracker/signup","POST",form)
            .then(res=>{
                console.log("signed up, server response:",res)
            })
        }
    }

    validateInput(value,field) {
        let [feedback, validity] = validate[field](value, this.state.isUnique)
        
        this.setState({[`${field}Feedback`]:feedback, [`${field}Validity`]:validity})
    }

    clearFeedback(feedback, validity) {
        this.setState({ [feedback]: null, [validity]:null })
    }

    uniqueCheckHandler(e) {
        let username = e.target.value;

        // skip database check if username is invalid
        if (username.length && !isAlphanumeric(username)) {
            return this.setState({ usernameValue: username, isUnique: "duplicate" })
        }

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

    submitForm(address, method, form) {
        return fetch(address, {
            method
            , body: form
            , credentials: "include"
        }).then(body => body.json())
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
                    validity={this.state.usernameValidity}
                    autoComplete="new-password"
                    onChange={this.uniqueCheckHandler}
                    onBlur={this.validateInput}
                    onClick={() => this.clearFeedback("usernameFeedback","usernameValidity")}
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
                    validity={this.state.passwordValidity}
                    autoComplete="new-password"
                    onClick={() => this.clearFeedback("passwordFeedback","passwordValidity")}
                    onBlur={this.validateInput}
                />

                <InputField
                    inputName="email"
                    displayName="Email"
                    inputType="email"
                    feedback={this.state.emailFeedback}
                    validity={this.state.emailValidity}
                    autoComplete="email"
                    onClick={() => this.clearFeedback("emailFeedback","emailValidity")}
                    onBlur={this.validateInput}
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
