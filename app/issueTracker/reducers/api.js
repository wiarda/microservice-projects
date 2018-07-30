const DEFAULT = {
    response: {type:null}
};

const api = (state=DEFAULT, action)=>{
    switch (action.type){
        case "CLEAR_RESPONSE":
            return {type:null}
        case "LOAD_RESPONSE":
            return action.body
        default:
            return state
    }
};

export default api;