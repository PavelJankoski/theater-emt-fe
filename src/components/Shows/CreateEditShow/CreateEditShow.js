import './CreateEditShow.css';
import {Link, Redirect, useHistory, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import CreateSceneModal from "../../UI/Modal/CreateSceneModal/CreateSceneModal";
import CreateActorModal from "../../UI/Modal/CreateActorModal/CreateActorModal";
import * as actions from "../../../store/actions";
import DeleteActorModal from "../../UI/Modal/DeleteActorModal/DeleteActorModal";

const CreateEditShow = (props) => {
    const [showSceneModal, setShowSceneModal] = useState(false);
    const [showActorModal, setShowActorModal] = useState(false);
    const [showDeleteActorModal, setShowDeleteActorModal] = useState(false);
    const [currentActor, setCurrentActor] = useState({fullName: {firstName: "", lastName: ""}});
    const [show, setShow] = useState(
        {
            title: "",
            description: "",
            director: "",
            setDesigner: "",
            costumeDesigner: "",
            from: "",
            duration: "",
            ticketPrice: {
                currency: "MKD",
                amount: ""
            }

        }
    )

    const handleCloseSceneModal = () => setShowSceneModal(false);
    const handleCloseActorModal = () => setShowActorModal(false);
    const handleCloseDeleteActorModal = () => {
        setCurrentActor({fullName: {firstName: "", lastName: ""}});
        setShowDeleteActorModal(false);
    }

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Theater | Create Show`;
        props.fetchScenes();
        props.fetchActors();
    }, []);


    const todayDate = new Date().toLocaleDateString().split("/");

    const year = todayDate[2];
    const month = todayDate[0].length !== 1 ? todayDate[0] : ("0" + todayDate[0]);
    const day = todayDate[1].length !== 1 ? todayDate[1] : ("0" + todayDate[1]);

    const handleInputChange = (e) => {
        setShow({...show, [e.target.name]: e.target.value});
    }

    const extractSelectedActors = () => {
        const selectedActors = [];
        const actorCheckboxes = document.getElementsByName("actor");
        for(let i = 0 ; i<actorCheckboxes.length;i++) {
            if (actorCheckboxes[i].checked) {
                selectedActors.push(props.actors.find(a=>a.id.id === actorCheckboxes[i].value))
            }
        }
        return selectedActors
    }


    const handleCreateShow = (e) => {
        e.preventDefault();
        const dateAndTime = e.target.showDate.value + "T" + e.target.showTime.value + ":00";
        const tmpShow = {...show, from: dateAndTime, scene: props.scenes.find(s => s.id.id === e.target.showScene.value), actors: extractSelectedActors()};
        let formData = new FormData();
        formData.append('show', JSON.stringify(tmpShow));
        formData.append('image', e.target.showPicture.files[0]);
        props.createShow(formData);
        props.history.push('/shows');
    }


    const renderScenes = props.scenes.map((scene, idx) => {
        return (
            <option key={scene.id.id} value={scene.id.id}>{scene.name} ({scene.capacity})</option>
        );
    });

    const renderActors = props.actors.map((actor, idx) => {
        return (
            <div className="checkbox" key={actor.id.id}>
                <label><input type="checkbox" name="actor" value={actor.id.id}
                              style={{marginRight: '7px'}}/>{actor.fullName.firstName} {actor.fullName.lastName}
                    <button onClick={(e) => {
                        e.preventDefault();
                        setCurrentActor(actor);
                        setShowDeleteActorModal(true);
                    }} className="btn btn-danger btn-sm" style={{marginLeft: '15px'}}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </label>
            </div>
        );

    });

    return (
        <div className="container-md bg-white fullWidth">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" id="titleArea">
                    <h2 className="mainTitle">
                        Create Show</h2>
                </div>
            </div>

            <Form className="container" onSubmit={handleCreateShow}>
                <Form.Group controlId="title">
                    <Form.Label>Show title</Form.Label>
                    <Form.Control type="text"
                                  name="title"
                                  value={show.title}
                                  onChange={handleInputChange}
                                  placeholder="Enter show title" required/>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Show description</Form.Label>
                    <Form.Control name="description"
                                  value={show.description}
                                  onChange={handleInputChange}
                                  as="textarea"
                                  rows={4}
                                  placeholder="Enter show description" required/>
                </Form.Group>

                <div className="row">
                    <div className="col-md-6 col-12">
                        <Form.Group controlId="director">
                            <Form.Label>Director</Form.Label>
                            <Form.Control type="text"
                                          name="director"
                                          value={show.director}
                                          onChange={handleInputChange}
                                          placeholder="Enter show director" required/>
                        </Form.Group>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <Form.Group controlId="setDesigner">
                            <Form.Label>Set designer</Form.Label>
                            <Form.Control type="text"
                                          name="setDesigner"
                                          value={show.setDesigner}
                                          onChange={handleInputChange}
                                          placeholder="Enter set designer" />
                        </Form.Group>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <Form.Group controlId="costumeDesigner">
                            <Form.Label>Costume designer</Form.Label>
                            <Form.Control type="text"
                                          name="costumeDesigner"
                                          value={show.costumeDesigner}
                                          onChange={handleInputChange}
                                          placeholder="Enter costume designer" />
                        </Form.Group>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <span>Actors:</span>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-10">
                                <div className="checkbox-list">
                                    {renderActors}
                                </div>
                            </div>
                            <div className="col-2 text-center m-auto">
                                <button type="button" onClick={() => setShowActorModal(true)}
                                        className="btn btn-sm btn-primary p-2"
                                        style={{borderRadius: '50%', marginBottom: '20%'}}><FontAwesomeIcon icon={faPlus} size="lg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-10">

                        <label htmlFor="showScene">Select scene:</label>
                        <select className="form-control" name="showScene" id="showScene">
                            {renderScenes}
                        </select>
                    </div>
                    <div className="col-2 text-center m-auto">
                        <button id="createSceneButton" type="button" onClick={() => setShowSceneModal(true)}
                                className="btn btn-sm btn-primary p-2 mt-4" style={{borderRadius: '50%'}}><FontAwesomeIcon icon={faPlus} size="lg"/> </button>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-6 col-12">
                        <Form.Group controlId="showDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date"
                                          min={year + "-" + month + "-" + day}
                                          name="showDate" required/>
                        </Form.Group>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                        <Form.Group controlId="showTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time"
                                          name="showTime" required/>
                        </Form.Group>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                        <Form.Group controlId="duration">
                            <Form.Label>Duration (in minutes)</Form.Label>
                            <Form.Control type="number"
                                          value={show.duration}
                                          onChange={handleInputChange}
                                          name="duration"
                                          min="1" placeholder="Enter show duration" required/>
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-12">
                        <Form.Group controlId="ticketPrice">
                            <Form.Label>Ticket price</Form.Label>
                            <Form.Control type="number"
                                          value={show.ticketPrice.amount}
                                          onChange={(e) => setShow({...show, ticketPrice: {...show.ticketPrice, amount: e.target.value}})}
                                          name="ticketPrice" placeholder="Enter ticket price for this show" min="1" required/>
                        </Form.Group>
                    </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <Form.Group controlId="currency">
                                    <Form.Label>Currency</Form.Label>
                                    <Form.Control as="select"
                                                  onChange={(e) => setShow({...show, ticketPrice: {...show.ticketPrice, currency: e.target.value}})}
                                                  value={show.ticketPrice.currency}
                                                  name="currency">
                                        <option>MKD</option>
                                        <option>EUR</option>
                                        <option>USD</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>

                    <div className="col-md-3 col-12">
                        <Form.Group>
                            <Form.File className="mt-1" id="showPicture" name="showPicture" label="Show picture" accept="image/*" required/>
                        </Form.Group>
                    </div>
                </div>

                <div className="row d-flex flex-row-reverse mr-3 mt-4 mb-4">
                    <input type="submit" className="btn btn-lg btn-primary" value="Create show"/>
                    <div className="center mr-3">
                        <Link to={"/shows"} className="btn btn-secondary btn-lg">Back</Link>
                    </div>
                </div>
            </Form>
            <CreateSceneModal show={showSceneModal} handleClose={handleCloseSceneModal}/>
            <CreateActorModal show={showActorModal} handleClose={handleCloseActorModal}/>
            <DeleteActorModal show={showDeleteActorModal} handleClose={handleCloseDeleteActorModal} actor={currentActor}/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        scenes: state.theaterReducer.scenes,
        actors: state.theaterReducer.actors
    };
};


const mapDispatchToProps = dispatch => {
    return {
        createShow: (formData) => dispatch(actions.createShow(formData)),
        fetchScenes: () => dispatch(actions.fetchScenes()),
        fetchActors: () => dispatch(actions.fetchActors()),
        deleteActor: (actorId) => dispatch(actions.deleteActor(actorId))
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEditShow));
