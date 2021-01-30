import React, {useEffect, useState} from 'react';
import './Login.css';
import '../../../index.css';
import {connect} from "react-redux";
import * as actions from '../../../store/actions/index';
import {InputGroup, Form, Button, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link, withRouter} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const {setLoginError} = props;

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Theater | Login`;
        setLoginError();
    }, [setLoginError]);


    const handleLogIn = (e) => {
        e.preventDefault();
        props.signIn(email, password, rememberMe);
    }


    return (
        <div className='container-md bg-white fullWidth'>
            <div className="loginForm">
                <h2 className="text-center mb-4 mainTitle">Log in</h2>
                {props.loading ? <div className="text-center mt-5">
                    <ClipLoader
                        size={150}
                        color="rgb(40,68,79)"/>
                </div> : <React.Fragment>
                    {props.error ?
                        <Alert variant="danger">
                            Login failed. Please try again
                        </Alert> : null}
                    <Form onSubmit={handleLogIn}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="email">
                                    <FontAwesomeIcon icon={faUser}/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text"
                                          name="email"
                                          value={email}
                                          placeholder="Enter email"
                                          onChange={e => setEmail(e.target.value)} required>
                            </Form.Control>
                        </InputGroup>
                        <InputGroup className="mt-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="password">
                                    <FontAwesomeIcon icon={faKey}/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="password"
                                          name="password"
                                          value={password}
                                          placeholder="Enter password"
                                          onChange={e => setPassword(e.target.value)} required>
                            </Form.Control>
                        </InputGroup>

                        <div className="text-left mb-2">
                            <Form.Group onClick={() => setRememberMe(!rememberMe)}>
                                <Form.Check type="checkbox"
                                            className="my-3"
                                            label="Remember me"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                            name="rememberMe"/>
                            </Form.Group>
                        </div>
                        <Button className="authButton"
                                type="submit" block>Log In</Button>
                    </Form>
                    <div className="text-center">
                        <span>Don't have an account? <Link to="/register">Register</Link></span>
                    </div>
                </React.Fragment>}


            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loginLoading,
        error: state.authReducer.loginError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (email, password, rememberMe) => dispatch(actions.auth(email, password, rememberMe)),
        setLoginError: () => dispatch(actions.setLoginError(false))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
