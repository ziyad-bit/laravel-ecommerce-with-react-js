import React, { Component } from "react";
import ReactDOM             from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import Home        from "./Admins/Home";
import Login       from "./Admins/Login";
import Navbar      from "./Admins/Navbar";
import AddItems    from "./Admins/Items/AddItems";
import GetItems    from "./Admins/Items/GetItems";
import EditItems   from "./Admins/Items/EditItem";
import AddUsers    from "./Admins/members/AddUsers";
import GetUsers    from "./Admins/members/GetUsers";
import EditUsers   from "./Admins/members/EditUsers";
import AddCategory from "./Admins/category/AddCategory";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab }     from '@fortawesome/free-brands-svg-icons'

import { faAngleDoubleLeft, faBorderAll, faBriefcase, faEdit, faHome, faPlusSquare, faTrash, faUsers, faUserTie , } from '@fortawesome/free-solid-svg-icons'
import GetCategory      from "./Admins/category/GetCategory";
import EditCategory     from "./Admins/category/EditCategory";
import EditPhoto        from "./Admins/category/EditPhoto";
import AddAdmins from "./Admins/admins/AddAdmins";
import GetAdmins from "./Admins/admins/GetAdmins";
import EditAdmins from "./Admins/admins/EditAdmin";
import UsersHome from "./users/UsersHome";
import UsersLogin from "./users/users/UsersLogin";
import SignUp from "./users/users/SignUp";
import UserNavbar from "./users/UserNavbar";
import UserGetCategory from "./users/category/UserGetCategory";
import GetCategoryItems from "./users/category/GetCategoryItems";
import UserGetItems from "./users/items/UserGetItems";
import UserAddItems from "./users/items/UserAddItem";
import ItemDetails from "./users/items/ItemDetails";

library.add(fab,faHome, faAngleDoubleLeft ,faBriefcase ,faPlusSquare ,faTrash ,faEdit,faUserTie,faUsers,faBorderAll)


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                    <UserNavbar/>
                    <div className="container">
            {/*  #####################  users   ############################## */}

                        {/* users */}
                        <Route exact path="/"                component={UsersHome} />
                        <Route exact path="/users/login"     component={UsersLogin} />
                        <Route exact path="/users/signup"    component={SignUp} />

                        {/* category */}
                        <Route exact path="/users/get/categories"             component={UserGetCategory} />
                        <Route exact path="/users/get/categories/items/:id"   component={GetCategoryItems}/>
                        
                        {/* items */}
                        <Route exact path="/users/get/items"       component={UserGetItems} /> 
                        <Route exact path="/users/add/items"       component={UserAddItems} /> 
                        <Route exact path="/users/get/items/:id"   component={ItemDetails} />


            {/*  #####################  admins   ############################## */}

                            {/* items */}
                            <Route exact path="/edit/item/:id"     component={EditItems} />
                            <Route exact path="/getitem"           component={GetItems} />
                            <Route exact path="/add/item"          component={AddItems} />

                            {/* users */}
                            <Route exact path = "/add/users"          component = {AddUsers} />
                            <Route exact path = "/get/users"          component = {GetUsers} />
                            <Route exact path = "/edit/users/:id"     component = {EditUsers} />

                            {/* admins */}
                            <Route exact path = "/add/admins"          component = {AddAdmins} />
                            <Route exact path = "/get/admins"          component = {GetAdmins} />
                            <Route exact path = "/edit/admins"         component = {EditAdmins} />

                            {/* category */}
                            <Route exact path="/add/category"          component={AddCategory} />
                            <Route exact path="/get/category"          component={GetCategory} />
                            <Route exact path="/edit/category/:id"     component={EditCategory} />
                            <Route exact path="/edit/photo/:id"        component={EditPhoto} />

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
