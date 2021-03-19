import React, { Component } from "react";
import {
    getItemDetails,
    userAddComment,
    userEditComment,
    userGetComment,
    userUpdateComment
} from "./functions";
import { getAuthUser } from "../users/functions";
import "../../../../css/users/items.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ItemDetails extends Component {
    state = {
        //item
        id: "",
        name: "",
        description: "",
        status: "",
        price: "",
        date: "",
        photo: "",

        //user
        user_id: "",
        user_photo: "",
        user_name: "",

        users_comment: [],
        comment_id: "",
        toggle: false,
        edit_comment: "",
        original_comment:''
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        getItemDetails(id).then(res => {
            this.setState({
                id: res.data.item.id,
                name: res.data.item.name,
                description: res.data.item.description,
                status: res.data.item.status,
                date: res.data.item.date,
                price: res.data.item.price,
                photo: res.data.item.photo
            });

            userGetComment(id).then(res => {
                this.setState({
                    users_comment: res.data.user_comment
                });
            });
        });

        getAuthUser().then(res => {
            this.setState({
                user_id: res.data.user.id,
                user_name: res.data.user.name,
                user_photo: res.data.user.photo
            });
        });
    }

    componentDidUpdate() {
        console.log("updated");
    }

    handleState = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitState = e => {
        e.preventDefault();

        const newComment = {
            comment: this.state.comment,
            user_id: this.state.user_id,
            item_id: this.state.id
        };

        userAddComment(newComment).then(res => {
            if (res) {
                this.setState({
                    comment: ""
                });
            }
        });

        const id = this.props.match.params.id;
        userGetComment(id).then(res => {
            this.setState({
                users_comment: res.data.user_comment
            });
        });
    };

    cancel=()=>{
        this.setState({
            toggle:false
        })
    }

    updateState = e => {
        e.preventDefault();

        const newComment = {
            comment: this.state.edit_comment
        };

        const comment_id = this.state.comment_id;
        userUpdateComment(newComment, comment_id).then(res => {
            if (res) {
                this.setState({
                    comment: ""
                });
            }
        });

        const id = this.props.match.params.id;
        userGetComment(id).then(res => {
            this.setState({
                users_comment: res.data.user_comment
            });
        });

        this.setState({
            toggle: false
        });
    };

    editState = (comment_id,comment) => {
        userEditComment(comment_id).then(res => {
            this.setState({
                edit_comment: res.data.comment.comment,
                comment_id,
                toggle: true,
                original_comment:comment
            });
        });
    };

    render() {
        return (
            <div>
                <div className="card mb-3 card_item" style={{ maxWidth: 540 }}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img
                                src={"images/items/" + this.state.photo}
                                className="card-img"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <ul className="list-group">
                                <li className="list-group-item active">
                                    item information
                                </li>
                                <li className="list-group-item">
                                    <span className="name"> name </span>:
                                    {this.state.name}
                                </li>
                                <li className="list-group-item">
                                    <span className="description">
                                        {" "}
                                        description{" "}
                                    </span>
                                    :{this.state.description}
                                </li>
                                <li className="list-group-item">
                                    <span className="status"> status </span>:
                                    {this.state.status == 1 ? (
                                        <span> new </span>
                                    ) : null}
                                    {this.state.status == 2 ? (
                                        <span> used </span>
                                    ) : null}
                                </li>
                                <li className="list-group-item">
                                    <span className="price"> price </span>: $
                                    {this.state.price}
                                </li>
                                <li className="list-group-item">
                                    <span className="date"> date </span>:
                                    {this.state.date}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-3 user">
                        <div>{this.state.user_name}</div>

                        <img
                            src={"images/users/" + this.state.user_photo}
                            className="rounded-circle"
                        />
                    </div>

                    <div className="col-md-9 comment">
                        <form onSubmit={this.submitState}>
                            <div class="form-group">
                                <label>comment</label>
                                <textarea
                                    type="text"
                                    rows={3}
                                    class="form-control submit_comment"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="comment "
                                    value={this.state.comment}
                                    onChange={this.handleState}
                                ></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                <hr />

                {this.state.users_comment.map(user_comment => {
                    return (
                        <div className="row user-comment">
                            <div className="col-md-3 user">
                                <div>{user_comment.users.name}</div>

                                <img
                                    src={
                                        "images/users/" +
                                        user_comment.users.photo
                                    }
                                    className="rounded-circle"
                                />
                            </div>

                            <div className="col-md-9 comment">
                                {user_comment.comment}
                                {user_comment.user_id == this.state.user_id ? (
                                    <Button
                                        color="primary"
                                        onClick={() =>
                                            this.editState(user_comment.id,user_comment.comment)
                                        }
                                        className='edit_btn'
                                    >
                                        edit
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                    );
                })}

                <Modal isOpen={this.state.toggle} toggle={() => this.editState}>
                    <ModalHeader> edit comment </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.updateState}>
                            <div class="form-group">
                                <label>comment</label>
                                <textarea
                                    type="text"
                                    rows={3}
                                    class="form-control edit_comment"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="edit_comment"
                                    value={this.state.edit_comment}
                                    onChange={this.handleState}
                                    
                                ></textarea>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.original_comment != this.state.edit_comment
                        ?
                        <Button color="primary" onClick={this.updateState}>
                            save
                        </Button>:null
                    }
                        
                        <Button color="secondary" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ItemDetails;
