import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROOT } from '../appSettings'



function User(props) {
    let base = `${ROOT}/${props.username}`
    
    console.log("USER", props)
    return (
        <div>
            <div>Welcome {props.username}!</div>
            <div>You have {props.taskCount} tasks.</div>
            <div className="row">
                <Link className="btn btn-primary" to={base + "/view"}>
                    View Tasks
                </Link>
                <Link className="btn btn-primary" to={base + "/add"}>
                    Add a Task
                </Link>
            </div>
        </div>
    );

}

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.user.username
        , taskCount: state.user.tasks.length
    };
};

const UserContainer = connect(mapStateToProps, null)(User);
export default UserContainer;