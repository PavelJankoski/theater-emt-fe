import * as actionTypes from '../actionTypes';
import {API_DRIVER, setAuthToken} from "../../config";

export const fetchShows = (term) => {
    return dispatch => {
        dispatch(fetchShowsStart())
        if(term === ""){
            API_DRIVER.get("theater-api/shows/all").then((resp) => {
                dispatch(fetchShowsSuccess(resp.data));
            }).catch(() => {
                dispatch(fetchShowsFail());
            })
        }
        else {
            API_DRIVER.get("theater-api/shows/all?term=" + term).then((resp) => {
                dispatch(fetchShowsSuccess(resp.data));
            }).catch(() => {
                dispatch(fetchShowsFail());
            })
        }

    }
}

const fetchShowsStart = () => {
    return {
        type: actionTypes.FETCH_SHOWS_START
    }
}

const fetchShowsSuccess = (shows) => {
    return {
        type: actionTypes.FETCH_SHOWS_SUCCESS,
        shows: shows
    }
}

const fetchShowsFail = () => {
    return {
        type: actionTypes.FETCH_SHOWS_FAIL
    }
}
