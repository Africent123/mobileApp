import Axios from "axios";

export const RegistrationAction = (data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Axios.post("https://kannywoodtv.live/api/user/register", {
        ...data
      })
        .then(result => {
            console.log(result)
            dispatch({type: "REGISTERING_USER_SUCCESS", payload: data})
            return resolve(result.data)
        })
        .catch(error => {
            console.log(error)
            dispatch({type: "REGISTERING_USER_FAIL" })
            return reject({success: false})
        });
    });
  };
};
