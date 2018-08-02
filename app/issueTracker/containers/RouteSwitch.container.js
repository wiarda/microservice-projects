import { connect } from 'react-redux';
import RouteSwitch from '../components/RouteSwitch';

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.display.isSignedIn
        , username: state.user.username
        , formToDisplay: state.display.formToDisplay
        , userComponent: state.display.userComponent
    };
};

const RouteSwitchContainer = connect(mapStateToProps, null)(RouteSwitch);
export default RouteSwitchContainer;