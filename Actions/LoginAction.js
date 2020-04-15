import Axios from "axios";
import decode from "jwt-decode";

import AsyncStorage from '@react-native-community/async-storage'




export const LoginAction = ({ email, password }) => {
  return dispatch => {
      return new Promise((resolve, reject) => {
        Axios.post("https://kannywoodtv.live/api/user/login", {
            email,
            password
          })
            .then(result => {
              console.log(result, "login sucess action", )
              const id =  decode(result.data.token);
              console.log(id, "decoded")
              dispatch({ type: "LOGIN_USER_SUCCESS", payload: id });
              AsyncStorage.setItem('token', result.data.token, (error) => {
                if(error){
                  console.log()
                }
              })
              return resolve ({success: true});
             
            })
            .catch(err => {
              dispatch({ type: "LOGIN_USER_FAIL" });
              return reject({message: err})
            });
      })
   
  };
};

export const LogoutAction = () => {
 AsyncStorage.removeItem('root')
  return {
    type: "LOG_OUT",
    
  };
}
