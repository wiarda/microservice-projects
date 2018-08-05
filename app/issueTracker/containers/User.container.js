import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROOT } from '../appSettings'

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.user.username
        , taskCount: {
            open: state.user.tasks.filter(el=>el.status=="Open").length
            , complete: state.user.tasks.filter(el=>el.status=="Complete").length
        }
    };
};

function User(props) {
    let base = `${ROOT}/${props.username}`
    
    console.log("USER", props)
    return (
        <div>
            <h2 className="text-center">Welcome {props.username}!</h2>
            <div className="text-center mt-4">You have {props.taskCount.open} active tasks, and you've completed {props.taskCount.complete} tasks.</div>
            <div className="mt-3 justify-content-around w-75 mx-auto">
                <Link className="btn btn-primary mx-3" to={base + "/view"}>
                    View your tasks
                </Link>
                <Link className="btn btn-primary mx-3" to={base + "/add"}>
                    Add a task
                </Link>
            </div>
        </div>
    );

}



const UserContainer = connect(mapStateToProps, null)(User);
export default UserContainer;