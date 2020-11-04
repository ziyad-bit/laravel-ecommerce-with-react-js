import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getitems } from "./functions";

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

    render() {
        return (
            <div>
                <Link className='btn btn-info' to='/add/item'>Add item</Link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">description</th>
                        <th scope="col">control</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map(item=>{
                        return(
                            <tr key= {item.id}>
                        <th scope="row">1</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td><Link className='btn btn-info' to={'/edit/item/'+item.id}>edit item</Link></td>
                    </tr>
                        )
                    })}
                    
                    
                </tbody>
            </table>
            </div>
        );
    }
}

export default GetItems;
