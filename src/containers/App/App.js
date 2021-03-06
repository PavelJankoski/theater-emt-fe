import React, {useEffect, useState} from "react";
import './App.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import Navbar from "../../components/UI/Navbar/Navbar";
import Login from "../../components/Auth/Login/Login";
import Footer from "../../components/UI/Footer/Footer";
import Register from "../../components/Auth/Register/Register";
import Contact from "../../components/Contact/Contact";
import ShowCarousel from "../../components/UI/Carousel/ShowCarousel";
import Response from "../../components/Response/Response";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import ShowList from "../../components/Shows/ShowsList";
import ScheduleList from "../../components/Schedule/ScheduleList";
import CreateEditShow from "../../components/Shows/CreateEditShow/CreateEditShow";
import ShowDetails from "../../components/Shows/ShowDetails/ShowDetails";
import Seats from "../../components/Schedule/Seats/Seats";
import TicketCartModal from "../../components/UI/Modal/TicketCartModal/TicketCartModal";

function App(props) {
    const [showTicketModal, setShowTicketModal] = useState(false);
    useEffect(() => {
        props.onTryAutoSignIn();
    }, []);

    const handleTicketModalClose = () => setShowTicketModal(false);
    const handleTicketModalShow = () => setShowTicketModal(true);

    let routes = (
        <Switch>
            <Route exact path="/login" render={() => (
                !props.isAuthenticated
                    ? <Login />
                    : <Redirect to='/' />
            )} />

            <Route exact path="/register" render={() => (
                !props.isAuthenticated
                    ? <Register />
                    : <Redirect to='/' />
            )} />
            <Route exact path="/">
                <ShowCarousel/>
            </Route>
            <Route exact path="/shows">
                <ShowList/>
            </Route>
            <Route exact path="/shows/create" render={() => (
                props.isAuthenticated && props.role === "ROLE_ADMIN"
                    ? <CreateEditShow isEdit={false}/>
                    : <Redirect to='/' />
            )} />
            <Route exact path="/shows/:showId/edit" render={() => (
                props.isAuthenticated && props.role === "ROLE_ADMIN"
                    ? <CreateEditShow isEdit={true}/>
                    : <Redirect to='/' />
            )} />
            <Route exact path="/shows/:showId/details">
                <ShowDetails/>
            </Route>
            <Route exact path="/schedule">
                <ScheduleList/>
            </Route>
            <Route exact path="/schedule/:showId/seats" render={() => (
                props.isAuthenticated
                    ? <Seats/>
                    : <Redirect to='/' />
            )} />
            <Route exact path="/contact">
                <Contact/>
            </Route>
            <Route exact path="/not-found">
                <div className="container-md bg-white fullWidth overflow-hidden">
                    <Response icon={faExclamationCircle}
                              text={"Error 404: Page not found!"}
                              link={"/"}
                              buttonText={"Back to Home"}/>
                </div>
            </Route>
            <Redirect to="/not-found"/>
        </Switch>
    );

    return (

        <React.Fragment>
            <div className="background"/>
            <Navbar handleTicketModalShow={handleTicketModalShow}/>
            {routes}
            <Footer/>
            <TicketCartModal show={showTicketModal} handleClose={handleTicketModalClose}/>
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
        onTryAutoSignIn: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
