import React, { Component } from "react";

import { userGetItems,handlePage } from "./functions";
import "../../../../css/users/category.css";
import Pagination from "react-js-pagination";

class UserGetItems extends Component {
    state = {
        items             : [],
        activePage        : 1,
        itemsCountPerPage : 1,
        totalItemsCount   : 1,
        pageRangeDisplayed: 3
    };

    componentDidMount() {
        userGetItems().then(res => {
            this.setState({
                items            : res.data.items.data,
                activePage       : res.data.items.current_page,
                itemsCountPerPage: res.data.items.per_page,
                totalItemsCount  : res.data.items.total,
            });
        });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        handlePage(pageNumber).then(res=>{
            this.setState({
                items            : res.data.items.data,
                activePage       : res.data.items.current_page,
                itemsCountPerPage: res.data.items.per_page,
                totalItemsCount  : res.data.items.total,
            })
        })
    }

    render() {
        return (
            <div>
                
                <div className="row">
                    {this.state.items.map(item => {
                        return (
                            <div className="col-sm-4">
                                <div
                                    className="card"
                                    style={{ width: "14rem" }}
                                >
                                    <img
                                        src={
                                            "images/items/" +
                                            item.photo
                                        }
                                        className="card-img-top image"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            {item.name}
                                        </h3>
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <span className="status">
                                                    {" "}
                                                    status{" "}
                                                </span>
                                                :
                                                {item.status == 1 ? (
                                                    <span>new</span>
                                                ) : null}
                                                {item.status == 2 ? (
                                                    <span>used</span>
                                                ) : null}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="date">
                                                    {" "}
                                                    date{" "}
                                                </span>
                                                :{item.date}
                                            </li>
                                        </ul>

                                        <a
                                            href="#"
                                            className="btn btn-success buy-btn"
                                        >
                                            buy ${item.price}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='d-flex justify-content-center'>
                    <Pagination
                        activePage         = {this.state.activePage}
                        itemsCountPerPage  = {this.state.itemsCountPerPage}
                        totalItemsCount    = {this.state.totalItemsCount}
                        pageRangeDisplayed = {3}
                        onChange           = {this.handlePageChange.bind(this)}
                        itemClass          = "page-item"
                        linkClass          = "page-link"
                    />
                </div>
            </div>
        );
    }
}

export default UserGetItems;
