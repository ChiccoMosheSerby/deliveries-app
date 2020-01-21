import React, { Component } from 'react';

import './OrderBtn.css';


class OrderBtn extends Component {

    render() {
        return (
                <div>
                    <div className="goToOrderBtn" 
                    onClick={() => { this.props.setOrderObj_Branch(this.props.branchObj)}}>{this.props.branchObj.branchCity}</div>
                </div>
        )
    }
}

export default OrderBtn;
