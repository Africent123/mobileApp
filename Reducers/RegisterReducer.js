const INITIAL_STATE = {
  Error: "",
  Success: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REGISTERING_USER_FAIL":
      console.log(action.type, "fail");
      return { ...state, Error: "Registration Failed", password: "" };
    case "REGISTERING_USER_SUCCESS":
      console.log(action.type, "Success");
      return {
        ...state,
        Success: "Registration Successful",
        data: action.payload
      };
    default:
      console.log(action.type, "Default");
      return state;
  }
};
