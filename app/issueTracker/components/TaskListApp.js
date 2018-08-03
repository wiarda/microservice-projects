import React from 'react';
import GridLayout from '../../../components/GridLayout';
import ServerResponseContainer from '../containers/ServerResponseContainer'
import Routes from '../routes/Routes'
import RouteSwitch from '../containers/RouteSwitch.container'
import NavBarContainer from '../containers/NavBarContainer';
import User from '../containers/User.container'
import { ROOT, BODY_MIN_WIDTH } from '../appSettings'

export default function TrackerLandingPage(props) {
    return (
        <React.Fragment>

            <NavBarContainer
                root={ROOT}
                brand="TaskList"
                menuItems={[
                    ["View Tasks", "/view", true]
                    , ["Add Task", "/add", true]
                ]}
            />

            <GridLayout title={null} minWidth={BODY_MIN_WIDTH}>

                <Routes/>

                <RouteSwitch/>

                <ServerResponseContainer
                    parser={parseTracker}
                />

            </GridLayout>

        </React.Fragment>
    );

}



function parseTracker(json) {
    switch (json.type) {
        case "signupErr":
            return json.message;
        case "signupSuccess":
            return json.message;
        case "signinSuccess":
            {

                return (
                    <h2>Welcome {json.username}</h2>
                );
            }
        default:
            return null;
    }
}