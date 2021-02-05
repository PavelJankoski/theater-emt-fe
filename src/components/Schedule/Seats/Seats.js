import './Seats.css';
import {Link, useParams, withRouter} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import Moment from "react-moment";
import AvailableSeat from '../../../assets/images/available-seat.png';
import TakenSeat from '../../../assets/images/taken-seat.png';
import SelectedSeat from '../../../assets/images/selected-seat.png';
import ClipLoader from "react-spinners/ClipLoader";
import Seat from "./Seat/Seat";
import {Alert} from "react-bootstrap";

const Seats = (props) => {
    const {showId} = useParams();
    const [zeroSelectedSeats, setZeroSelectedSeats] = useState(false);

    useEffect(() => {
        document.title = "Theater | Seats";
        props.fetchShow(showId);
        props.fetchReservations(showId);
    }, []);


    const handleBuySelectedSeats = (e) => {
        e.preventDefault();
        let selectedSeats = [];
        let storage = sessionStorage;
        let selectedSeatsElements = document.getElementsByClassName("selected");
        if(selectedSeatsElements.length === 0) {
            setZeroSelectedSeats(true);
        }
        else{
            for(let i = 0 ; i<selectedSeatsElements.length;i++) {
                let seat = props.seats.flat().find(r => r.seatId.id === selectedSeatsElements[i].id);
                selectedSeats.push(`${selectedSeatsElements[i].id};${seat.seatRow};${seat.seatNo}`);
            }
            if(!storage.getItem('id')){
                storage = localStorage;
            }
            let userId = storage.getItem('id');
            const data = {
                showId: showId,
                userId: userId,
                ticketPrice: props.show.ticketPrice,
                selectedSeats: selectedSeats
            }
            props.makeReservation(data);
            props.history.push('/schedule');
        }

    }


    return (

        <div className="container-md bg-white fullWidth">

                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6"
                         style={{textAlign: 'center', paddingTop: '35px', "paddingBottom": '35px'}}>
                        <h2 className="mainTitle">
                            Select seats for {props.show.title}</h2>
                    </div>
                </div>
            {zeroSelectedSeats ?
                <Alert variant="danger" className="text-center">
                    Please select some seats before buying
                </Alert> : null}
            {props.show.scene ? <div className="p-4" style={{backgroundColor: '#f2f3f4', borderRadius: '.50rem', color: '#444444'}}>
                <div style={{borderWidth: '0 0 1px 0', borderStyle: 'solid', borderColor: '#444444', marginBottom: '40px'}}>
                    <div className="row" style={{fontSize: '17px'}}>
                        <div className="col-4">
                            <span>{props.show.scene ? props.show.scene.name : null}</span>
                        </div>
                        <div className="col-8 ml-auto" style={{textAlign: 'end', whiteSpace: 'nowrap'}}>
                            <Moment format="dddd, DD MMMM YYYY - HH:mm">
                                {props.show.from}
                            </Moment>h
                        </div>

                    </div>
                </div>
                <div className="p-3" style={{marginBottom: '20px'}}>
                    <div className="row">
                        <div className="col-2"/>
                        <div className="col-10 d-table"
                             style={{height: "50px", borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px', textAlign: 'center', borderWidth: '0 2px 2px 2px', borderStyle: 'solid', borderColor: '#444444'}}>
                            <h3 className="d-table-cell align-middle" style={{textTransform: 'uppercase'}}>Scene</h3>
                        </div>
                    </div>
                </div>

                <div className="seats">
                    {props.seats && props.reservations.length !== 0 ? props.seats.map((row, i) => (
                            <div className="p-3" key={i}>
                                <div className="row">
                                    <div className="col-2 pt-2 pb-2 d-table" style={{textAlign: 'center'}}>
                                        <span className="d-table-cell align-middle" style={{fontWeight:'bold'}}>{i + 1}</span>
                                    </div>
                                    <div className="col-10 text-center">

                                        {
                                            row.map((col, i) => {
                                                return <Seat key={i} id={col.seatId.id} reserved={col.status === "RESERVED"} />
                                                })
                                        }

                                    </div>
                                </div>
                            </div>
                        )
                    ) : null
                    }


                    <div className="legend row" style={{marginTop: '60px'}}>
                        <div className="col-4 text-center">
                            <img alt="available-seat" className="img-fluid" src={AvailableSeat}
                                 style={{transform: 'rotate(180deg)', maxWidth: '15%'}}/>
                            <span> - Available</span>
                        </div>
                        <div className="col-4 text-center">
                            <img alt="taken-seat" className="img-fluid" src={TakenSeat}
                                 style={{transform: 'rotate(180deg)', maxWidth: '15%'}}/>
                            <span> - Taken</span>
                        </div>
                        <div className="col-4 text-center">
                            <img alt="selected-seat" className="img-fluid" src={SelectedSeat}
                                 style={{transform: 'rotate(180deg)', maxWidth: '15%'}}/>
                            <span> - Selected</span>
                        </div>
                    </div>


                </div>
                <div className="row d-flex flex-row-reverse mr-2 mt-5">
                    <button onClick={handleBuySelectedSeats} className="btn btn-lg btn-primary" style={{marginRight: '5%'}}>Buy</button>
                    <div className="center mr-3">
                        <Link to={"/schedule"} className="btn btn-secondary btn-lg">Back</Link>
                    </div>
                </div>

            </div> : <div className="text-center w-100" style={{"marginTop": "20%"}}>
                <ClipLoader
                    size={150}
                    color="rgb(40,68,79)"/>
            </div>}


        </div>
    )
};

const mapStateToProps = state => {
    return {
        show: state.theaterReducer.currentShow,
        seats: state.theaterReducer.seats,
        reservations: state.reservationReducer.reservations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchShow: (showId) => dispatch(actions.fetchShow(showId)),
        fetchReservations: (showId) => dispatch(actions.fetchReservations(showId)),
        makeReservation: (data) => dispatch(actions.makeReservation(data))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Seats));
