import * as actionTypes from '../actionTypes';
import {API_DRIVER, setAuthToken} from "../../config";

export const fetchReservations = (showId) => {
    setAuthToken();
    return dispatch => {
        dispatch(fetchReservationsStart())
        API_DRIVER.get("reservations-api/reservations/all/" + showId).then((res)=> {
            dispatch(fetchReservationsSuccess(res.data));
        }).catch(err => {
            dispatch(fetchReservationsFail());
        });
    }
}

const fetchReservationsStart = () => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_START
    }
}



const fetchReservationsSuccess = (reservations) => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_SUCCESS,
        reservations: reservations
    }
}

const fetchReservationsFail = () => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_FAIL
    }
}



export const makeReservation = (data) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.put('reservations-api/reservations/auth/make-reservation', data).then((res) => {
            dispatch({type: actionTypes.MAKE_RESERVATION_SUCCESS, madeReservations: res.data});
        }).catch(err => {
            dispatch({type:actionTypes.MAKE_RESERVATION_FAIL})
        })
    }
}

export const resetErrorAndSuccess = () => {
    return {
        type: actionTypes.RESET_ERROR_AND_SUCCESS
    }
}

export const cancelReservation = (reservationId) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.put(`reservations-api/reservations/auth/cancel-reservation/${reservationId}`).then((res) => {
            dispatch({type: actionTypes.CANCEL_RESERVATION, id: reservationId});
        }).catch(err => {
            //
        })
    }
}
