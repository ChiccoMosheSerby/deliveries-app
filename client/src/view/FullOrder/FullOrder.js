import React, { Component } from 'react';

import './FullOrder.css';
import {
    Link
} from "react-router-dom";

//db

class FullOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newOrderTodo: {}
        }

    }
    componentDidMount() {
        let newOrder = {
            orderItemsList: this.props.fullOrder,
            selectedBranch: this.props.state.selectedBranch,
            DeleiveryOrTakeAway: this.props.state.DeleiveryOrTakeAway,
            clientStreet: this.props.state.clientStreet,
            clientStreetNumber: this.props.state.clientStreetNumber,
            clientPhoneNumber: this.props.state.clientPhoneNumber,
            clientName: this.props.state.clientName,
            clientEmail: this.props.state.clientEmail,
            paymentType: this.props.state.paymentType,
            isManager: this.props.state.isManager,
            orderTime: this.props.state.orderTime,
            total: this.props.state.total
        }
        this.setState({ newOrderTodo: newOrder })
        // <Order state={this.state} />this.state.total
        // <FullOrder fullOrder =  {this.state.orderList} />
        console.log('FullOrder---------')
        console.log('newOrder---------')
        console.log(newOrder)

    }



    render() {
        return (
            <div className="orderSideWrapperDone">
                {
                    this.props.fullOrder.map((item, index) => {
                        return (
                            <div key={index} className="orderSidRowDone">

                                <div className="">  {item.dishName}  </div>
                                <div className=""> {item.qtt} </div>
                                <div className=""> {item.orderItemPrice} </div>
                            </div>
                        )
                    })

                }

                <div className="">
                    <Link to="/ordersToDo">
                        <div className="goToOrderBtn"
                            onClick={() => this.props.newOrderAccepted(this.state.newOrderTodo)}>אישור</div>
                    </Link>
                </div>

            </div >
        )
    }
}


export default FullOrder;
