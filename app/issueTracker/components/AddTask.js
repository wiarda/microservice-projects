import React from 'react'
import InputField from './InputField'

const DEFAULT_STATE = {
    taskFeedback: null
}

export default class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = DEFAULT_STATE
    }

    addTaskHandler(e) {
        e.preventDefault()
        console.log("adding task")
        let form = new FormData(e.target)

        fetch("/api/tracker/addtask", {
            method:"POST"
            ,body: form
            ,credentials: "include"
        })
        .then(body=>body.json())
        .then(results=>{
            console.log(results)
        })
    }

    render() {
        return (
            <form action="/api/tracker/add" method="post" onSubmit={this.addTaskHandler}>

                <div className="form-group">
                    <h2>Add Task</h2>
                </div>

                <InputField
                    inputName="task"
                    displayName="Task"
                    inputType="text"
                    feedback={this.state.taskFeedback}
                    autoComplete="new-password"
                />

                <div className="form-group">
                    <button className="btn btn-primary" type="submit">
                        Add Task
                    </button>
                </div>


            </form>
        )
    }
}