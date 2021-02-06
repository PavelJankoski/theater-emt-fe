import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";
const initialState = {
    total: 0,
    average: 0,
    alreadyRated: false
};

const didUserRateShow = (state, action) => {
    return updateObject(state, {
        alreadyRated: action.alreadyRated
    })
}

const avgAndCountForShow = (state, action) => {
    return updateObject(state, {
        average: Math.round(action.avg * 10) / 10,
        total: action.count
    })
}

const rateShow = (state, action) => {
    let newTotal = state.total+1;
    let newAverage = (state.average * state.total + action.rating)/newTotal;
    return updateObject(state, {
        total: newTotal,
        average: newAverage,
        alreadyRated: true
    })
}

const ratingReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.DID_USER_RATE_SHOW: return didUserRateShow(state, action);
        case actionTypes.AVG_AND_COUNT_FOR_SHOW: return avgAndCountForShow(state, action);
        case actionTypes.GIVE_RATING_FOR_SHOW: return rateShow(state, action);
        default: return state;
    }

}

export default ratingReducer;
