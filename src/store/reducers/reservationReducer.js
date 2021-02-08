import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    reservations: [],
    madeReservations: [],
    loading: false,
    success: false,
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
    const tmpMadeReservations = [...state.madeReservations];
    return updateObject(state, {
        madeReservations: tmpMadeReservations.concat(action.madeReservations),
        error: false,
        success: true
    });
}

const makeReservationFail = (state, action) => {
    return updateObject(state, {
        error: true,
        success: false
    });
}

const resetErrorAndSuccess = (state, action) => {
    return updateObject(state, {
        error: false,
        success: false
    })
}

const reservationsForUser = (state, action) => {
    return updateObject(state, {
        madeReservations: action.madeReservations
    })
}

const cancelReservation = (state, action) => {
    return updateObject(state, {
        madeReservations: state.madeReservations.filter(r=>r.id.id !== action.id)
    })
}

const reservationReducer = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_RESERVATIONS_START: return fetchReservationsStart(state, action);
        case actionTypes.FETCH_RESERVATIONS_SUCCESS: return fetchReservationsSuccess(state, action);
        case actionTypes.FETCH_RESERVATIONS_FAIL: return fetchReservationsFail(state, action);
        case actionTypes.MAKE_RESERVATION_SUCCESS: return makeReservationSuccess(state, action);
        case actionTypes.MAKE_RESERVATION_FAIL: return makeReservationFail(state, action);
        case actionTypes.RESET_ERROR_AND_SUCCESS: return resetErrorAndSuccess(state, action);
        case actionTypes.RESERVATIONS_FOR_USER: return reservationsForUser(state, action);
        case actionTypes.CANCEL_RESERVATION: return cancelReservation(state, action);
        default: return state;
    }
};


export default reservationReducer;
