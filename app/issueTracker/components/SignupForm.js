import React from 'react'

export default function SignupForm(props){
    return(
        <form action="/api/tracker/signup" method="post" onSubmit={submitForm}>
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>

            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            
            <div>
                <label>Email:</label>
                <input type="email" name="email"/>
            </div>

            <div>
                <input type="submit" value="Sign Up"/>
            </div>
        </form>
    )
}

function submitForm(e){
    e.preventDefault()
    let form = new FormData(e.target)
    console.log("form", form)
    fetch("/api/tracker/signup",{
        method: "POST"
        ,body: form
        ,credentials:"include"
    }).then(body=>body.json())
    .then(response=>console.log(response))

}