import './ScheduleItem.css';
import {Link, withRouter} from "react-router-dom";
import Moment from "react-moment";
import UnavailableImage from "../../../assets/images/unavailable-image.jpg";
import Logo from '../../../assets/images/logo-without-text.jpg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTicketAlt} from "@fortawesome/free-solid-svg-icons";

const ScheduleItem = (props) => {
    return (
        <div className="p-3" id="ticketsContainer">
            <div className="p-3" id="ticket">
                <div id="ticketDate">
                    <Moment format="DD MMMM YYYY">
                        {props.show.from}
                    </Moment>
                    <span> from </span>
                    <Moment format="HH:mm">
                        {props.show.from}
                    </Moment>

                </div>
                <div className="row">
                    <img className="col-12 col-md-4" style={{width: 'auto', height: '140px'}}
                         src={!props.show.image ? UnavailableImage : 'data:image/jpeg;base64,'+props.show.image}
                         alt={props.show.title}/>
                    <div className="col-12 col-md-5 mt-4"
                         style={{paddingLeft: '20px', color: '#444444', fontSize: '16px'}}>
                        <img style={{width: '30px', display: 'inline-block', marginRight: '5px'}} alt="logo" src={Logo}/>
                        <p id="ticketTitle">
                            {props.show.title}
                        </p>
                        <p style={{marginBottom: '4px !important'}}><span style={{fontWeight: 'bold'}}>Duration:</span> {props.show.duration} minutes</p>

                        {/*<Moment diff={Date.now()} unit="days">{props.show.from}</Moment>*/}

                        <p><span style={{fontWeight: 'bold'}}>Location:</span> {props.show.scene.name}</p>
                    </div>
                    <div className="col-12 col-md-3" style={{alignSelf: 'center'}}>
                        <div className="row pl-3 pr-3">
                            <Link to={"shows/" + props.showId + "/details"} className="btn btn-md btn-primary mt-3 p-2 col-5 col-md-12"
                                  style={{textAlign: 'center', whiteSpace: 'nowrap'}}>View show</Link>
                            <Link to={"/schedule/" + props.showId + "/seats"} className="btn btn-md  btn-primary mt-3 p-2 ml-auto col-5 col-md-12"
                                  style={{textAlign: 'center', whiteSpace: 'nowrap'}}>
                                <FontAwesomeIcon icon={faTicketAlt}/> Buy tickets
                            </Link>


                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withRouter(ScheduleItem);
