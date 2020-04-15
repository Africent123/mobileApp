import { dispatch } from "rxjs/internal/observable/pairs"

export const DownloadAction = (progress) =>{
    
    return (dispatch) =>{
        dispatch({type: "DOWNLOAD_ACTION",
        payload: progress})
        
    }
}


export const ALL_DOWNLOAD = ({progress, movie }) =>{
    console.log(' whats going on ',progress, movie)
    return (dispatch) => {
        dispatch({type: "ALL_DOWNLOAD", payload: {
            progress: progress,
            movie: movie
        }})
    }
}


