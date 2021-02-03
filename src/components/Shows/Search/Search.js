import './Search.css';
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import {useState} from "react";

const Search = (props) => {
    const [term, setTerm] = useState("");

    const checkTerm = (term) => {
        if(term === "") {
            props.fetchShows(term);
        }
        setTerm(term);
    }

    const searchShowsHandler = (e) => {
        e.preventDefault();
        props.fetchShows(term);
    }

    return (
        <form onSubmit={searchShowsHandler}>
            <div className="tb">
                <div className="td tdi">
                    <input type="text"
                           onChange={(e) => {checkTerm(e.target.value)}}
                           id="search"
                           name="searchTerm"
                           placeholder="Search"
                           aria-label="Search"/>
                </div>
                <div className="td" id="s-cover">
                    <button type="submit">
                        <div id="s-circle"/>
                        <span id="btnSpan"/>
                    </button>
                </div>
            </div>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShows: (term) => dispatch(actions.fetchShows(term))
    };
};

export default connect(null, mapDispatchToProps)(Search);
