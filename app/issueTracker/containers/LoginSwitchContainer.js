import { connect } from 'react-redux';
import LoginSwitch from '../components/LoginSwitch';
import { displaySignInForm, displaySignUpForm, signIn } from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.display.isLoggedIn
        , formToDisplay: state.display.formToDisplay
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: () => dispatch(signIn())
        , displaySignInForm: () => dispatch(displaySignInForm())
        , displaySignUpForm: () => dispatch(displaySignUpForm())
    }
};

const LoginSwitchContainer = connect(mapStateToProps, mapDispatchToProps)(LoginSwitch);
export default LoginSwitchContainer;