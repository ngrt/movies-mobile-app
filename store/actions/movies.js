import * as actionTypes from './actionTypes';
import axios from '../../axios-tmdb';

const URL_SEARCH_MOVIES = '/search/movie';

export const fetchMoviesStart = () => {
  return {
      type: actionTypes.FETCH_MOVIES_START
  }
};

export const fetchMoviesSuccess = (moviesArray) => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        movies: moviesArray
    }
};

export const fetchMoviesFail = (error) => {
  return {
      type: actionTypes.FETCH_MOVIES_FAIL,
      error: error
  }
};

export const fetchMovies = (name) => {
    return dispatch => {
        dispatch(fetchMoviesStart());
        axios.get(URL_SEARCH_MOVIES, {params: {query: name}})
            .then(response => {
                console.log(response);
                dispatch(fetchMoviesSuccess(reponse.data.movies))
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchMoviesFail(error));
            });
    }
};