import './TicketCartModal.css';
import {Modal, Button} from "react-bootstrap";
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const TicketCartModal = (props) => {

    const handleDeleteButton = (e) => {
        e.preventDefault();
        props.deleteShowById(props.id);
        props.handleClose();
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Bought tickets</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.madeReservations.length > 0 ? <table className="table">
                    <thead className="text-center">
                    <tr>
                        <th>Show name</th>
                        <th>Seat row</th>
                        <th>Seat number</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {props.shows.length !== 0 ? props.madeReservations.map((r, index) => {
                        return <tr key={r.id.id}>
                            <td>{props.shows.find(s=> s.id.id === r.showId.id).title}</td>
                            <td>{r.seatRow}</td>
                            <td>{r.seatNo}</td>
                            <td>{r.price.amount + " " + r.price.currency}</td>
                            <td><button className="btn btn-sm delete" onClick={() => props.cancelReservation(r.id.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                        </tr>
                    }) : null}
                    </tbody>
                </table> : <h3 className="text-center">You still haven't reserved any seats!</h3>}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
};


const mapStateToProps = state => {
    return {
        madeReservations: state.reservationReducer.madeReservations,
        shows: state.theaterReducer.shows
    };
};


const mapDispatchToProps = dispatch => {
    return {
        cancelReservation: (id) => dispatch(actions.cancelReservation(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketCartModal);
