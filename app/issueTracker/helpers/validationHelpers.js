import { isEmail, isAlphanumeric } from 'validator'

export function validateUsername(username, isUnique=null){
    let invalid = false, feedback = null

    if (username.length === 0) {
        invalid = true;
        feedback = "Please enter a username";
    }
    else if (!isAlphanumeric(username)) {
        invalid = true;
        feedback = "Usernames may only contain letters and numbers";
    }
    else if (isUnique=="duplicate"){
        invalid = true;
        feedback = "This username is taken, please choose another";
    }
    
    let validity = invalid ? "is-invalid" : "is-valid";

    return [feedback, validity];
}

export function validatePassword(password){
    let invalid = false, feedback = "";
    
    if (password.length === 0) {
        invalid = true;
        feedback = "Please enter a password";
    }
    else if (!isAlphanumeric(password)) {
        invalid = true;
        feedback = "Passwords may only contain letters and numbers";
    }

    let validity = invalid ? "is-invalid" : "is-valid";

    return [feedback, validity];
}

export function validateEmail(email){
    let invalid = false, feedback="";

    if (email.length === 0) {
        invalid = true;
        feedback = "Please enter your email";
    }
    else if (!isEmail(email)) {
        invalid = true;
        feedback = "Please enter a valid email";
    }

    let validity = invalid ? "is-invalid" : "is-valid";

    return [feedback, validity];
}

export const validate = {
    email: validateEmail
    ,username: validateUsername
    ,password: validatePassword
}