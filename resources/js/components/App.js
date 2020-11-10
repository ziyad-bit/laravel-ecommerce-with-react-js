import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./Admins/Home";

import Login from "./Admins/Login";
import Navbar from "./Admins/Navbar";
import AddItems from "./Admins/Items/AddItems";
import GetItems from "./Admins/Items/GetItems";
import EditItems from "./Admins/Items/EditItem";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAngleDoubleLeft, faBriefcase, faEdit, faHome, faPlusSquare, faTrash , } from '@fortawesome/free-solid-svg-icons'
import AddUsers from "./Admins/members/AddUsers";
import GetUsers from "./Admins/members/GetUsers";

library.add(fab,faHome, faAngleDoubleLeft ,faBriefcase ,faPlusSquare ,faTrash ,faEdit)


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                <Navbar />
                <div className="container">
                        {/* items */}
                        <Route exact path="/edit/item/:id"     component={EditItems} />
                        <Route exact path="/getitem"           component={GetItems} />
                        <Route exact path="/add/item"          component={AddItems} />
                        {/* users */}
                        <Route exact path="/add/users"          component={AddUsers} />
                        <Route exact path="/get/users"          component={GetUsers} />
                        {/* login and home */}
                        <Route exact path="/home"              component={Home} />
                        <Route exact path="/adminsLogin"       component={Login} />
                    
                </div>
                </Router>
            </div>
        );
    }
}

export default App;

if (document.getElementById("App")) {
    ReactDOM.render(<App />, document.getElementById("App"));
}
