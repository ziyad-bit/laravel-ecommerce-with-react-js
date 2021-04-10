import React, { Component } from "react";
import { getAuthUser } from "../users/functions";
import { userAddItems } from "./functions";
import { userGetCategories } from "../category/functions";


class UserAddItems extends Component {
    state = {
        users_id   :'',
        //inputs
        name       : "",
        description: "",
        status     : "",
        price      : "",
        photo      : "",
        category_id: '',
        categories : [],

        //validation
        nameRequired       : "",
        descriptionRequired: "",
        statusRequired     : "",
        priceRequired      : "",
        photoRequired      : "",
        photoType          : "",
        photoSize          : "",
        categoryRequired   : '',
        success            : ""
    };

    componentDidMount() {
        userGetCategories().then(res=>{
            this.setState({
                categories  : res.data.categories,
            })
        })
        getAuthUser().then(res => {
            this.setState({
                users_id: res.data.user.id
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

    validateCategory = () => {
        let categoryRequired = "";
        if (this.state.category_id.length < 1) {
            categoryRequired = "you should select category";
        }
        if (categoryRequired) {
            this.setState({
                categoryRequired
            });
        } else {
            this.setState({
                categoryRequired: ""
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

        this.validateCategory();
        this.validateName();
        this.validatedescription();
        this.validatestatus();
        this.validateprice();
        this.validatephoto();
        


        const formData = new FormData();
        formData.append("name"             , this.state.name);
        formData.append("description"      , this.state.description);
        formData.append("status"           , this.state.status);
        formData.append("price"            , this.state.price);
        formData.append("photo"            , this.state.photo);
        formData.append("category_id"      , this.state.category_id);
        

        const users_id = this.state.users_id;

        userAddItems(users_id, formData).then(res => {
            if (res) {
                this.inputRef.current.value=''
                this.setState({
                    success    : "you created item successfully",
                    name       : "",
                    description: "",
                    status     : "",
                    price      : "",
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
                                    category
                                </label>
                                <select
                                    type      = "text"
                                    className = "form-control"
                                    id        = "exampleInputdescription1"
                                    name      = "category_id"
                                    value     = {this.state.category_id}
                                    onChange  = {this.changeState}
                                >
                                    <option value=''>...</option>
                                    {this.state.categories.map(category=>{
                                        return(
                                        <option value={category.id}>{category.name}</option>
                                        ) 
                                    })}
                                    
                                </select>
                                <small style={{ color: "red" }}>
                                    {this.state.categoryRequired}
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

export default UserAddItems;
