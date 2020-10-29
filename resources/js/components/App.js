import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Admins/Home";

import Login from "./Admins/Login";
import Navbar from "./Admins/Navbar";
import AddItems from "./items/AddItems";
import GetItems from "./items/GetItems";


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                <Navbar />
                <div className="container">
                        <Route exact path="/getitem"     component={GetItems} />
                        <Route exact path="/additem"     component={AddItems} />
                        <Route exact path="/home"        component={Home} />
                        <Route exact path="/adminsLogin" component={Login} />
                    
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
