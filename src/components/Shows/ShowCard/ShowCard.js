import './ShowCard.css';
import UnavailableImage from '../../../assets/images/unavailable-image.jpg';
import {Link} from "react-router-dom";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleRight, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";

const ShowCard = (props) => {
    return(
        <div className="containerC"
             style={{backgroundImage: `url(${props.show.image ? 'data:image/jpeg;base64,' + props.show.image : UnavailableImage})`, backgroundSize: '100% 100%'}}>
            <div className="overlay">
                <div className="items"/>
                <div className="items head">
                    <div className="row">
                        <div className="col-6" style={{margin:'0 0 5px 5px'}}>
                            <p>{props.show.title}</p>
                        </div>
                        <div className="col-12"><hr/></div>
                    </div>
                </div>
                <div className="items descriptionC">

                    <p>{props.show.description}</p>
                </div>
                <div className="items cardFooter">
                    <Link to={"shows/" + props.show.id.id + "/details"} className="btn btn-sm btn-primary mb-4 p-2" style={{fontSize: '1.3em'}}>More
                        details <FontAwesomeIcon icon={faAngleDoubleRight}/></Link>
                    {props.role === "ROLE_ADMIN" ? <React.Fragment>
                        <Link to={"shows/" + props.show.id.id + "/edit"} className="btn btn-sm btn-primary" style={{fontSize: '27px', margin: '0 6px 23px 90px'}}><FontAwesomeIcon icon={faEdit}/> </Link>
                        <button className="btn btn-sm delete" style={{fontSize: '27px', marginBottom: '23px', cursor: 'pointer'}}><FontAwesomeIcon icon={faTrash}/> </button>
                    </React.Fragment> : null}

                    </div>
            </div>
        </div>);
}

const mapStateToProps = state => {
    return {
        role: state.authReducer.role
    };
};



export default connect(mapStateToProps)(ShowCard);
