import React, { Component } from "react";

import {  addusers } from "./functions";

class AddUsers extends Component {
    state = {
        //inputs
        name    : "",
        email   : "",
        password: "",
        photo   : "",

        //validation
        nameRequired    : "",
        emailRequired   : "",
        emailUnique     :'',
        statusRequired  : "",
        passwordRequired: "",
        photoRequired   : "",
        photoType       : "",
        photoSize       : "",
        success         : ""
    };

    inputRef = React.createRef();

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

    validatephoto = () => {
        if (this.state.photo) {
            let photoType = "";
            if (
                this.state.photo.type !== "image/jpg" &&
                this.state.photo.type !== "image/jpeg"&&
                this.state.photo.type !== "image/png" &&
                this.state.photo.type !== "image/gif"
            ) {
                photoType = "invalid image";
            }
            if (photoType) {
                this.setState({
                    photoType
                });
            } else {
                this.setState({
                    photoType: ""
                });
            }

            let photoSize = "";
            if (this.state.photo.size > 14048) {
                photoSize = "maximum size should be less than 14 MB";
            }
            if (photoSize) {
                this.setState({
                    photoSize
                });
            } else {
                this.setState({
                    photoSize: ""
                });
            }
        }
    };

    changeState = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    changeStatePhoto = e => {
        this.setState({
            photo: e.target.files[0]
        });
    };

    submitState = e => {
        e.preventDefault();

        this.validateName();
        this.validateemail();
        this.validatepassword();
        this.validatephoto();

        const formData = new FormData();
        formData.append("name"    , this.state.name);
        formData.append("email"   , this.state.email);
        formData.append("password", this.state.password);
        if(this.state.photo){
            formData.append("photo"   , this.state.photo);
        }
        
        
        
        addusers(formData)
            .then(res => {
                if (res) {
                    this.inputRef.current.value = "";
                    this.setState({
                        success     : "you add user successfully",
                        name        : "",
                        email       : "",
                        password    : "",
                        email_unique: ''
                    });
                }
            })
            .catch(err => {
                this.setState({
                    emailUnique: err.response.data.email_unique,
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
                    <div className="card-header">add item</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
                            <div className="form-group">
                                <label htmlFor="exampleInputname1">name</label>
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
                                <label htmlFor="exampleInputemail1">
                                    email
                                </label>
                                <input
                                    type      = "email"
                                    className = "form-control"
                                    id        = "exampleInputemail1"
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
                                <label htmlFor="exampleInputemail1">
                                    password
                                </label>
                                <input
                                    type      = "password"
                                    className = "form-control"
                                    id        = "exampleInputemail1"
                                    name      = "password"
                                    value     = {this.state.password}
                                    onChange  = {this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.passwordRequired}
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputemail1">
                                    photo
                                </label>
                                <input
                                    ref       = {this.inputRef}
                                    type      = "file"
                                    className = "form-control"
                                    id        = "exampleInputemail1"
                                    name      = "photo"
                                    onChange  = {this.changeStatePhoto}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.photoRequired}
                                </small>
                                <small style={{ color: "red" }}>
                                    {this.state.photoType}
                                </small>
                                <small style={{ color: "red" }}>
                                    {this.state.photoSize}
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

export default AddUsers;
