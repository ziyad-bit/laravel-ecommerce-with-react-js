import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteCategories, getCategories, handlePage } from "./functions";
import Pagination from "react-js-pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GetCategory extends Component {
    state = {
        categories        : [],
        activePage        : 1,
        itemsCountPerPage : 1,
        totalItemsCount   : 1,
        pageRangeDisplayed: 3
    };

    componentDidMount() {
        getCategories().then(res => {
            this.setState({
                categories            : res.data.categories.data,
                activePage       : res.data.categories.current_page,
                itemsCountPerPage: res.data.categories.per_page,
                totalItemsCount  : res.data.categories.total,
            });
        });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        handlePage(pageNumber).then(res=>{
            this.setState({
                categories            : res.data.categories.data,
                activePage       : res.data.categories.current_page,
                itemsCountPerPage: res.data.categories.per_page,
                totalItemsCount  : res.data.categories.total,
            })
        })
    }

    delete = id => {
        deleteCategories(id).then(res => {
            let categories = this.state.categories;
            for (let index = 0; index < categories.length; index++) {
                if (categories[index].id == id) {
                    categories.splice(index, 1);
                    this.setState({
                        categories
                    });
                }
            }
        });
    };

    render() {
        return (
            <div>
                <Link className="btn btn-info add_btn" to="/add/category">
                    <FontAwesomeIcon icon='plus-square' className='icon'/>
                    Add category
                </Link>
                <table class="table table-striped">
                    <thead className="bg-info">
                        <tr>
                            <th scope="col">category number</th>
                            <th scope="col">name</th>
                            <th scope="col">description</th>
                            <th scope="col">control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map(category => {
                            return (
                                <tr key={category.id}>
                                    <th scope="row">{category.id}</th>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    
                                    <td>
                                        <Link
                                            className="btn btn-info"
                                            to={"/edit/category/" + category.id}
                                        >
                                            <FontAwesomeIcon icon='edit' className='icon'/>
                                            edit category
                                        </Link>

                                        <Link
                                            className="btn btn-info"
                                            to={"/edit/photo/" + category.id}
                                        >
                                            <FontAwesomeIcon icon='edit' className='icon'/>
                                            edit photo
                                        </Link>
                                        <button
                                        
                                            className="btn btn-danger delete_btn"
                                            onClick={() => this.delete(category.id)}
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

export default GetCategory;
