import './ScheduleList.css';
import {withRouter} from "react-router-dom";
import React, {useEffect} from "react";
import ScheduleItem from "./ScheduleItem/ScheduleItem";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import Response from "../Response/Response";

const ScheduleList = (props) => {
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Theater | Schedule`;
        props.fetchShows();
    }, []);

    const scheduledShows = props.shows.filter(s=>Date.now()<new Date(s.from)).map((show, index)=>{
            return(
                <ScheduleItem show={show} key={show.id.id}/>
            );
    })

    return (
        <div className="container-md bg-white fullWidth">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6"
                     style={{textAlign: 'center', paddingTop: '35px', "paddingBottom": '35px'}}>
                    <h2 className="mainTitle">
                        UPCOMING SHOWS</h2>
                </div>
            </div>
            {props.loading ? <div className="text-center w-100" style={{"marginTop": "20%"}}>
                    <ClipLoader
                        size={150}
                        color="rgb(40,68,79)"/>
                </div> : <React.Fragment>
                {scheduledShows.length===0 ? <Response icon={faInfoCircle} text="No upcoming shows in the next period" buttonText={null} link={null}/> : <div className="container" style={{paddingBottom: '50px'}}>

                    {scheduledShows}

                </div>}

            </React.Fragment>}

        </div>
    );
}

const mapStateToProps = state => {
    return {
        shows: state.theaterReducer.shows,
        loading: state.theaterReducer.loading,
        error: state.theaterReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchShows: () => dispatch(actions.fetchShows(""))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScheduleList));

