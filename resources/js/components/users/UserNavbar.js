import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "../../../css/admins/navbar.css";

class UserNavbar extends Component {
    logout(e) {
        e.preventDefault();
        localStorage.removeItem("user_token");
        this.props.history.push(`/users/login`);
    }
    render() {
        const authLink = (
            <Fragment>
                <li class="nav-item">
                    <a
                        class="nav-link logout"
                        href="/adminsLogin"
                        onClick={this.logout.bind(this)}
                    >
                        <FontAwesomeIcon
                            icon="angle-double-left"
                            className="icon"
                        />
                        logout
                    </a>
                </li>
                <li class="nav-item ">
                    <Link class="nav-link" to="/users/get/categories">
                        <FontAwesomeIcon icon="users" className="icon" />
                        categories
                    </Link>
                
                </li>
                <li class="nav-item ">
                    <Link class="nav-link" to="/users/get/items">
                        <FontAwesomeIcon icon="users" className="icon" />
                        items
                    </Link>
                </li>
            </Fragment>
        );

        const notAuthLink = (
            <Fragment>
                <li class="nav-item ">
                    <Link class="nav-link" to="/users/login">
                        <FontAwesomeIcon icon="briefcase" className="icon" />
                        login
                    </Link>
                </li>
                <li class="nav-item ">
                    <Link class="nav-link" to="/users/signup">
                        <FontAwesomeIcon icon="users" className="icon" />
                        sign up
                    </Link>
                </li>
            </Fragment>
        );

        const user_navbar = (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
                                <FontAwesomeIcon icon="home" className="icon" />
                                Home <span class="sr-only">(current)</span>
                            </Link>
                        </li>

                        {localStorage.user_token ? authLink : notAuthLink}
                    </ul>
                </div>
            </nav>
        );
        return <div> {!localStorage.adminsToken ? user_navbar : null} </div>;
    }
}

export default withRouter(UserNavbar);
