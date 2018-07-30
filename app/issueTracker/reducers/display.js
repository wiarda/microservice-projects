const defaultState = {
    formToDisplay:"signup"
    ,signedIn: false
};

const display = (state=defaultState, action) => {
    switch (action.type) {
        case "TOGGLE_DISPLAYED_FORM":
            return {...state, formToDisplay: action.formToDisplay}
        case "TOGGLE_SIGNEDIN_STATE":
            return {...state, signedIn: action.signedIn}
        default:
            return state
    }
};

export default display;