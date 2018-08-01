import React from 'react';
import GridLayout from '../../../components/GridLayout';
import ServerResponseContainer from '../containers/ServerResponseContainer'
import LoginSwitchContainer from '../containers/LoginSwitchContainer'
import NavBarContainer from '../containers/NavBarContainer';
import UserSwitch from '../containers/UserSwitch.container';
import { Switch, Route } from 'react-router'
import { ROOT } from '../appSettings'

export default function TrackerLandingPage(props) {
    return (
        <React.Fragment>

            <NavBarContainer
                root={ROOT}
                brand="TaskList"
                menuItems={[
                    ["View Tasks", "/tasks", true]
                    , ["Add Task", "/add", true]
                ]}
            />

            <GridLayout title={null}>

                <Switch>
                    <Route exact path={ROOT} component={LoginSwitchContainer} />
                    <Route exact path={ROOT + "/:username"} component={UserSwitch} />
                </Switch>


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