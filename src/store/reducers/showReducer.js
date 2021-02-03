import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    shows: [],
    loading: false,
    error: false
};

const fetchShowsStart = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: true
    })
}

const fetchShowsSuccess = (state, action) => {
    return updateObject(state, {
        shows: action.shows,
        loading: false
    })
}

const fetchShowsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true
    })
}

const showReducer = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SHOWS_START: return fetchShowsStart(state,action);
        case actionTypes.FETCH_SHOWS_SUCCESS: return fetchShowsSuccess(state,action);
        case actionTypes.FETCH_SHOWS_FAIL: return fetchShowsFail(state,action);
        default: return state;
    }
};
export default showReducer;
