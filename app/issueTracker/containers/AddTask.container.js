import React from 'react'
import InputField from '../components/InputField'
import { connect } from 'react-redux'
import { addTask } from '../actions/actions'

const mapDispatchToProps = dispatch => {
    return {
        addTask: (task) => dispatch(addTask(task))
    }
}

const DEFAULT_STATE = {
    taskFeedback: null
    , taskValidity:  null
    , addedTasks: []
    , addedStatus: []
    , pickDate: false
}

class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = DEFAULT_STATE
        this.addTaskHandler = this.addTaskHandler.bind(this)
        this.clearTask = this.clearTask.bind(this)
        this.validateTask = this.validateTask.bind(this)
    }

    validateTask(task){
        if (task.length === 0) {
            this.setState({taskFeedback:"Please enter a task", taskValidity:"is-invalid"})
            return false
        }
        else {
            this.setState({taskFeedback:null, taskValidity:"is-valid"})
            return true
        }
    }

    clearTask(){
        this.setState({taskValidity:null})
    }

    addTaskHandler(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        let task = e.target.task.value

        if (!this.validateTask(task)) return

        fetch("/api/tracker/addtask", {
            method: "POST"
            , body: form
            , credentials: "include"
        })
            .then(body => body.json())
            .then(results => {
                console.log("results", results)

                this.setState({ addedStatus: [...this.state.addedStatus.slice(0, -1), true] })
                this.props.addTask(results.newTask)
            })

        // clear field task value
        e.target.task.value = ""
        
        this.setState({
            addedTasks: [...this.state.addedTasks, task]
            , addedStatus: [...this.state.addedStatus, false]
            , taskValidity: null
            , taskFeedback:null
        })
    }


    displayNewlyAddedTasks(taskArray) {
        if (taskArray.length === 0) return null
        else {
            return taskArray.map((el, ind) => {
                return (
                    <div key={ind}>
                        <span className="btn cursor--text text-left add-task__item text-truncate" data-loaded={this.state.addedStatus[ind]}>
                            {`${ind + 1}. ${el}`}
                        </span>
                        <span className="btn float-right cursor--text pr-0 add-task__success-indicator">
                            <i
                                className="material-icons text-success align-bottom float-right"
                                data-visibility={this.state.addedStatus[ind]}
                            >
                                check
                            </i>
                        </span>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <form action="/api/tracker/add" method="post" onSubmit={this.addTaskHandler}>

                <div className="form-group">
                    <h2>Add a Task</h2>
                </div>

                {this.displayNewlyAddedTasks(this.state.addedTasks)}

                <InputField
                    inputName="task"
                    displayName="Task"
                    inputType="text"
                    feedback={this.state.taskFeedback}
                    autoComplete="new-password"
                    showLabel={false}
                    validity={this.state.taskValidity}
                    onClick={this.clearTask}
                    onBlur={this.validateTask}
                />

                {/* <InputField
                    inputName="due"
                    displayName="Due date"
                    inputType="date"
                    feedback={this.state.dueFeedback}
                    autoComplete="new-password"
                /> */}

                <div className="form-group">
                    <button className="btn btn-primary" type="submit">
                        Add Task
                    </button>
                </div>


            </form>
        )
    }
}




const AddTaskContainer = connect(null, mapDispatchToProps)(AddTask)
export default AddTaskContainer
