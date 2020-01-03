import React, { Component } from 'react';
import './OrdersToDo.css';

class OrdersToDo extends Component {

    constructor(props) {
        super(props);


    }


    render() {
        return (
            <div>
       
                {
                    this.props.ordersToDo.map((item, index) => {
                        return (

                            <div key={index} className={item.status}>
                                <div style={{
                                    fontWeight: "bolder"
                                }}>{item.orderNum}</div>
                                <div><span>סניף: </span>{item.selectedBranch} </div>
                                <div><span>סוג משלוח:</span> {item.DeleiveryOrTakeAway}</div>
                                <div> <span>רחוב:</span> {item.clientStreet} </div>
                                <div><span>מספר רחוב: </span>{item.clientStreetNumber} </div>
                                <div><span> טלפון לקוח: </span>{item.clientPhoneNumber}</div>
                                <div><span> שם לקוח:</span> {item.clientName} </div>
                                <div><span>אימייל לקוח:</span> {item.clientEmail} </div>
                                <div><span>מזומן / אשראי:</span> {item.paymentType}</div>
                                <div><span>ההזמנה בוצעה ב:</span> {item.orderTime} </div>
                                <div><span>סהכ לתשלום:</span> {item.total}</div>

                                <div><span>סטטוס ההזמנה:</span> {item.status}</div>
                            <div className="products">
                                <div className=""> <span>מנה</span> </div>
                                <div className=""> <span>מחיר</span> </div>
                                <div className=""> <span>כמות </span></div>
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

}

            </div >
        )
    }
}



export default OrdersToDo;
