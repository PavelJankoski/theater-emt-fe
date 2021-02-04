import './DeleteShowModal.css';
import {Modal, Button} from "react-bootstrap";
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";

const DeleteShowModal = (props) => {

    const handleDeleteButton = (e) => {
        e.preventDefault();
        props.deleteShowById(props.id);
        props.handleClose();
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure that you want to delete {props.title}?
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
        deleteShowById: (id) => dispatch(actions.deleteShowById(id))
    };
};

export default connect(null, mapDispatchToProps)(DeleteShowModal);
