import React from 'react'
import GridLayout from '../../../components/GridLayout'
import ServerResponse from '../../../components/ServerResponse'

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
                <div>Placeholder</div> 
    
                <ServerResponse
                    apiResponse={this.state.apiResponse}
                    parser={parseTracker}
                />
               
            </GridLayout>
        )
    }
}



function parseTracker(json){
    switch (json.type){
        default:
            return null
    }
}