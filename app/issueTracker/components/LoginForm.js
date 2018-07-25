import React from 'react'

export default function LoginForm(props){
    return (
        <div className="container-fluid">
        <form action="/login" method="post">
            <input 
                name="username" 
                type="text" 
                value={props.usernameValue} 
                className="form-control"
            />
            <input 
                name="password"
                type="text" 
                value={props.passwordValue} 
                className="form-control"
            />
            <button className="btn btn-primary"></button>
        </form>
        
        
        </div>
    )
}