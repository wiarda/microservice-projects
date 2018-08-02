import { connect } from 'react-redux';
import SigninForm from '../components/SigninForm';
import { displaySignUpForm, signIn, loadUserInformation } from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.user.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        displaySignup: () => dispatch(displaySignUpForm())
        , signIn: (username, tasks) => {
            dispatch(loadUserInformation(username, tasks));
        }
    };
};

const SigninContainer = connect(mapStateToProps, mapDispatchToProps)(SigninForm);
export default SigninContainer;