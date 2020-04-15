import axios from "axios";

export const MoviesAction = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://kannywoodtv.live/api/movies/all`)
        .then(result => {
          dispatch({ type: "Movies_Container", payload: result.data });
          
          if (result) {
          }
        })
        .catch(err => {
          return reject({ Error: err });
        });
    });
  };
};
