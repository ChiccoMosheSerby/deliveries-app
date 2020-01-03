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
                <div className="orderHeader">פרטי ההזמנה</div>
                <div className='dateAndTime'> {this.props.state.orderTime}</div>

                <div className="orderRow">
                    
                    <div>סניף:</div><div> {this.props.state.selectedBranch}</div>
                    <div>שם:</div><div> {this.props.state.clientName}</div>

                </div>
                <div className="orderRow">
                    <div>סוג הזמנה:</div><div>  {this.props.state.DeleiveryOrTakeAway}</div>
                    <div>טלפון: </div><div>{this.props.state.clientPhoneNumber}</div>

                </div>
                <div className="orderRow">
                    <div>רחוב:</div><div> {this.props.state.clientStreet}  {this.props.state.clientStreetNumber}</div>
                    <div>אימייל:  </div><div>{this.props.state.clientEmail}</div>

                </div>
                <div className="orderRow">
                    <div>תשלום: </div><div>{this.props.state.paymentType}</div>
                    <div>סכום לתשלום: </div><div>{this.props.state.total}</div>

                </div>
            </div>
        )
    }
}


export default Order;
