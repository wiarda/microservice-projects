import React from 'react'

export default function LoginForm(props){
    return (
        <React.Fragment>

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
            
            <div>
                <a href="" onClick={function(e){
                        e.preventDefault();
                        props.toggleForm("signup");
                    }}
                >
                    Sign up
                </a>
            </div>
            
            </div>

        </React.Fragment>
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
        ,credentials:"include"
    }).then(body=>body.json())
    .then(response=>{
        console.log(response)
        if (response.type==="loggedin") {
            console.log("link:",`tracker/${response.redirect}`)
            // window.location.href=`/api/tracker/${response.redirect}`
        }
    })
}