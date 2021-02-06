import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, withRouter} from "react-router-dom";
import React from "react";
import * as PropTypes from "prop-types";

const Response = (props) => {
    return (
        <div className="text-center mt-5">
            <FontAwesomeIcon className="mb-4" icon={props.icon} size="10x" color="rgb(40,68,79)"/>
            <h2 className="text-secondary">{props.text}<br/>{props.buttonText ? <Link to={props.link}>{props.buttonText}</Link> : null }</h2>
        </div>
    )
}

Response.propTypes = {
    icon: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string,
    buttonText: PropTypes.string
}

export default withRouter(Response);
