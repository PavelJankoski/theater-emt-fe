import './ShowsList.css'
import {Link, withRouter} from "react-router-dom";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import ShowCard from "./ShowCard/ShowCard";
import Search from "./Search/Search";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import Response from "../Response/Response";
import {fetchShows} from "../../store/actions";
import ClipLoader from "react-spinners/ClipLoader";

const ShowList = (props) => {

    useEffect(() => {
        document.title = `Theater | Shows`;
        props.fetchShows("");
    }, []);

    const allShows = props.shows.map((show, index) => {
        return (
            <ShowCard show={show} key={show.id.id}/>
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
                </div>
                : <div className="w-100 text-center">
                    <Response icon={faSearch}
                              text={"No shows found"}
                              link={null}
                              buttonText={null}/>
                </div>} {props.role === "ROLE_ADMIN" ? <div className="w-100 text-right">
                <Link to={"/shows/add"} className="btn btn-lg btn-primary"
                      style={{fontSize: '1.3em', "marginRight": "10.5%"}}>
                    <FontAwesomeIcon icon={faPlus}/> Create Show
                </Link>
            </div>: null}</React.Fragment>}







        </div>
    )
}

const mapStateToProps = state => {
    return {
        shows: state.showReducer.shows,
        loading: state.showReducer.loading,
        error: state.showReducer.error,
        role: state.authReducer.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchShows: () => dispatch(actions.fetchShows(""))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowList));
