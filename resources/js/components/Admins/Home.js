import React, { Component } from "react";
import { getUserCount } from "./members/functions";
import { getAdminCount } from "./admins/functions";
import { getitemsCount } from "./Items/functions";
import { Link } from "react-router-dom";
import '../../../css/admins/home.css'

class Home extends Component {
    state = {
        usersCount : '',
        adminsCount: '',
        itemsCount : ''
    };

    componentDidMount(){
        getUserCount().then(res => {
            this.setState({
                usersCount  : res.data.usersCount
            });
        });

        getitemsCount().then(res => {
            this.setState({
                itemsCount  : res.data.itemsCount,
            });
        });

        getAdminCount().then(res => {
            this.setState({
                adminsCount  : res.data.adminsCount,
            });
        });
    }

    render() {
        return (
            <div className='home2'>
                <div class="row ">
                    <div class="col">
                        <div className="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>


                            <div class="card-header"> <Link to= "/get/users" className="link"><h3 className="total"> total users </h3></Link>  </div>
                            <div class="card-body">
                                <h3 className='number'> {this.state.usersCount} </h3>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                    <div className="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>


                            <div class="card-header"> <Link to= "/get/admins"  className="link"><h3 className="total"> total admins </h3></Link>  </div>
                            <div class="card-body">
                            <h3 className='number'> {this.state.adminsCount} </h3>
                            </div>
                        </div>
                    </div>
                    <div class="w-100"></div>
                    <div class="col">
                    <div className="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>


                            <div class="card-header"> <Link to= "/getitem"  className="link"><h3 className="total"> total items </h3></Link>  </div>
                            <div class="card-body">
                            <h3 className='number'> {this.state.itemsCount} </h3>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                    <div className="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>


                            <div class="card-header"> <Link to= "/get/admins"  className="link"><h3 className="total"> total comments </h3></Link>  </div>
                            <div class="card-body"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
