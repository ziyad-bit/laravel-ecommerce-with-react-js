import React, { Component } from "react";

import {  addAdmins } from "./functions";

class AddAdmins extends Component {
    state = {
        //inputs
        name    : "",
        email   : "",
        password: "",

        //validation
        nameRequired    : "",
        emailRequired   : "",
        emailUnique     : "",
        passwordRequired: "",
        success         : ""
    };

    

    validateName = () => {
        let nameRequired = "";
        if (this.state.name.length < 4) {
            nameRequired = "you should enter at least 4 characters";
        }
        if (nameRequired) {
            this.setState({
                nameRequired
            });
        } else {
            this.setState({
                nameRequired: ""
            });
        }
    };

    validateemail = () => {
        let emailRequired = "";
        if (this.state.email.length < 4) {
            emailRequired = "you should enter at least 10 characters";
        }
        if (emailRequired) {
            this.setState({
                emailRequired
            });
        } else {
            this.setState({
                emailRequired: ""
            });
        }
    };

    validatepassword = () => {
        let passwordRequired = "";
        if (this.state.password.length < 8) {
            passwordRequired = "you should enter at least 8 characters";
        }
        if (passwordRequired) {
            this.setState({
                passwordRequired
            });
        } else {
            this.setState({
                passwordRequired: ""
            });
        }
    };

    changeState = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitState = e => {
        e.preventDefault();

        this.validateName();
        this.validateemail();
        this.validatepassword();

        const formData = new FormData();
        formData.append("name"    , this.state.name);
        formData.append("email"   , this.state.email);
        formData.append("password", this.state.password);

        addAdmins(formData)
        .then(res => {
            if (res) {
                
                this.setState({
                    success    : "you created category successfully",
                    name       : "",
                    email      : "",
                    password   : '',
                    emailUnique: ""
                });
            }
        })
        .catch(err => {
            this.setState({
                emailUnique: res.response.data.email_unique,
                success    : ""
            });
        });
    };

    render() {
        const success = (
            <div className="alert alert-success"> {this.state.success} </div>
        );
        return (
            <div>
                {this.state.success ? success : null}
                <div
                    className="card text-white bg-info mb-3 card_login"
                    style={{ maxWidth: "22rem" }}
                >
                    <div className="card-header">add admins</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
                            <div className="form-group">
                                <label >name</label>
                                <input
                                    type      = "text"
                                    className = "form-control"
                                    name      = "name"
                                    value     = {this.state.name}
                                    onChange  = {this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.nameRequired}
                                </small>
                            </div>
                            <div className="form-group">
                                <label >
                                    email
                                </label>
                                <input
                                    type      = "email"
                                    className = "form-control"
                                    name      = "email"
                                    value     = {this.state.email}
                                    onChange  = {this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.emailRequired}
                                </small>
                                <small style={{ color: "red" }}>
                                    {this.state.emailUnique}
                                </small>
                            </div>

                            <div className="form-group">
                                <label >
                                    password
                                </label>
                                <input
                                    type      = "password"
                                    className = "form-control"                                    
                                    name      = "password"
                                    value     = {this.state.password}
                                    onChange  = {this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.passwordRequired}
                                </small>
                            </div>

                            <button type="submit" className="btn btn-success">
                                add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddAdmins;
