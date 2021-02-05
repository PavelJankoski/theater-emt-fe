import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    reservations: [],
    loading: false,
    error: false
};

const fetchReservationsStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: false
    })
}

const fetchReservationsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        reservations: action.reservations
    })
}

const fetchReservationsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true
    })
}

const makeReservationSuccess = (state, action) => {
    return state
}

const reservationReducer = (state = initialState, action ) => {
    switch ( action.type ) {
        //case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.FETCH_RESERVATIONS_START: return fetchReservationsStart(state, action);
        case actionTypes.FETCH_RESERVATIONS_SUCCESS: return fetchReservationsSuccess(state, action);
        case actionTypes.FETCH_RESERVATIONS_FAIL: return fetchReservationsFail(state, action);
        case actionTypes.MAKE_RESERVATION_SUCCESS: return makeReservationSuccess(state, action);
        default: return state;
    }
};


export default reservationReducer;
