import Axios from "axios";


export const get_profile_data = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Axios.get(`https://kannywoodtv.live/api/user/profile/${id}`)
        .then(result => {
          dispatch({ type: "Data_Fetched_Success", payload: result.data });
          return resolve(result.data);
        })
        .catch(error => {
          // dispatch({type: "Data_Fetched_Failed", payload: error})
          return reject(error);
        });
    });
  };
};

export const Change_name_email = (id, userData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Axios.put(
        `https://kannywoodtv.live/api/user/profile/edit/${id}`,
        userData
      )
        .then(result => {
          dispatch({
            type: "Name_Email_Changed_Success",
            payload: result.data.data
          });
          return resolve(result.data);
        })
        .catch(error => {
          dispatch({ type: "Name_Email_Changed_Server_error" });
          return reject(error);
        });
    });
  };
};

export const Change_password = (id, passwordData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Axios.put(
        `https://kannywoodtv.live/api/user/profile/password/${id}`,
        passwordData
      )
        .then(result => {
          if (result.data.success) {
            dispatch({
              type: "Password_Changed_Success",
            });
            return resolve(result.data);
          } else {
            dispatch({
              type: "Password_Changed_Failed",
            });
            return resolve(result.data);
          }
        })
        .catch(error => {
          dispatch({
            type: "Password_Changed_Failed"
          });
          return reject(error);
        });
    });
  };
};
