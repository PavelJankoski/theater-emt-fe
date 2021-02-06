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

export const fetchShow = (showId) => {
    return dispatch => {
        dispatch(fetchShowStart())
            API_DRIVER.get("theater-api/shows/all/" + showId).then((resp) => {
                API_DRIVER.get("reservations-api/reservations/all/" + showId).then((res)=>{
                    dispatch(fetchShowSuccess(resp.data, calculateRows(resp.data, res.data)));
                }).catch(err => {
                    //
                })
            }).catch(() => {
                dispatch(fetchShowFail());
            })

    }
}

const fetchShowStart = () => {
    return {
        type: actionTypes.FETCH_SHOWS_START
    }
}

const calculateRows = (show, reservations) => {
    let rows;
    if(show.scene.capacity%show.scene.seatsInRow === 0){
        rows = show.scene.capacity/show.scene.seatsInRow;
    }
    else{
        rows = Math.floor(show.scene.capacity/show.scene.seatsInRow) + 1;
    }
    let cnt = 0;
    let allSeats =[];
    for(let i = 0 ;i<rows;i++){
        let oneRow = [];
        for(let j = 0 ;j<show.scene.seatsInRow;j++){
            oneRow.push({...reservations[cnt], seatNo: j+1, seatRow:i+1});
            cnt++;
            if(cnt===reservations.length){
                break;
            }
        }

        allSeats.push(oneRow);

    }
    return allSeats;
}

const fetchShowSuccess = (show, seats) => {
    return {
        type: actionTypes.FETCH_SHOW_SUCCESS,
        show: show,
        seats: seats
    }
}

const fetchShowFail = () => {
    return {
        type: actionTypes.FETCH_SHOW_FAIL
    }
}

export const deleteShowById = (id) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.put("theater-api/shows/admin/delete/" + id).then(() => {
            dispatch(deleteShowSuccess(id));
        }).catch(() => {
            //
        });
    }
}

const deleteShowSuccess = (id) => {
    return {
        type: actionTypes.DELETE_SHOW_SUCCESS,
        id: id
    }
}


export const createShow = (formData) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.post("theater-api/shows/admin/create", formData).then((resp) => {
            dispatch(createShowSuccess(resp.data));
        }).catch(() => {
            //
        });
    }
}

const createShowSuccess = (show) => {
    return {
        type: actionTypes.CREATE_SHOW_SUCCESS,
        show: show
    }
}

export const editShow = (showId, formData) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.put("theater-api/shows/admin/edit/" + showId, formData).then((resp) => {
            dispatch(editShowSuccess(showId, resp.data));
        }).catch(() => {
            //
        });
    }
}

const editShowSuccess = (showId, show) => {
    return {
        type: actionTypes.EDIT_SHOW_SUCCESS,
        id: showId,
        show: show
    }
}

export const fetchScenes = () => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.get("theater-api/scenes").then((resp) => {
            dispatch(fetchScenesSuccess(resp.data));
        }).catch(() => {
            //
        })
    }
}
const fetchScenesSuccess = (scenes) => {
    return {
        type: actionTypes.FETCH_SCENES_SUCCESS,
        scenes: scenes
    }
}

export const createScene = (scene) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.post("theater-api/scenes", scene).then((resp) => {
            dispatch(createSceneSuccess(resp.data));
        }).catch(() => {
            //
        });
    }
}

const createSceneSuccess = (scene) => {
    return {
        type: actionTypes.CREATE_SCENE_SUCCESS,
        scene: scene
    }
}

export const fetchActors = () => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.get("theater-api/actors").then((resp) => {
            dispatch(fetchActorsSuccess(resp.data));
        }).catch(() => {
            //
        })
    }
}
const fetchActorsSuccess = (actors) => {
    return {
        type: actionTypes.FETCH_ACTORS_SUCCESS,
        actors: actors
    }
}

export const createActor = (actor) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.post("theater-api/actors", actor).then((resp) => {
            dispatch(createActorSuccess(resp.data));
        }).catch(() => {
            //
        });
    }
}

const createActorSuccess = (actor) => {
    return {
        type: actionTypes.CREATE_ACTOR_SUCCESS,
        actor: actor
    }
}

export const deleteActor = (actorId) => {
    setAuthToken();
    return dispatch => {
        API_DRIVER.put(`theater-api/actors/${actorId}/delete`).then(() => {
            dispatch(deleteActorSuccess(actorId));
        }).catch(()=> {
            //
        });
    }
}

const deleteActorSuccess = (actorId) => {
    return {
        type:actionTypes.DELETE_ACTOR_SUCCESS,
        id: actorId
    }
}
