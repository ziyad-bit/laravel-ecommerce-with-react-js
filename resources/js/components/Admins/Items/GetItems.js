import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getitems, deleteitems } from "./functions";
import '../../../../css/admins/items.css'

class GetItems extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        getitems().then(res => {
            this.setState({
                items: res.data.items
            });
        });
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
                    Add item
                </Link>
                <table class="table table-striped">
                    <thead className="bg-info">
                        <tr>
                            <th scope="col">#</th>
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
                                    <th scope="row">1</th>
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
                                            edit item
                                        </Link>
                                    
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GetItems;
