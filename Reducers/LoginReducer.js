
const INITIAL_STATE = {
    Auth: "",
    Error:'',
    Success:"",
    token:null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'Email_and_Password':
        return { ...state, Auth: action.payload };
      case 'LOGIN_USER_FAIL':
        // console.log(action.type, "fail")
        return { ...state, Error:"Authentication Failed", password: '' };
      case 'LOGIN_USER_SUCCESS':
          // console.log(action.type, "Success")
        return{ ...state, Success: "Successfull", token:action.payload};
      case "LOG_OUT":
        return {...state, token: null};
      default:
          console.log(action.type, "Default")      
        return state;
    }
};
  