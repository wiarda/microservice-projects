import { connect } from 'react-redux';
import SigninForm from '../components/SigninForm';
import { displaySignUpForm, loadUserInformation, toggleLoadingComponent } from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.user.username
        ,isLoading: state.display.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        displaySignup: () => dispatch(displaySignUpForm())
        , signIn: (username, tasks) => {
            dispatch(loadUserInformation(username, tasks));
        }
        , showLoadingComponent: () => dispatch(toggleLoadingComponent(true,"Loading..."))
    };
};

const SigninContainer = connect(mapStateToProps, mapDispatchToProps)(SigninForm);
export default SigninContainer;