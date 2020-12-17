import React, { Component } from "react";
import { getItemDetails } from "./functions";
import "../../../../css/users/items.css";

class ItemDetails extends Component {
    state = {
        name       : "",
        description: "",
        status     : "",
        price      : "",
        date       : "",
        photo      : ""
    };

    componentDidMount() {
        const id=this.props.match.params.id
        getItemDetails(id).then(res => {
            this.setState({
                name       : res.data.item.name,
                description: res.data.item.description,
                status     : res.data.item.status,
                date       : res.data.item.date,
                price      : res.data.item.price,
                photo      : res.data.item.photo
            });
        });
    }

    render() {
        return (
            <div >
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
                                    <span className='name'> name </span>:{this.state.name}
                                </li>
                                <li className="list-group-item">
                                    <span className='description'> description </span>:
                                    {this.state.description}
                                </li>
                                <li className="list-group-item">
                                    <span className='status'> status </span>:
                                    {this.state.status == 1 ? (
                                        <span> new </span>
                                    ) : null}
                                    {this.state.status == 2 ? (
                                        <span> used </span>
                                    ) : null}
                                </li>
                                <li className="list-group-item">
                                <span className='price'> price </span>:
                                    ${this.state.price}
                                </li>
                                <li className="list-group-item">
                                <span className='date'> date </span>:
                                    {this.state.date}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemDetails;
