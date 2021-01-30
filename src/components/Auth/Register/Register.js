import React, {useEffect, useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {API_DRIVER} from "../../../config";
import './Register.css';
import ClipLoader from "react-spinners/ClipLoader";


const Register = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Theater | Register`;
        setError(false);
        setSuccess(false);
        setFail(false);
    }, []);

    let result = (
        <div className="text-center mt-5">
            <FontAwesomeIcon className="mb-4" icon={faThumbsUp} size="10x" color="rgb(40,68,79)"/>
            <h2 className="text-secondary">You are Successfully Registered! <Link to="/login">Log in</Link></h2>
        </div>
    );

    if (fail) {
        result = (
            <div className="text-center mt-5">
                <FontAwesomeIcon className="mb-4" icon={faThumbsDown} size="10x" color="rgb(40,68,79)"/>
                <h2 className="text-secondary">Sorry, we couldn't register you. Please try again later</h2><Link to="/">Back
                to home</Link>
            </div>
        );
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            setError(true);
        } else {
            setLoading(true);
            const registerData = {
                name: name,
                surname: surname,
                email: email,
                password: password,
                roles: ["user"]
            }
            API_DRIVER.post("user-api/auth/register", registerData).then(() => {
                setSuccess(true);
            }).catch(err => {
                setFail(true);
            }).then(() => {
                setLoading(false);
            });
        }
    }

    return (
        <div className='container-md bg-white fullWidth'>
            <div className="registerForm">

                {success ? result : null}
                {fail ? result : null}

                {!success && !fail ?
                    <React.Fragment>
                        <h2 className="text-center mb-4 mainTitle">Create account</h2>
                        {!loading ? <React.Fragment>
                            {error ?
                                <Alert variant="danger">
                                    The passwords you entered did not match, please try again
                                </Alert> : null}
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Enter your name"
                                                  name="name"
                                                  value={name}
                                                  onChange={e => setName(e.target.value)}
                                                  required/>
                                </Form.Group>
                                <Form.Group controlId="surname">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Enter your surname"
                                                  name="surname"
                                                  value={surname}
                                                  onChange={e => setSurname(e.target.value)}
                                                  required/>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email"
                                                  placeholder="Enter email"
                                                  name="email"
                                                  value={email}
                                                  onChange={e => setEmail(e.target.value)}
                                                  required/>
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                                  placeholder="Enter password"
                                                  name="password"
                                                  value={password}
                                                  onChange={e => setPassword(e.target.value)}
                                                  required/>
                                </Form.Group>
                                <Form.Group controlId="re-password">
                                    <Form.Label>Re-type Password</Form.Label>
                                    <Form.Control type="password"
                                                  placeholder="Re-type password"
                                                  name="rePassword"
                                                  value={rePassword}
                                                  onChange={e => setRePassword(e.target.value)}
                                                  required/>
                                </Form.Group>

                                <Button className="authButton"
                                        type="submit" block>Register</Button>
                            </Form>
                            <div className="text-center">
                                <span>Already have an account? <Link to="/login">Log in</Link></span>
                            </div>
                        </React.Fragment> : <div className="text-center mt-5">
                            <ClipLoader
                                size={150}
                                color="rgb(40,68,79)"/>
                        </div>}

                    </React.Fragment> : null}


            </div>
        </div>
    )
}


export default withRouter(Register)
