import * as actionTypes from './actionTypes';
import axios from '../../axios-tmdb';

const URL_SEARCH_MOVIES = '/search/movie';

export const fetchMoviesStart = () => {
  return {
      type: actionTypes.FETCH_MOVIES_START
  }
};

export const fetchMoviesSuccess = (moviesArray, maxPage) => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        movies: moviesArray,
        maxPage: maxPage
    }
};

export const fetchMoviesFail = (error) => {
  return {
      type: actionTypes.FETCH_MOVIES_FAIL,
      error: error
  }
};

export const fetchMovies = (name, page) => {
    return dispatch => {
        dispatch(fetchMoviesStart());
        axios.get(URL_SEARCH_MOVIES, {params: {query: name, page: page}})
            .then(response => {
                dispatch(fetchMoviesSuccess(response.data.results, response.data.total_pages))
            })
            .catch(error => {
                dispatch(fetchMoviesFail(error));
            });
    }
};

export const clearMoviesStart = () => {
    return {
        type: actionTypes.CLEAR_MOVIES
    }
};

export const clearMovies = () => {
    return dispatch => {
        dispatch(clearMoviesStart())
    }
};