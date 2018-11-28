import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/updateObject";

const initialState = {
    movies: [],
    error: null,
    loading: false,
    maxPage: 0
};


const fetchMoviesStart = (state) => {
    return updateObject(state, {loading: true})
};

const fetchMoviesSuccess = (state, action) => {
    return updateObject(state, {movies: [...state.movies, ...action.movies], maxPage: action.maxPage, loading: false})
};

const fetchMoviesFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
};

const clearMovies = (state) => {
    return updateObject(state, {movies: [], maxPage: 0})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES_START: return fetchMoviesStart(state);
        case actionTypes.FETCH_MOVIES_SUCCESS: return fetchMoviesSuccess(state, action);
        case actionTypes.FETCH_MOVIES_FAIL: return fetchMoviesFail(state, action);
        case actionTypes.CLEAR_MOVIES: return clearMovies(state);
        default: return state
    }
};

export default reducer;