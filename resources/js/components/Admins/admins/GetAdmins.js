import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteAdmins, getAdmin, handlePage } from "./functions";
import Pagination from "react-js-pagination";
import "../../../../css/admins/items.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GetAdmins extends Component {
    state = {
        admins             : [],
        activePage        : 1,
        itemsCountPerPage : 1,
        totalItemsCount   : 1,
        pageRangeDisplayed: 3
    };

    componentDidMount() {
        getAdmin().then(res => {
            this.setState({
                admins            : res.data.admins.data,
                activePage       : res.data.admins.current_page,
                itemsCountPerPage: res.data.admins.per_page,
                totalItemsCount  : res.data.admins.total,
            });
        });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        handlePage(pageNumber).then(res=>{
            this.setState({
                admins            : res.data.admins.data,
                activePage       : res.data.admins.current_page,
                itemsCountPerPage: res.data.admins.per_page,
                totalItemsCount  : res.data.admins.total,
            })
        })
    }

    delete = id => {
        deleteAdmins(id).then(res => {
            let admins = this.state.admins;
            for (let index = 0; index < admins.length; index++) {
                if (admins[index].id == id) {
                    admins.splice(index, 1);
                    this.setState({
                        admins
                    });
                }
            }
        });
    };

    render() {
        return (
            <div>
                <Link className="btn btn-info add_btn" to="/add/admins">
                    <FontAwesomeIcon icon='plus-square' className='icon'/>
                    Add admins
                </Link>
                <table class="table table-striped">
                    <thead className="bg-info">
                        <tr>
                            <th scope="col">admin ID</th>
                            <th scope="col">name</th>
                            <th scope="col">email</th>
                            <th scope="col">date</th>
                            <th scope="col">control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.admins.map(admin => {
                            return (
                                <tr key={admin.id}>
                                    <th scope="row">{admin.id}</th>
                                    <td>{admin.name}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.date}</td>
                                    <td>
                                        <Link
                                            className="btn btn-info"
                                            to={"/edit/admins/" + admin.id}
                                        >
                                            <FontAwesomeIcon
                                                icon="edit"
                                                className="icon"
                                            />
                                            edit admin
                                        </Link>

                                        <button
                                            className="btn btn-danger delete_btn"
                                            onClick={() => this.delete(admin.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon="trash"
                                                className="icon"
                                            />
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

export default GetAdmins;
