import React from 'react'
import GridLayout from '../../../components/GridLayout'
import ServerResponse from '../../../components/ServerResponse'
import SignupForm from './SignupForm';

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
            <GridLayout title="Todo Tracker">
                <div>Check for active session / serve log-in</div> 
    
                <ServerResponse
                    apiResponse={this.state.apiResponse}
                    parser={parseTracker}
                />
               
               <SignupForm/>

            </GridLayout>
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