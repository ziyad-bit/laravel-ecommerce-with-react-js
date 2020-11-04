import React, { Component } from "react";
import { getauthadmin } from "../../Admins/functions";
import { additems, edititems } from "./functions";

class EditItems extends Component {
    state = {
        //inputs
        name       : "",
        description: "",
        status     : "",
        price      : "",
        photo      : "",

        //validation
        nameRequired       : "",
        descriptionRequired: "",
        statusRequired     : "",
        priceRequired      : "",
        photoRequired      : "",
        photoType          : "",
        photoSize          : "",
        success            : ""
    };

    componentDidMount() {
        const id=this.props.match.params.id
        edititems(id).then(res=>{
            this.setState({
                name       : res.data.items.name,
                description: res.data.items.description,
                status     : res.data.items.status,
                price      : res.data.items.price,
            })
        })
        getauthadmin().then(res => {
            this.setState({
                admins_id: res.data.admin.id
            });
        });
    }

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

    validatestatus = () => {
        let statusRequired = "";
        if (!this.state.status) {
            statusRequired = "you should select status";
        }
        if (statusRequired) {
            this.setState({
                statusRequired
            });
        } else {
            this.setState({
                statusRequired: ""
            });
        }
    };

    validateprice = () => {
        let priceRequired = "";
        if (!this.state.price) {
            priceRequired = "you should enter price";
        }
        if (priceRequired) {
            this.setState({
                priceRequired
            });
        } else {
            this.setState({
                priceRequired: ""
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
        this.validatestatus();
        this.validateprice();
        this.validatephoto();
        


        const formData = new FormData();
        formData.append("name"       , this.state.name);
        formData.append("description", this.state.description);
        formData.append("status"     , this.state.status);
        formData.append("price"      , this.state.price);
        formData.append("photo"      , this.state.photo);

        const admins_id = this.state.admins_id;

        additems(admins_id, formData).then(res => {
            if (res) {
                this.inputRef.current.value=''
                this.setState({
                    success    : "you created item successfully",
                    name       : "",
                    description: "",
                    status     : "",
                    price      : "",
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
                    className = "card text-white bg-dark mb-3 card_login"
                    style     = {{ maxWidth: "18rem" }}
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
                                    status
                                </label>
                                <select
                                    type      = "text"
                                    className = "form-control"
                                    id        = "exampleInputdescription1"
                                    name      = "status"
                                    value     = {this.state.status}
                                    onChange  = {this.changeState}
                                >
                                    <option value="">...</option>
                                    <option value="1">new</option>
                                    <option value="2">used</option>
                                </select>
                                <small style={{ color: "red" }}>
                                    {this.state.statusRequired}
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputdescription1">
                                    price
                                </label>
                                <input
                                    type      = "text"
                                    className = "form-control"
                                    id        = "exampleInputdescription1"
                                    name      = "price"
                                    value     = {this.state.price}
                                    onChange  = {this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.priceRequired}
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
                                
                            </div>

                            <button type="submit" className="btn btn-primary">
                                add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditItems;
