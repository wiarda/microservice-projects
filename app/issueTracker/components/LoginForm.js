import React from 'react'

export default function LoginForm(props){
    return (
        <div className="container-fluid">
        <form action="/login" method="post" onSubmit={login}>
            <input 
                name="username" 
                type="text" 
                value={props.usernameValue} 
                className="form-control"
            />
            <input 
                name="password"
                type="password" 
                value={props.passwordValue} 
                className="form-control"
            />
            <button className="btn btn-primary">Log in</button>
        </form>
        
        
        </div>
    )
}

function login(e){
    e.preventDefault()
    console.log("submitting form")
    let form = new FormData(e.target)
    console.log(form)
    fetch("/api/tracker/login",{
        method: "POST"
        ,body: form
    }).then(body=>body.json())
    .then(response=>console.log(response))
}