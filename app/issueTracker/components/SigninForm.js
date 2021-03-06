import React from 'react'
import InputField from './InputField'
import { isAlphanumeric } from 'validator'

const DEFAULT_STATE = {
    usernameFeedback: null
    , passwordFeedback: null
};

export default class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
        this.switchToSignup = this.switchToSignup.bind(this)
        this.validateAndSignin = this.validateAndSignin.bind(this)
    }

    submitForm(address, method, form) {
        return fetch(address, {
            method
            , body: form
            , credentials: "include"
        }).then(body => body.json())
    }
    
    switchToSignup(e) {
        console.log("switching to signup")
        e.preventDefault();
        this.props.displaySignup();
    }

    validateAndSignin(e) {
        e.preventDefault()
        let invalid, usernameFeedback, passwordFeedback

        // username validation
        let username = e.target.username.value;
        if (username.length === 0) {
            invalid = true
            usernameFeedback = "Please enter your username"
        }
        else if (!isAlphanumeric(username)) {
            invalid = true
            usernameFeedback = "Sorry, this username doesn't exist!"
        }

        // password validation
        let password = e.target.password.value
        if (password.length === 0) {
            invalid = true
            passwordFeedback = "Please enter your password"
        }

        // give validation feedback
        if (invalid) {
            this.setState({ usernameFeedback, passwordFeedback })
        }

        // submit form
        else {
            this.props.showLoadingComponent()
            console.log("Signing in")
            let form = new FormData(e.target)
            this.submitForm("/api/tracker/login", "POST", form, this.signIn)
                .then(res => {
                    console.log("submit then", res)
                    switch (res.type){
                        case "error":
                            return
                        case "success":
                            return this.props.signIn(res.username, res.issues);
                    }
                })
        }
    }

    render() {
        console.log("Signin form",this.props)
        return (
            <form action="/api/tracker/login" method="post" onSubmit={this.validateAndSignin} data-isloading={this.props.isLoading}>

                <div className="form-group">
                    <h2>Sign in</h2>
                    <small>or <a href="" onClick={this.switchToSignup}>sign up for an account</a></small>
                </div>

                <InputField
                    inputName="username"
                    displayName="Username"
                    inputType="text"
                    feedback={this.state.usernameFeedback}
                    autoComplete="username"
                />

                <InputField
                    inputName="password"
                    displayName="Password"
                    inputType="password"
                    feedback={this.state.passwordFeedback}
                    autoComplete="password"
                />

                <div className="form-group">
                    <button className="btn btn-primary" type="submit" data-btnisloading={this.props.isLoading}>
                        Sign in
                    </button>
                </div>

            </form>

        )
    }
}
