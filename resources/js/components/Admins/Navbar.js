import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

class Navbar extends Component {
    logout(e) {
        e.preventDefault();
        localStorage.removeItem("adminsToken");
        this.props.history.push(`/adminsLogin`);
    }
    render() {

        const Navbar=<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
            Navbar
        </a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <Link class="nav-link" to="/home">
                        Home <span class="sr-only">(current)</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        href="/adminsLogin"
                        onClick={this.logout.bind(this)}
                    >
                        logout
                    </a>
                </li>
            </ul>
        </div>
    </nav>
        return (
            <div> {localStorage.adminsToken ? Navbar : <Redirect to='/adminsLogin' ></Redirect>} </div>
        );
    }
}

export default  withRouter(Navbar) ;
