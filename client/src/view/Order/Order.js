import React, { Component } from 'react';
import './Order.css';

class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedBranch: '',
            DeleiveryOrTakeAway: '',
            clientStreet: '',
            clientStreetNumber: '',
            clientPhoneNumber: '',
            clientName: '',
            clientEmail: '',
            paymentType: '',
            orderTime: '',
            ordersList: []
        }

    }
    addOrderToList() {
        let newOrder = {
            orderTime: this.props.state.orderTime,
            selectedBranch: this.props.state.selectedBranch,
            DeleiveryOrTakeAway: this.props.state.DeleiveryOrTakeAway,
            clientStreet: this.props.state.clientStreet,
            clientStreetNumber: this.props.state.clientStreetNumber,
            clientPhoneNumber: this.props.state.clientPhoneNumber,
            clientName: this.props.state.clientName,
            clientEmail: this.props.state.clientEmail,
            paymentType:this.props.state.paymentType
        }

        this.setState({ toDos: [...this.state.ordersList, newOrder] })
    }

    render() {
        return (
            <div className="orderWrapper">
                <div className="orderHeader">Order details</div>
                <div className='dateAndTime'> {this.props.state.orderTime}</div>

                <div className="orderRow">
                    
                    <div>Branch:</div><div> {this.props.state.selectedBranch}</div>
                    <div>Name:</div><div> {this.props.state.clientName}</div>

                </div>
                <div className="orderRow">
                    <div>Order Type:</div><div>  {this.props.state.DeleiveryOrTakeAway}</div>
                    <div>Phone: </div><div>{this.props.state.clientPhoneNumber}</div>

                </div>
                <div className="orderRow">
                    <div>Street:</div><div> {this.props.state.clientStreet}  {this.props.state.clientStreetNumber}</div>
                    <div>Email:  </div><div>{this.props.state.clientEmail}</div>

                </div>
                <div className="orderRow">
                    <div>Payment Type: </div><div>{this.props.state.paymentType}</div>
                    <div>Total: </div><div>{this.props.state.total} $</div>

                </div>
            </div>
        )
    }
}


export default Order;
