const defaultState = {
    isLoggedIn: false
    ,username: null
}

const user = (state=defaultState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {...state, isLoggedIn:true}
        case "LOG_OUT":
            return {...state, isLoggedIn:false}
        default:
            return state
    }
};

export default user