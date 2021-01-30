import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link, NavLink, withRouter} from "react-router-dom";
import Logo from '../../../assets/images/logo2.jpg';
import './Navbar.css';
import {connect} from "react-redux";
import * as actions from "../../../store/actions";

const navbar = (props) => {
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="white" variant="light" style={{borderBottom: '4px solid rgb(40,68,79)'}}>
                <div className="container-md">
                    <Navbar.Brand as={Link} to={'/'}><img src={Logo} width="90" height="65" alt="logo"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to={'/'} exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} to={'/shows'}>Shows</Nav.Link>
                        <Nav.Link as={NavLink} to={'/schedule'}>Schedule</Nav.Link>
                        <Nav.Link as={NavLink} to={'/contact'}>Contact</Nav.Link>

                    </Nav>
                    <Nav>


                        {props.isAuthenticated ? <React.Fragment>
                            <Nav.Link as={NavLink} to={'/schedule'} className="buyTicketsButton mr-3">Buy tickets</Nav.Link>
                            <NavDropdown title={props.fullName} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => {props.logout()}}>Log out</NavDropdown.Item>
                        </NavDropdown>
                        </React.Fragment> : <React.Fragment>
                            <Nav.Link as={NavLink} to={'/login'} >Login</Nav.Link>
                            <Nav.Link as={NavLink} to={'/register'} >Register</Nav.Link>
                        </React.Fragment> }

                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
        </React.Fragment>

    )

}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        fullName: state.authReducer.name + " " + state.authReducer.surname
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbar));
