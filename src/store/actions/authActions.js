import * as actionTypes from '../actionTypes';
import {API_DRIVER, setAuthToken} from "../../config";

export const authCheckState = () => {
    return dispatch => {
        if(!sessionStorage.getItem('token')){
            if (localStorage.getItem('token')) {
                const id = localStorage.getItem('id');
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('email');
                const name = localStorage.getItem('name');
                const surname = localStorage.getItem('surname');
                const userRole = localStorage.getItem('role');

                dispatch(authSuccess(id, token, email, name, surname ,userRole));
                API_DRIVER.get(`reservations-api/reservations/auth/by-user/${id}`).then(res => {
                    dispatch({type: actionTypes.RESERVATIONS_FOR_USER, madeReservations: res.data});
                }).catch(err => {
                    //
                });

            }
        }
        else{
            const id = sessionStorage.getItem('id');
            const token = sessionStorage.getItem('token');
            const email = sessionStorage.getItem('email');
            const name = sessionStorage.getItem('name');
            const surname = sessionStorage.getItem('surname');
            const userRole = sessionStorage.getItem('role');

            dispatch(authSuccess(id, token, email, name, surname ,userRole));
            setAuthToken();
            API_DRIVER.get(`reservations-api/reservations/auth/by-user/${id}`).then(res => {
                dispatch({type: actionTypes.RESERVATIONS_FOR_USER, madeReservations: res.data});
            }).catch(err => {
                //
            });

        }
    }
}

export const auth = (email, password, rememberMe) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        }
        API_DRIVER.post("user-api/auth/signin", authData).then(res => {
            let storage = sessionStorage;
            const responseData = res.data;
            if(rememberMe) {
                storage = localStorage;
            }
            storage.setItem('id', responseData.id);
            storage.setItem('token', responseData.accessToken);
            storage.setItem('email', responseData.email);
            storage.setItem('name', responseData.name);
            storage.setItem('surname', responseData.surname);
            storage.setItem('role', responseData.roles[0]);
            setAuthToken();
            dispatch(authSuccess(responseData.id, responseData.accessToken, responseData.email, responseData.name, responseData.surname, responseData.roles[0]));
            API_DRIVER.get(`reservations-api/reservations/auth/by-user/${responseData.id}`).then(res => {
                dispatch({type: actionTypes.RESERVATIONS_FOR_USER, madeReservations: res.data});
            }).catch(err => {
                //
            });
        }).catch(err => {
            dispatch(authFail());
        });
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (id, token, email, name, surname, role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        id: id,
        token: token,
        email: email,
        name: name,
        surname: surname,
        role: role
    }
}

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    }
}
export const setLoginError = error => {
    return {
        type: actionTypes.SET_LOGIN_ERROR,
        error: error
    }
}

export const logout = () => {
    let storage = sessionStorage;
    if(localStorage.getItem('token')) {
        storage = localStorage;
    }
    storage.removeItem('id');
    storage.removeItem('token');
    storage.removeItem('email');
    storage.removeItem('name');
    storage.removeItem('surname');
    storage.removeItem('role');

    return {
        type: actionTypes.LOGOUT
    }
}

