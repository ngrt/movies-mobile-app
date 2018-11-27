import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/updateObject";

const initialState = {
    movies: [],
    error: null,
    loading: false,
};


const fetchMoviesStart = (state, action) => {
    return updateObject(state, {loading: true})
};

const fetchMoviesSuccess = (state, action) => {
    return updateObject(state, {movies: action.movies, loading: false})

};

const fetchMoviesFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES_START: return fetchMoviesStart(state, action);
        case actionTypes.FETCH_MOVIES_SUCCESS: return fetchMoviesSuccess(state, action);
        case actionTypes.FETCH_MOVIES_FAIL: return fetchMoviesFail(state, action);
        default: return state
    }
};

export default reducer;