import React from 'react';
import GridLayout from '../../../components/GridLayout';
import ServerResponse from '../../../components/ServerResponse';
import LoginSwitch from './LoginSwitch'
import Navbar from '../../../components/NavBar';

const ROOT = "/api/tracker";
const defaultState = {
    apiResponse:""
    ,form: "signup"
};

export default class TrackerLandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = defaultState;
        this.toggleForm = this.toggleForm.bind(this)
    }
    
    toggleForm(form){
        this.setState({form});
    }

    render(){
        return (
            <React.Fragment>
                
                <Navbar
                    root={ROOT}
                    brand="TaskList"
                    menuItems={[
                        ["View Tasks","/tasks",true]
                        ,["Add Task", "/add",true]
                    ]}
                    isLoggedIn={this.props.isLoggedIn}
                />

                <GridLayout title={null}>
    
                    <LoginSwitch
                        isLoggedIn={this.props.isLoggedIn}
                        form={this.state.form}
                    />
        
                    <ServerResponse
                        apiResponse={this.state.apiResponse}
                        parser={parseTracker}
                        toggleForm={this.toggleForm}
                    />
                
                </GridLayout>
            
            </React.Fragment>
        );
    }
}



function parseTracker(json){
    switch (json.type){
        case "signupErr":
            return json.message;
        case "signupSuccess":
            return json.message;
        default:
            return null;
    }
}