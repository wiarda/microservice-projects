// display actions
export const signIn = () => ({ type: "TOGGLE_SIGNEDIN_STATE", signedIn:true });
export const signOut = () => ({ type: "TOGGLE_SIGNEDIN_STATE", signedIn:false });
export const displaySignInForm = () => ({ type: "TOGGLE_DISPLAYED_FORM", formToDisplay:"signin" });
export const displaySignUpForm = () => ({ type: "TOGGLE_DISPLAYED_FORM", formToDisplay:"signup" });

// api actions
export const clearResponse = () => { return { type: "CLEAR_RESPONSE" } };
export const loadResponse = (jsonResponse = {}) => { return { type: "LOAD_RESPONSE", jsonResponse } };


