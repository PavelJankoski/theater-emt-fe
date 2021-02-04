import './CreateActorModal.css';
import {Button, Form, Modal} from "react-bootstrap";
import * as actions from "../../../../store/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const CreateActorModal = (props) => {
    const handleSaveActor = (e) => {
        e.preventDefault();
        const actor = {
            fullName: {
                firstName: e.target.actorName.value,
                lastName: e.target.actorSurname.value
            }
        };
        props.createActor(actor);
        props.handleClose();
    }
    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Form onSubmit={handleSaveActor}>
            <Modal.Header closeButton>
                <Modal.Title>Create Actor</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                    <Form.Group controlId="actorName">
                        <Form.Label>Actor name</Form.Label>
                        <Form.Control type="text" name="actorName" placeholder="Enter actor name" required/>
                    </Form.Group>
                    <Form.Group controlId="actorSurname">
                        <Form.Label>Actor surname</Form.Label>
                        <Form.Control type="text" name="actorSurname" placeholder="Enter actor surname" required/>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <button type="submit" className="btn btn-primary">Save Actor</button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
}


const mapDispatchToProps = dispatch => {
    return {
        createActor: (actor) => dispatch(actions.createActor(actor))
    };
};

export default connect(null, mapDispatchToProps)(CreateActorModal);
