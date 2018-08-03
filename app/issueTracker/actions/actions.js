// display actions
export const signIn = () => ({ type: "TOGGLE_SIGNEDIN_STATE", isSignedIn:true });
export const signOut = () => ({ type: "TOGGLE_SIGNEDIN_STATE", isSignedIn:false });
export const displaySignInForm = () => ({ type: "TOGGLE_DISPLAYED_FORM", formToDisplay:"signin" });
export const displaySignUpForm = () => ({ type: "TOGGLE_DISPLAYED_FORM", formToDisplay:"signup" });
export const toggleUserComponent = (userComponent=null) => ({type:"TOGGLE_USER_LOCATION", userComponent})

// api actions
export const clearResponse = () => { return { type: "CLEAR_RESPONSE" } };
export const loadResponse = (jsonResponse = {}) => { return { type: "LOAD_RESPONSE", jsonResponse } };

// user actions
export const loadUserInformation = (username, tasks) => ({type:"LOAD_USER", username, tasks})
export const addTask = task => ({
    type: "ADD_TASK"
    ,newTask: task
});
