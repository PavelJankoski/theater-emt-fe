import "./ShowCarousel.css";
import {Carousel} from "react-bootstrap";
import React, {useEffect} from "react";
import {connect} from 'react-redux';
import UnavailableImage from "../../../assets/images/unavailable-image.jpg";
import {withRouter} from "react-router-dom";
import * as actions from "../../../store/actions";
import ClipLoader from "react-spinners/ClipLoader";
import Response from "../../Response/Response";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const ShowCarousel = (props) => {
    useEffect(() => {
        document.title = `Theater | Home`;
        props.fetchShows("");
    }, []);

    return (
        <div className="container-md bg-white fullWidth overflow-hidden">
            {props.loading ? <div className="text-center" style={{"marginTop": "20%"}}>
                <ClipLoader
                    size={150}
                    color="rgb(40,68,79)"/>
            </div> : <React.Fragment>
                {!props.error && props.shows.length !== 0 ? <Carousel >
                    {props.shows.map((show, index) => <Carousel.Item key={show.id.id}>
                        <img
                            className="d-block w-100 carousel-image"
                            src={!show.image ? UnavailableImage : 'data:image/jpeg;base64,'+show.image}
                            alt={show.title}
                        />
                        <Carousel.Caption>
                            <h3>{show.title}</h3>
                            <p>{show.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>)}
                </Carousel> : <Response icon={faSearch} text={"No shows found"} buttonText={null} link={null} />}
            </React.Fragment>}

        </div>


    );
}

const mapStateToProps = state => {
    return {
        shows: state.theaterReducer.shows,
        loading: state.theaterReducer.loading,
        error: state.theaterReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShows: () => dispatch(actions.fetchShows(""))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowCarousel));

