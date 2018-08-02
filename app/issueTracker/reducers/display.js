const defaultState = {
    isSignedIn: false
    ,formToDisplay:"signup"
    ,userComponent: null
};

const display = (state=defaultState, action) => {
    switch (action.type) {
        case "TOGGLE_DISPLAYED_FORM":
            return {...state, formToDisplay: action.formToDisplay}
        case "TOGGLE_USER_LOCATION":
            return {...state, userComponent: action.userComponent}
        case "TOGGLE_SIGNEDIN_STATE":
            return {...state, isSignedIn: action.isSignedIn}
        case "LOAD_USER":
            return {...state, isSignedIn: true}
        default:
            return state
    }
};

export default display;