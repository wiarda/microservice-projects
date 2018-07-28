import {connect} from 'react-redux'
import TrackerLandingPage from '../components/TrackerLandingPage'
import { logIn, logOut } from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.user.isLoggedIn
        ,username: state.user.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: () => dispatch(logIn())
        ,logOut: () => dispatch(logOut())
    }
}

const TaskListApp = connect(mapStateToProps, mapDispatchToProps)(TrackerLandingPage)
export default TaskListApp