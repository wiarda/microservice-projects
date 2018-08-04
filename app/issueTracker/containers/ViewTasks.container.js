import React from 'react';
import { connect } from 'react-redux';
import { editTask } from '../actions/actions';

// redux store bindings
const mapStateToProps = (state, ownProps) => {
    return {
        tasks: state.user.tasks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTaskStatus: (task) => dispatch(editTask(task))
    };
};


const DEFAULT_STATE = {
    filter: "status"
    , status: "All" // enum: All, Open, Complete, Archived
    , listWidth: "100%"
};

class ViewTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
        this.renderTasks = this.renderTasks.bind(this)
        this.filterTasks = this.filterTasks.bind(this)
        this.filterHandler = this.filterHandler.bind(this)
        this.statusToggleHandler = this.statusToggleHandler.bind(this)
    }

    statusToggleHandler(e){
        console.log("status toggle");
        let id = e.target.id
        let task = this.props.tasks.find(el=>{
            return el._id === id
        })
        console.log(task)
        this.props.toggleTaskStatus(task)
    }

    filterTasks(taskArray) {
        switch (this.state.filter) {
            case "status":
                return taskArray.filter(el => {
                    if (this.state.status === "All" && el.status != "Archived") return true
                    else return el.status === this.state.status
                })
            // add date filters
        }
    }

    renderTasks(tasksArray) {
        // console.log("rendering tasks", tasksArray)
        return tasksArray.map((el, ind) => {
            return (
                <div 
                    key={ind} 
                    id={el._id} 
                    data-strike={el.status}
                    className="row view-tasks__task px-0 mx-0" 
                    onClick={this.statusToggleHandler}
                >
                    {el.name}
                </div>
            )
        })
    }

    filterHandler(e) {
        this.setState({ status: e.target.value })
    }

    componentDidMount() {
        console.log("view tasks component update");
        let listWidth = document.getElementById("task-list").getBoundingClientRect().width
        this.setState({ listWidth: listWidth + "px" })
    }

    render() {
        let filteredTasks = this.filterTasks(this.props.tasks)
        let tasks = this.renderTasks(filteredTasks)
        return (
            <React.Fragment>
                <div className="form-group">
                    <select className="form-control mx-auto view-tasks__select-dropdown" onChange={this.filterHandler}>
                        <option value="All">Show all tasks</option>
                        <option value="Open">Show open tasks</option>
                        <option value="Complete">Show completed tasks</option>
                    </select>
                </div>

                <div style={{ width: this.state.listWidth }} id="task-list"
                    className="container-fluid no-gutters view-tasks__tasks-list"
                >
                    {tasks}
                </div>

            </React.Fragment>
        )
    }
}



const ViewTasksContainer = connect(mapStateToProps, mapDispatchToProps)(ViewTasks);
export default ViewTasksContainer;