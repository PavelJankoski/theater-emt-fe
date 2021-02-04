import './CreateSceneModal.css';
import {Modal, Button, Form} from "react-bootstrap";
import {useState} from "react";
import * as actions from "../../../../store/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const CreateSceneModal = (props) => {
    const [scene, setScene] = useState({name: "", capacity: "", seatsInRow: ""})
    const handleSaveScene = (e) => {
        e.preventDefault();
        props.createScene(scene);
        setScene({name: "", capacity: "", seatsInRow: ""});
        props.handleClose();
    }

    const handleInputChange = (e) => {
        setScene({...scene, [e.target.name]: e.target.value});
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Scene</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Scene name</Form.Label>
                        <Form.Control type="text" name="name" value={scene.name} onChange={handleInputChange} placeholder="Enter scene name" required/>
                    </Form.Group>
                    <Form.Group controlId="capacity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control type="number" name="capacity" value={scene.capacity} onChange={handleInputChange} placeholder="Enter scene capacity" required/>
                    </Form.Group>
                    <Form.Group controlId="seatsInRow">
                        <Form.Label>Seats in row</Form.Label>
                        <Form.Control type="number" name="seatsInRow" value={scene.seatsInRow} onChange={handleInputChange} placeholder="Enter number of seats in row" required/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveScene}>
                    Save Scene
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createScene: (scene) => dispatch(actions.createScene(scene))
    };
};

export default withRouter(connect(null, mapDispatchToProps)(CreateSceneModal));
