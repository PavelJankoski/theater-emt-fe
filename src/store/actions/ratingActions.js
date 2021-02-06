import {API_DRIVER, setAuthToken} from "../../config";
import * as actionTypes from '../actionTypes';

export const didUserRateShow = (showId) => {
    setAuthToken();
    let storage = localStorage;
    if(!storage.getItem("id")){
        storage = sessionStorage;
    }
    return dispatch => {
        API_DRIVER.get(`ratings-api/ratings/auth/exists?showId=${showId}&userId=${storage.getItem("id")}`).then((resp) => {
            dispatch({type: actionTypes.DID_USER_RATE_SHOW, alreadyRated: resp.data})
        }).catch(() => {
            //
        })

    }
}

export const avgAndCountForShow = (showId) => {
    return dispatch => {
        API_DRIVER.get(`ratings-api/ratings/avg/${showId}`).then((resp) => {
            if(resp.data.length!==0){
                dispatch({type: actionTypes.AVG_AND_COUNT_FOR_SHOW, avg: resp.data[0][0], count: resp.data[0][1]});
            }
            else {
                dispatch({type: actionTypes.AVG_AND_COUNT_FOR_SHOW, avg: 0, count: 0})
            }

        }).catch(() => {
            //
        })
    }

}

export const rateShow = (data) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.post(`ratings-api/ratings/auth/create`, data).then((resp) => {
                dispatch({type: actionTypes.GIVE_RATING_FOR_SHOW, rating: resp.data})
        }).catch(() => {
            //
        })
    }

}
