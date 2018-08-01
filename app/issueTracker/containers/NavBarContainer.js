import { connect } from 'react-redux'
import NavBar from '../../../components/NavBar'
import {signOut} from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.display.isSignedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarContainer;