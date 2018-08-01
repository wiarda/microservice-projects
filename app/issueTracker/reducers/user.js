const defaultState = {
    username: "user"
    ,tasks: []
}

const user = (state=defaultState, action) => {
    switch (action.type) {
        case "LOAD_USER":
            return {username: action.username, tasks: action.tasks}
        default:
            return state
    }
};

export default user