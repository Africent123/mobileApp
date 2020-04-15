import { createSelector } from "reselect";


const selectDownload = state => state.Download;



export const selectDownloadPercentage = createSelector(
    [selectDownload], 
    (percent) => Math.floor(Number(percent.progress) * 100)
)

export const selectDownloadWithoutPercentage = createSelector(
    [selectDownload], 
    (percent) =>  Number(percent.progress)
)


export const selectAllDownload = createSelector(
    [selectDownload],
    (data) => console.log("all mighty data", data.all_download) 
)