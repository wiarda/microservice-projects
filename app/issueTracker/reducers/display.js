const defaultState = {
    formToDisplay:"signup"
    ,isSignedIn: false
};

const display = (state=defaultState, action) => {
    switch (action.type) {
        case "TOGGLE_DISPLAYED_FORM":
            return {...state, formToDisplay: action.formToDisplay}
        case "TOGGLE_SIGNEDIN_STATE":
            return {...state, isSignedIn: action.isSignedIn}
        default:
            return state
    }
};

export default display;