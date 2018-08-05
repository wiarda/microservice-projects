import React from 'react';
import {hot} from 'react-hot-loader';
import GridLayout from '../../../components/GridLayout';
import ServerResponseContainer from '../containers/ServerResponseContainer'
import Routes from '../routes/Routes'
import RouteSwitch from '../containers/RouteSwitch.container'
import NavBarContainer from '../containers/NavBarContainer';
import Loading from '../containers/Loading.container'
import { ROOT, BODY_MIN_WIDTH } from '../appSettings'

function TrackerLandingPage(props) {
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

                <Loading
                    spinner={true}
                />

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

export default hot(module)(TrackerLandingPage)