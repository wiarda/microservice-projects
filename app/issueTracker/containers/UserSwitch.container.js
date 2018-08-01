import { connect } from 'react-redux';
import UserSwitch from '../components/UserSwitch';

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.display.isSignedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

const UserSwitchContainer = connect(mapStateToProps, mapDispatchToProps)(UserSwitch);
export default UserSwitchContainer;