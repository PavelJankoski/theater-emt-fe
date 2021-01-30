import React, {useEffect} from "react";
import './App.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import Navbar from "../../components/UI/Navbar/Navbar";
import Login from "../../components/Auth/Login/Login";
import Footer from "../../components/Footer/Footer";
import Register from "../../components/Auth/Register/Register";
import Contact from "../../components/Contact/Contact";

function App(props) {
    useEffect(() => {
        props.onTryAutoSignIn();
    }, []);
    let routes = (
        <Switch>

            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/register">
                <Register/>
            </Route>
            <Route exact path="/contact">
                <Contact/>
            </Route>
            <Redirect to="/contact"/>
        </Switch>
    );
    if (props.isAuthenticated) {
        if (props.role === "ROLE_ADMIN") {
            routes = (
                <Switch>
                    <Route exact path="/contact">
                        <Contact/>
                    </Route>
                    <Redirect to="/contact"/>
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route exact path="/contact">
                        <Contact/>
                    </Route>
                    <Redirect to="/contact"/>
                </Switch>
            );
        }
    }
    return (

        <React.Fragment>

            <div className="background"/>
            <Navbar/>
            {routes}
            <Footer/>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        role: state.authReducer.role,
        token: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState()),
        // logoutUser: () => dispatch(actions.logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
