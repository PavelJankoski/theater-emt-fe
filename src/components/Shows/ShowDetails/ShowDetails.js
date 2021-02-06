import './ShowDetails.css';
import React, {useEffect, useState} from "react";
import {Link, useParams, withRouter} from "react-router-dom";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faStar, faTicketAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty}   from '@fortawesome/free-regular-svg-icons'
import ClipLoader from "react-spinners/ClipLoader";
import Rating from "react-rating";
import UnavailableImage from "../../../assets/images/unavailable-image.jpg";
import DeleteShowModal from "../../UI/Modal/DeleteShowModal/DeleteShowModal";

const ShowDetails = (props) => {
    const {showId} = useParams();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        props.fetchShow(showId);
        props.didRateShow(showId);
        props.getAvgAndCountForShow(showId);
    }, []);

    const handleRatingChange = (value) => {
        if(props.isAuthenticated) {
            const data = {
                userId: props.id,
                showId: showId,
                rating: value
            }
            props.rateShow(data);
        }
        else{
            props.history.push("/login");
        }
    }

    return (
        <div className="container-md bg-white fullWidth">
            {!props.loading && props.show.title ? <div className="container mb-4">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" id="titleArea">
                        <h2 className="mainTitle">{props.show.title} {props.role === "ROLE_ADMIN" ? <React.Fragment>
                            <Link to={"/shows/" + (showId) + "/edit"} className="btn btn-sm btn-primary"
                                  style={{fontSize: '27px', marginRight: '10px'}}><FontAwesomeIcon icon={faEdit}/>
                            </Link>
                            <Link to={"/shows"} onClick={(e) => {
                                e.preventDefault();
                                setShowDeleteModal(true)
                            }} className="btn btn-sm delete" style={{fontSize: '27px'}}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Link>
                        </React.Fragment> : null}</h2>


                    </div>
                </div>
                <div className="row">
                    <img className="col-xl-6"
                         src={!props.show.image ? UnavailableImage : 'data:image/jpeg;base64,' + props.show.image}
                         alt={props.show.title}/>

                    <div className="col-xl-6 details" style={{paddingLeft: '4%', paddingTop: '3%'}}>

                        <div className="row">
                            {props.role === "ROLE_ADMIN" ? <div className="col-12">
                                <div className="row float-right" style={{marginTop: '17px', marginRight: '10px'}}>


                                </div>
                            </div> : null}

                            <div className="col-12">
                                <div className="row align-items-center">
                                    <div className="col-7 ">
                                        <span style={{
                                            fontWeight: '500',
                                            fontSize: '1.8em',
                                            clear: 'left'
                                        }}>Ticket price: {props.show.ticketPrice.amount} {props.show.ticketPrice.currency}</span>
                                    </div>
                                    <div className="col-5 m-auto text-center" style={{paddingTop: '10px'}}>


                                        <div id="starRating">
                                            <Rating
                                                onChange={handleRatingChange}
                                                fractions={2}
                                                initialRating={props.averageRating}
                                                readonly={props.alreadyRated}
                                                emptySymbol=<FontAwesomeIcon color="rgb(250, 189, 100)" icon={faStarEmpty} size="2x"/>
                                                fullSymbol=<FontAwesomeIcon color="rgb(250, 189, 100)" icon={faStar} size="2x"/>
                                            />
                                            <div id="ratingText">({props.averageRating}/5) out of {props.totalRatings} rating(s)</div>
                                            {props.alreadyRated ? <span className="text-success">Thank you for your feedback!</span> : null}
                                        </div>


                                    </div>
                                </div>
                            </div>


                        </div>


                        <hr style={{paddingBottom: '8%', borderTop: '2px solid #555555'}}/>
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-xl-7 col-12">
                            <span className="showDetailNames"
                                  style={{position: 'relative', bottom: '20px'}}>Director: </span>
                                        <span
                                        style={{
                                            position: 'relative',
                                            bottom: '20px',
                                            whiteSpace: 'nowrap'
                                        }}>{props.show.director}</span>
                                        <br/>

                                        <span
                                            className={"showDetailNames " + (props.show.setDesigner === "" ? "d-none" : "")}>Set Designer: </span><span
                                        style={{whiteSpace: 'nowrap'}}>{props.show.setDesigner}</span>


                                        <br/>
                                        <span
                                            className={"showDetailNames " + (props.show.setDesigner === "" ? "d-none" : "")}>Costume Designer: </span><span
                                        style={{whiteSpace: 'nowrap'}}>{props.show.costumeDesigner}</span>
                                        <br/>
                                        <span className="showDetailNames">Duration: </span>
                                        <span
                                            style={{whiteSpace: 'nowrap'}}>{props.show.duration}</span>
                                        <br/>
                                        <span className="showDetailNames">Scene: </span>
                                        <span
                                            style={{whiteSpace: 'nowrap'}}>{props.show.scene ? props.show.scene.name : null}</span>
                                        <br/>
                                    </div>
                                    <div className="col-xl-5 col-12 my-3">
                                        <div className="panel panel-primary">
                                            <div className="card-header"
                                                 style={{
                                                     padding: '0.45rem!important',
                                                     textAlign: 'center',
                                                     backgroundColor: 'rgb(40,68,79)',
                                                     color: 'white',
                                                     fontSize: '1.3em'
                                                 }}>
                                                Actors
                                            </div>
                                            <ul className="list-group"
                                                style={{maxHeight: '147px', overflowY: 'scroll'}}>
                                                {props.show.actors ? props.show.actors.map((actor, index) => {
                                                    return (
                                                        <li key={actor.id.id}
                                                            className="list-group-item">{actor.fullName.firstName} {actor.fullName.lastName}</li>
                                                    );
                                                }) : null}
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div className="card">
                                    <div className="card-header"
                                         style={{
                                             padding: '0.45rem!important',
                                             textAlign: 'center',
                                             backgroundColor: 'rgb(40,68,79)',
                                             color: 'white',
                                             fontSize: '1.3em'
                                         }}>
                                        Description
                                    </div>
                                    <div className="card-body">
                                        <p>{props.show.description}</p>

                                    </div>
                                </div>
                                <div className="row justify-content-end mt-4">
                                    <Link to={"/shows"}
                                          style={{verticalAlign: 'middle'}}
                                          type="button" className="btn btn-secondary btn-lg">Back
                                    </Link>
                                    {Date.now()<new Date(props.show.from) ? <Link to={props.isAuthenticated ? "/schedule/" + showId + "/seats" : "/login"}
                                                                                  className="nav-link hoverableBox ml-3 mr-3 buyTicketsButton"><FontAwesomeIcon icon={faTicketAlt} /> Reserve</Link> : null}



                                </div>
                            </div>

                        </div>


                    </div>
                </div>
                <DeleteShowModal show={showDeleteModal} handleClose={()=>setShowDeleteModal(false)} toShows={()=>props.history.push("/shows")} title={props.show.title} id={props.show.id.id}/>
            </div> : <div className="text-center w-100" style={{"marginTop": "20%"}}>
                <ClipLoader
                    size={150}
                    color="rgb(40,68,79)"/>
            </div>
            }

        </div>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        show: state.theaterReducer.currentShow,
        loading: state.theaterReducer.loadingShow,
        role: state.authReducer.role,
        id: state.authReducer.id,
        averageRating: state.ratingReducer.average,
        totalRatings: state.ratingReducer.total,
        alreadyRated: state.ratingReducer.alreadyRated
    };
};


const mapDispatchToProps = dispatch => {
    return {
        fetchShow: (showId) => dispatch(actions.fetchShow(showId)),
        deleteShow: (showId) => dispatch(actions.deleteShowById(showId)),
        didRateShow: (showId) => dispatch(actions.didUserRateShow(showId)),
        getAvgAndCountForShow: (showId) => dispatch(actions.avgAndCountForShow(showId)),
        rateShow: (data) => dispatch(actions.rateShow(data))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowDetails));
