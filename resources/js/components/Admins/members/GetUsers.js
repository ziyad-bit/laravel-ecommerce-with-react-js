import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteUsers, getUser, handlePage } from "./functions";
import Pagination from "react-js-pagination";
import "../../../../css/admins/items.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GetUsers extends Component {
    state = {
        users             : [],
        activePage        : 1,
        itemsCountPerPage : 1,
        totalItemsCount   : 1,
        pageRangeDisplayed: 3
    };

    componentDidMount() {
        getUser().then(res => {
            this.setState({
                users            : res.data.users.data,
                activePage       : res.data.users.current_page,
                itemsCountPerPage: res.data.users.per_page,
                totalItemsCount  : res.data.users.total,
            });
        });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        handlePage(pageNumber).then(res=>{
            this.setState({
                users            : res.data.users.data,
                activePage       : res.data.users.current_page,
                itemsCountPerPage: res.data.users.per_page,
                totalItemsCount  : res.data.users.total,
            })
        })
    }

    delete = id => {
        deleteUsers(id).then(res => {
            let users = this.state.users;
            for (let index = 0; index < users.length; index++) {
                if (users[index].id == id) {
                    users.splice(index, 1);
                    this.setState({
                        users
                    });
                }
            }
        });
    };

    render() {
        return (
            <div>
                <Link className="btn btn-info add_btn" to="/add/users">
                    <FontAwesomeIcon icon='plus-square' className='icon'/>
                    Add users
                </Link>
                <table class="table table-striped">
                    <thead className="bg-info">
                        <tr>
                            <th scope="col">user ID</th>
                            <th scope="col">name</th>
                            <th scope="col">email</th>
                            <th scope="col">date</th>
                            <th scope="col">control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.date}</td>
                                    <td>
                                        <Link
                                            className="btn btn-info"
                                            to={"/edit/users/" + user.id}
                                        >
                                            <FontAwesomeIcon
                                                icon="edit"
                                                className="icon"
                                            />
                                            edit user
                                        </Link>

                                        <button
                                            className="btn btn-danger delete_btn"
                                            onClick={() => this.delete(user.id)}
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
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={3}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        );
    }
}

export default GetUsers;
