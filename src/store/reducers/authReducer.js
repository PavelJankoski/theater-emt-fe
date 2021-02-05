import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    id: null,
    token: null,
    email: null,
    role: null,
    name: null,
    surname: null,
    loginLoading: null,
    loginError: null
};

const authStart = (state, action) => {
    return updateObject(state, {
        loginLoading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        id: action.id,
        token: action.token,
        email: action.email,
        role: action.role,
        name: action.name,
        surname: action.surname,
        loginLoading: false,
        loginError: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        loginLoading: false,
        loginError: true
    })
}

const setLoginError = (state, action) => {
    return updateObject(state, {
        loginError: action.error
    })
}

const logout = (state, action) => {
    return updateObject(state, {
        id: null,
        token: null,
        email: null,
        role: null,
        name: null,
        surname: null,
        loginLoading: null,
        loginError: null
    })
}

const authReducer = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.SET_LOGIN_ERROR: return setLoginError(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        default: return state;
    }
};

export default authReducer;
