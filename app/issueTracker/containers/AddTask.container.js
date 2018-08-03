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
    , addedTasks: []
    , pickDate: false
}

class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = DEFAULT_STATE
        this.addTaskHandler = this.addTaskHandler.bind(this)
    }

    addTaskHandler(e) {
        e.preventDefault()
        console.log("adding task")
        let form = new FormData(e.target)


        fetch("/api/tracker/addtask", {
            method: "POST"
            , body: form
            , credentials: "include"
        })
            .then(body => body.json())
            .then(results => {
                console.log(results)
                this.props.addTask(results.newTask)
            })

        this.setState({ addedTasks: [...this.state.addedTasks, e.target.task.value] })
    }


    displayNewlyAddedTasks(taskArray) {
        if (taskArray.length === 0) return null
        else {
            return taskArray.map((el, ind) => {
                return (
                    <div className="form-group" key={ind}>
                        <span className="btn cursor--grab">
                            {`${ind + 1}. ${el}`}
                            <i class="material-icons text-success">
                                check
                            </i>
                        </span>
                        <span className="btn float-right cursor--grab pr-0">
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
