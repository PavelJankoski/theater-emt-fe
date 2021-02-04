import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    shows: [],
    scenes: [],
    actors: [],
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

const deleteShowSuccess = (state, action) => {
    let tmpShows = [...state.shows];
    tmpShows = tmpShows.filter(s=>s.id.id !== action.id);
    return updateObject(state, {
        shows: tmpShows
    })
}



const createShowSuccess = (state, action) => {
    let tmpShows = [...state.shows];
    tmpShows.push(action.show);
    return updateObject(state, {
        shows: tmpShows
    })
}

const fetchScenesSuccess = (state, action) => {
    return updateObject(state, {
        scenes: action.scenes
    })
}

const createSceneSuccess = (state, action) => {
    let tmpScenes = [...state.scenes];
    tmpScenes.push(action.scene);
    return updateObject(state, {
        scenes: tmpScenes
    })
}

const fetchActorsSuccess = (state, action) => {
    return updateObject(state, {
        actors: action.actors
    })
}

const createActorSuccess = (state, action) => {
    let tmpActors = [...state.actors];
    tmpActors.push(action.actor);
    return updateObject(state, {
        actors: tmpActors
    })
}

const deleteActorSuccess = (state, action) => {
    let tmpActors = [...state.actors];
    tmpActors = tmpActors.filter(a=>a.id.id !== action.id);
    return updateObject(state, {
        actors: tmpActors
    })
}




const theaterReducer = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SHOWS_START: return fetchShowsStart(state,action);
        case actionTypes.FETCH_SHOWS_SUCCESS: return fetchShowsSuccess(state,action);
        case actionTypes.FETCH_SHOWS_FAIL: return fetchShowsFail(state,action);
        case actionTypes.DELETE_SHOW_SUCCESS: return deleteShowSuccess(state,action);
        case actionTypes.CREATE_SHOW_SUCCESS: return createShowSuccess(state,action);
        case actionTypes.FETCH_SCENES_SUCCESS: return fetchScenesSuccess(state,action);
        case actionTypes.CREATE_SCENE_SUCCESS: return createSceneSuccess(state,action);
        case actionTypes.FETCH_ACTORS_SUCCESS: return fetchActorsSuccess(state,action);
        case actionTypes.CREATE_ACTOR_SUCCESS: return createActorSuccess(state,action);
        case actionTypes.DELETE_ACTOR_SUCCESS: return deleteActorSuccess(state,action);

        default: return state;
    }
};
export default theaterReducer;
