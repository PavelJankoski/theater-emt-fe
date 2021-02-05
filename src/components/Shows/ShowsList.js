import './ShowsList.css'
import {Link, withRouter} from "react-router-dom";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import ShowCard from "./ShowCard/ShowCard";
import Search from "./Search/Search";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import Response from "../Response/Response";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteShowModal from "../UI/Modal/DeleteShowModal/DeleteShowModal";

const ShowList = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentShowId, setCurrentShowId] = useState("");

    const handleCloseDeleteShowModal = () => setShowDeleteModal(false);
    const handleShowDeleteShowModal = () => setShowDeleteModal(true);
    const handleWhichShow = (id, title) => {
        setCurrentShowId(id);
        setCurrentTitle(title);
    }

    useEffect(() => {
        document.title = `Theater | Shows`;
        props.fetchShows("");
    }, []);

    const allShows = props.shows.map((show, index) => {
        return (
            <ShowCard show={show}
                      key={show.id.id}
                      handleShowDeleteShowModal={handleShowDeleteShowModal}
                      handleWhichShow={handleWhichShow}/>
        );
    })

    return (
        <div className="container-md bg-white fullWidth">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{textAlign: 'center', paddingTop: '35px'}}>
                    <h2 className="mainTitle">FEATURED SHOWS</h2>
                </div>
                <div id="cover" className="col-12 col-sm-12 col-md-6 col-lg-6 mt-2">
                    <Search/>
                </div>
            </div>
            {props.loading ? <div className="text-center w-100" style={{"marginTop": "20%"}}>
                <ClipLoader
                    size={150}
                    color="rgb(40,68,79)"/>
            </div> : <React.Fragment>{props.shows.length !== 0 || props.error ? <div className="cards mt-2 w-100">
                    {allShows}
                    <DeleteShowModal show={showDeleteModal} handleClose={handleCloseDeleteShowModal} toShows={()=>{}} title={currentTitle} id={currentShowId}/>
                </div>
                : <div className="w-100 text-center">
                    <Response icon={faSearch}
                              text={"No shows found"}
                              link={null}
                              buttonText={null}/>
                </div>} {props.role === "ROLE_ADMIN" ? <div className="w-100 text-right">
                <Link to={"/shows/create"} className="btn btn-lg btn-primary mb-4"
                      style={{fontSize: '1.3em', "marginRight": "10.5%"}}>
                    <FontAwesomeIcon icon={faPlus}/> Create Show
                </Link>
            </div>: null}</React.Fragment>}

        </div>
    )
};

const mapStateToProps = state => {
    return {
        shows: state.theaterReducer.shows,
        loading: state.theaterReducer.loading,
        error: state.theaterReducer.error,
        role: state.authReducer.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchShows: () => dispatch(actions.fetchShows(""))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowList));
