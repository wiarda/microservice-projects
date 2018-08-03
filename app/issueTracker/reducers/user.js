const defaultState = {
    username: "user"
    ,tasks: []
}

const user = (state=defaultState, action) => {
    switch (action.type) {
        case "LOAD_USER":
            return {username: action.username, tasks: action.tasks}
        case "ADD_TASK":
            return {...state, tasks: [...state.tasks, action.newTask]}
        default:
            return state
    }
};

export default user