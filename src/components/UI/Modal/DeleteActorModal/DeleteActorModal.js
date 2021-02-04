import './DeleteActorModal.css';
import {Modal, Button} from "react-bootstrap";
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";

const DeleteActorModal = (props) => {

    const handleDeleteButton = (e) => {
        e.preventDefault();
        props.deleteActor(props.actor.id.id);
        props.handleClose();
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {props.actor.fullName.firstName} {props.actor.fullName.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure that you want to delete {props.actor.fullName.firstName} {props.actor.fullName.lastName}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeleteButton}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
};



const mapDispatchToProps = dispatch => {
    return {
        deleteActor: (id) => dispatch(actions.deleteActor(id))
    };
};

export default connect(null, mapDispatchToProps)(DeleteActorModal);
