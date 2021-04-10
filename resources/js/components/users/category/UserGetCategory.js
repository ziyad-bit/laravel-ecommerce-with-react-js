import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userGetCategories } from "./functions";



class UserGetCategory extends Component {
    state = {
        categories: []
    };

    componentDidMount() {
        userGetCategories().then(res => {
            this.setState({
                categories: res.data.categories
            });
        });
    }

    render() {
        return (
            <div>
                <table class="table table-striped">
                    <thead className="bg-info">
                        <tr>
                            <th scope="col">category number</th>
                            <th scope="col">name</th>
                            <th scope="col">description</th>
                            <th scope="col">photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map(category => {
                            return (
                                <tr key={category.id}>
                                    <th scope="row">{category.id}</th>
                                    <td> <Link to={"/users/get/categories/items/"+category.id} > {category.name} </Link> </td>
                                    <td>{category.description}</td>

                                    <td>
                                        <img
                                            src={
                                                "images/category/" +
                                                category.photo
                                            }
                                        />
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

export default UserGetCategory;
