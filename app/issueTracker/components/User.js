import React from 'react'

const DEFAULT_STATE = {}

export default class User extends React.Component{
    constructor(props){
        super(props)
        this.state = DEFAULT_STATE
    }

    render(){
        return (
            <div>User stuff goes here</div>
        )
    }
}