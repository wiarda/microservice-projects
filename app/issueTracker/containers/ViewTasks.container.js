import React from 'react';
import { connect } from 'react-redux';
// import  from '';

const DEFAULT_STATE = {

};

class ViewTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
        this.renderTasks = this.renderTasks.bind(this)
    }

    renderTasks(tasksArray){
        console.log("rendering tasks", tasksArray)
        return tasksArray.map((el,ind) => {
            return (
                <li key={ind}>
                    {el.name}
                </li>
            )
        })
    }

    render(){
        return (
            <ul>
                {this.renderTasks(this.props.tasks)}
            </ul>
        
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