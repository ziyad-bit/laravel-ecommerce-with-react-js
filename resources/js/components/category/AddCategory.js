import React, { Component } from "react";

import { addCategories } from "./functions";

class AddCategory extends Component {
    state = {
        //inputs
        name       : "",
        description: "",
        photo      : "",

        //validation
        nameRequired       : "",
        descriptionRequired: "",
        photoRequired      : "",
        photoType          : "",
        photoSize          : "",
        success            : ""
    };

    inputRef=React.createRef();

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

    validatedescription = () => {
        let descriptionRequired = "";
        if (this.state.description.length < 4) {
            descriptionRequired = "you should enter at least 4 characters";
        }
        if (descriptionRequired) {
            this.setState({
                descriptionRequired
            });
        } else {
            this.setState({
                descriptionRequired: ""
            });
        }
    };


    validatephoto = () => {
        let photoRequired = "";
        if (!this.state.photo) {
            photoRequired = "you should select photo";
        }
        if (photoRequired) {
            this.setState({
                photoRequired
            });
            return;
        } else {
            this.setState({
                photoRequired: ""
            });
        }

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
        this.validatedescription();
        this.validatephoto();
        


        const formData = new FormData();
        formData.append("name"       , this.state.name);
        formData.append("description", this.state.description);
        formData.append("photo"      , this.state.photo);

        addCategories( formData).then(res => {
            if (res) {
                this.inputRef.current.value=''
                this.setState({
                    success    : "you created item successfully",
                    name       : "",
                    description: "",
                });
                
            }else{
                this.setState({
                    success    : "",
                });
            }

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
                    className = "card text-white bg-info mb-3 card_login"
                    style     = {{ maxWidth: "22rem" }}
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
                                <label htmlFor="exampleInputdescription1">
                                    description
                                </label>
                                <input
                                    type      = "text"
                                    className = "form-control"
                                    id        = "exampleInputdescription1"
                                    name      = "description"
                                    value     = {this.state.description}
                                    onChange  = {this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.descriptionRequired}
                                </small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputdescription1">
                                    photo
                                </label>
                                <input
                                    ref       = {this.inputRef}
                                    type      = "file"
                                    className = "form-control"
                                    id        = "exampleInputdescription1"
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

export default AddCategory;
