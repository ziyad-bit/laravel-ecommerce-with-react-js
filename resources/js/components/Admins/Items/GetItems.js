import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteitems, getitems, handlePage } from "./functions";
import Pagination from "react-js-pagination";
import "../../../../css/admins/items.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GetItems extends Component {
    state = {
        items             : [],
        activePage        : 1,
        itemsCountPerPage : 1,
        totalItemsCount   : 1,
        pageRangeDisplayed: 3
    };

    componentDidMount() {
        getitems().then(res => {
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

    delete = id => {
        deleteitems(id).then(res => {
            let items = this.state.items;
            for (let index = 0; index < items.length; index++) {
                if (items[index].id == id) {
                    items.splice(index, 1);
                    this.setState({
                        items
                    });
                }
            }
        });
    };

    render() {
        return (
            <div>
                <Link className="btn btn-info add_btn" to="/add/item">
                    <FontAwesomeIcon icon='plus-square' className='icon'/>
                    Add item
                </Link>
                <table class="table table-striped">
                    <thead className="bg-info">
                        <tr>
                            <th scope="col">item number</th>
                            <th scope="col">name</th>
                            <th scope="col">description</th>
                            <th scope="col">status</th>
                            <th scope="col">control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map(item => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        {item.status == 1 ? (
                                            <span>new</span>
                                        ) : null}
                                        {item.status == 2 ? (
                                            <span>used</span>
                                        ) : null}
                                    </td>
                                    <td>
                                        <Link
                                            className="btn btn-info"
                                            to={"/edit/item/" + item.id}
                                        >
                                            <FontAwesomeIcon icon='edit' className='icon'/>
                                            edit item
                                        </Link>

                                        <button
                                        
                                            className="btn btn-danger delete_btn"
                                            onClick={() => this.delete(item.id)}
                                        >
                                            <FontAwesomeIcon icon='trash' className='icon'/>
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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

export default GetItems;
