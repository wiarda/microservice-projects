import { connect } from 'react-redux'
import NavBar from '../../../components/NavBar'
import { signOut, displaySignInForm } from '../actions/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.display.isSignedIn
        , username: state.user.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
        ,displaySignInForm: () => dispatch(displaySignInForm())
    }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarContainer;