import React, { Component } from 'react';
import './OrdersToDo.css';

class OrdersToDo extends Component {

    render() {
        return (
            <div>

                {
                    this.props.ordersToDo.length != 0 ?
                        this.props.ordersToDo.map((item, index) => {
                            return (

                                <div key={index} className={item.status}>
                                    <div style={{
                                        fontWeight: "bolder"
                                    }}>{item.orderNum}</div>
                                    <div><span>Branch: </span>{item.selectedBranch} </div>
                                    <div><span>Order Type:</span> {item.DeleiveryOrTakeAway}</div>
                                    <div> <span>Street:</span> {item.clientStreet} </div>
                                    <div><span>Street number: </span>{item.clientStreetNumber} </div>
                                    <div><span> Client Phone: </span>{item.clientPhoneNumber}</div>
                                    <div><span> Client Name:</span> {item.clientName} </div>
                                    <div><span>Client Email:</span> {item.clientEmail} </div>
                                    <div><span>Cash / Credit:</span> {item.paymentType}</div>
                                    <div><span>Time:</span> {item.orderTime} </div>
                                    <div><span>Total: </span> {item.total}</div>

                                    <div><span>סטטוס ההזמנה:</span> {item.status}</div>
                                    <div className="products">
                                        <div className=""> <span>Dish</span> </div>
                                        <div className=""> <span>Price</span> </div>
                                        <div className=""> <span>Qtt </span></div>
                                    </div>
                                    {
                                        item.orderItemsList.map((item2, index2) => {
                                            return (
                                                <div key={index2} className="products">
                                                    <div className=""> {item2.dishName} </div>
                                                    <div className=""> {item2.dishPrice} </div>
                                                    <div className=""> {item2.qtt} </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="doneBtn"
                                        onClick={() => {
                                            this.props.done(Number(index));
                                        }}>done</div>
                                </div>

                            )
                        })
                        :
                        <p style={{
                            color: 'var(secondColor)',
                            fontWeight: 'bold',
                            fontSize: '2rem'
                        }}>{this.props.msg}</p>
                }

            </div>
        )
    }
}



export default OrdersToDo;
