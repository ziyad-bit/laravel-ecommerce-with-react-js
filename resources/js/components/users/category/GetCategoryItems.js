import React, { Component } from "react";

import { getCategoriesItems } from "./functions";
import "../../../../css/users/category.css";

class GetCategoryItems extends Component {
    state = {
        category      : "",
        category_items: []
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        getCategoriesItems(id).then(res => {
            this.setState({
                category      : res.data.categories.name,
                category_items: res.data.category_items
            });
        });
    }

    render() {
        return (
            <div>
                <h1 className="text-center"> {this.state.category} </h1>
                <div className="row">
                    {this.state.category_items.map(category_item => {
                        return (
                            <div className="col-sm-4">
                                <div
                                    className="card"
                                    style={{ width: "14rem" }}
                                >
                                    <img
                                        src={
                                            "images/items/" +
                                            category_item.photo
                                        }
                                        className="card-img-top image"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            {category_item.name}
                                        </h3>
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <span className="status">
                                                    {" "}
                                                    status{" "}
                                                </span>
                                                :
                                                {category_item.status == 1 ? (
                                                    <span>new</span>
                                                ) : null}
                                                {category_item.status == 2 ? (
                                                    <span>used</span>
                                                ) : null}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="date">
                                                    {" "}
                                                    date{" "}
                                                </span>
                                                :{category_item.date}
                                            </li>
                                        </ul>

                                        <a
                                            href="#"
                                            className="btn btn-success buy-btn"
                                        >
                                            buy ${category_item.price}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default GetCategoryItems;
