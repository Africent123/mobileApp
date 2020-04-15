const Initial_State = {
    progress: "",
    all_download: [],
}

export default Download_Reducer = (state= Initial_State, action) =>{
    switch(action.type){
        case "DOWNLOAD_ACTION":
            return {...state, progress: action.payload}
        case "ALL_DOWNLOAD":
        //    state.all_download.push("teS")
            // console.log("Payload .....++++++++++++", action.payload, )
            return { ...state,  all_download: [...state, action.payload] }
        default:
            return state
    }
}