import { connect } from 'react-redux';
import LoginSwitch from '../components/LoginSwitch';
import { displaySignInForm, displaySignUpForm, signIn, loadUserInformation } from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.display.isSignedIn
        , username: state.user.username
        , formToDisplay: state.display.formToDisplay
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: () => dispatch(signIn())
        , loadUser: (username, tasks) => dispatch(loadUserInformation(username, tasks))
        , displaySignInForm: () => dispatch(displaySignInForm())
        , displaySignUpForm: () => dispatch(displaySignUpForm())
    }
};

const LoginSwitchContainer = connect(mapStateToProps, mapDispatchToProps)(LoginSwitch);
export default LoginSwitchContainer;