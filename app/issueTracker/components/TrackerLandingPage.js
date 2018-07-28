import React from 'react'
import GridLayout from '../../../components/GridLayout'
import ServerResponse from '../../../components/ServerResponse'
import SignupForm from './SignupForm';
import LoginForm from './LoginForm'
import Navbar from '../../../components/NavBar';

const defaultState = {
    apiResponse:""
}

export default class TrackerLandingPage extends React.Component{
    constructor(props){
        super(props)
        this.state = defaultState
    }
    
    render(){
        return (
            <React.Fragment>
                
                <Navbar
                    brand={{name:"TaskList",link:"/api/tracker"}}
                />

                <GridLayout title="Todo Tracker">
                    <div>Check for active session / serve log-in</div> 
        
                    <ServerResponse
                        apiResponse={this.state.apiResponse}
                        parser={parseTracker}
                        />
                
                <SignupForm/>

                <LoginForm/>

                </GridLayout>
            
            </React.Fragment>
        )
    }
}



function parseTracker(json){
    switch (json.type){
        case "signupErr":
            return json.message
        case "signupSuccess":
            return json.message
        default:
            return null
    }
}