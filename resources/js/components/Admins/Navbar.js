import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../../../css/admins/navbar.css";

class Navbar extends Component {
    logout(e) {
        e.preventDefault();
        localStorage.removeItem("adminsToken");
        this.props.history.push(`/adminsLogin`);
    }
    render() {

        const Navbar=<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        
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
                        <FontAwesomeIcon icon='home' className='icon'/>
                        Home <span class="sr-only">(current)</span>
                    </Link>
                </li>
                <li class="nav-item ">
                
                    <Link class="nav-link" to="/getitem">
                    <FontAwesomeIcon icon='briefcase' className='icon'/>
                        Items 
                    </Link>
                </li>
                <li class="nav-item ">
                
                    <Link class="nav-link" to="/get/users">
                    <FontAwesomeIcon icon='users' className='icon'/>
                        Members 
                    </Link>
                </li>
                <li class="nav-item ">
                
                <Link class="nav-link" to="/get/admins">
                <FontAwesomeIcon icon='user-tie' className='icon'/>
                    admins 
                </Link>
            </li>
                <li class="nav-item ">
                
                <Link class="nav-link" to="/get/category">
                <FontAwesomeIcon icon='border-all' className='icon'/>
                    categories 
                </Link>
            </li>
                
                <li class="nav-item">
                    <a
                        class="nav-link logout"
                        href="/adminsLogin"
                        onClick={this.logout.bind(this)}
                    >
                        <FontAwesomeIcon icon='angle-double-left' className='icon'/>
                        logout
                    </a>
                </li>
            </ul>
        </div>
    </nav>
        return (
            <div> {localStorage.adminsToken ? Navbar : null} </div>
        );
    }
}

export default  withRouter(Navbar) ;
