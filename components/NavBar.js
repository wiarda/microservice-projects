import React from 'react'

export default function NavBar(props){

    //parse items



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href={props.brand.link}>{props.brand.name}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    
                    <li className="nav-item">
                        <a href="" className="nav-link">View Tasks</a>
                    </li>
                    
                    <li className="nav-item">
                        <a href="" className="nav-link">Add Task</a>
                    </li>
                    
                </ul>
            </div>
        </nav>
    )
}