import { createSelector } from "reselect";


const selectMovie = state => state.Movies;

console.log(selectMovie)

export const selectAllMovies = createSelector(
    [selectMovie], 
    (movie) => movie.Movies
)