import React, { Component } from "react";

import {  updatePhoto } from "./functions";

class EditPhoto extends Component {
    state = {
        //inputs
        photo      : "",

        //validation
        photoRequired      : "",
        photoType          : "",
        photoSize          : "",
        success            : ""
    };

    inputRef=React.createRef();

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


    changeStatePhoto = e => {
        this.setState({
            photo: e.target.files[0]
        });
    };

    submitState = e => {
        e.preventDefault();

        this.validatephoto();

        const formData = new FormData();
        formData.append("photo"      , this.state.photo);

        const id=this.props.match.params.id
        updatePhoto(id, formData)
            .then(res => {
                if (res) {
                    this.inputRef.current.value = "";
                    this.setState({
                        success: "you update photo successfully"
                    });
                } else {
                    this.setState({
                        success: ""
                    });
                }
            })
            .catch(err => {});
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
                    <div className="card-header">update photo</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
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
                                update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditPhoto;
