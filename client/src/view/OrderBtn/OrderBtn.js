import React, { Component } from 'react';

import './OrderBtn.css';
import {
    Link
} from "react-router-dom";

class OrderBtn extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="">
                <Link to="/orderStep2">
                    <div className="goToOrderBtn" 
                    onClick={() => { this.props.setOrderObj_Branch(this.props.branchObj)}}>{this.props.branchObj.branchCity}</div>
                </Link>
            </div>
        )
    }
}

export default OrderBtn;
