import Axios from "axios";

export const changeName = ({_id,name,email,phoneNumber}) => {
    return (dispatch)=>{
        return new Promise ((resolve, reject)=>{
            Axios.put(`https://kannywoodtv.live/api/user/profile/edit/${_id}`, {name, email, phoneNumber})
            .then(result =>{
            if (result){
                console.log(result.data)
                dispatch({ type: "Change_name", payload: result.data });
                return resolve ({success: true});
            }
        })
        .catch(error =>{
            return reject({message: "something went wrong"})

        })

        })

    }
} 

