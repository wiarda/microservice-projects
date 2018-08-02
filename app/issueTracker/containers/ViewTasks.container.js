import React from 'react';
import { connect } from 'react-redux';
// import  from '';

const DEFAULT_STATE = {

};

class ViewTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    render(){
        return(
            <div>{this.props.tasks}</div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        tasks: state.user.tasks
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

const ViewTasksContainer = connect(mapStateToProps, mapDispatchToProps)(ViewTasks);
export default ViewTasksContainer;