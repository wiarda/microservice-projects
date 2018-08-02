import { connect } from 'react-redux';
import SignupForm from '../components/SignupForm';
import { displaySignInForm } from '../actions/actions'

const mapDispatchToProps = dispatch => {
   return {
        displaySignin: ()=>dispatch(displaySignInForm())
   };
};

const SignupContainer = connect(null, mapDispatchToProps)(SignupForm);
export default SignupContainer;