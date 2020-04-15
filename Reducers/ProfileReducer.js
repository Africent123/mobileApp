const InitialState = {
    Profile: [],
  };

export default (state = InitialState, action)=>{
    switch(action.type){
        case "Data_Fetched_Success":
            return{...state, Profile: action.payload}
        case "Data_Fetched_Failed":
            return{...state, Profile: action.payload}
        case "Password_Changed_Success":
            return state;
        case "Password_Changed_Failed":
            return state;
        case "Name_Email_Changed_Success":
            return{...state, Profile: action.payload}
        case "Name_Email_Changed_Failed":
            return{...state, Profile: action.payload}
            case "Name_Email_Changed_Server_error":
                return{...state, Profile: action.payload}
        default:
            return state;
    }

}


