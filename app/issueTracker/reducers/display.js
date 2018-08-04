const defaultState = {
    isSignedIn: false
    ,formToDisplay:"signup"
    ,userComponent: null
    ,isLoading: false
    ,loadingMessage:"Loading..."
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
            return {...state, isSignedIn: true, isLoading:false, loadingMessage:"Loading..."}
        case "SET_LOADING":
            return {...state, isLoading: action.isLoading, loadingMessage: action.loadingMessage}
        default:
            return state
    }
};

export default display;