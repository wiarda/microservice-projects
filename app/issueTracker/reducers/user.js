const defaultState = {
    username: "user"
    , tasks: []
}

const user = (state = defaultState, action) => {
    switch (action.type) {
        case "LOAD_USER":
            return { username: action.username, tasks: action.tasks }
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.newTask] }
        case "EDIT_TASK":
            return taskSelector(state,action.task)
        default:
            return state
    }
};

export default user


function taskSelector(state, task) {
    let id = task._id
    let index
    state.tasks.some((el, ind) => {
        if (el._id === id) {
            index = ind
            return true
        }
    })
    let tasks = [...state.tasks]
    let status = tasks[index].status
    status = status == "Open" ? "Complete" : "Open"
    tasks[index].status = status
    return { ...state, tasks }

}