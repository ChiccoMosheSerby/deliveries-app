import React, { Component } from 'react';

import './AddFoodPage.css';
import {
    Link
} from "react-router-dom";


class AddFoodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            total: 0,
            mainDishes: [],
            sideDishes: [],
            diserts: []
        }


        this.orderListHandler = this.orderListHandler.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.changeQtt = this.changeQtt.bind(this);
    }


    componentDidMount() {

        fetch(this.props.hostVar+ "/menu",
            {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(result => {
            console.log(result)
            result.json().then(doc => {
                console.log(doc)
                this.setState({
                    mainDishes: doc.mainDishes,
                    sideDishes: doc.sideDishes,
                    diserts: doc.diserts
                })

            })
        }

        )


    }


    componentDidUpdate() {
        console.log(window.innerWidth, window.innerHeight)
        this.scrollToBottom();
    }

    scrollToBottom() {
        if (document.getElementById('orderSideWrapper')) {
            let element = document.getElementById('orderSideWrapper');
            element.scrollTop = element.scrollHeight;
        }
        if (document.getElementById('topCartMobile')) {

            let element2 = document.getElementById('topCartMobile');
            element2.scrollTop = element2.scrollHeight;
        }

    }
    orderListHandler(dish, dishPrice) {

        let orderItem = { dishName: dish, dishPrice: dishPrice, qtt: 1, orderItemPrice: dishPrice };
        this.setState({ orderList: [...this.state.orderList, orderItem] })

        this.setState({ total: this.state.total + dishPrice });
        // this.scrollToBottom();

    }

    changeQtt(index, PlusOrMinusOne) {
        let tempObjList = this.state.orderList;
        tempObjList[index].qtt = tempObjList[index].qtt + PlusOrMinusOne;
        if (tempObjList[index].qtt < 0) {
            tempObjList[index].qtt = 0;
        }
        tempObjList[index].orderItemPrice = tempObjList[index].dishPrice * tempObjList[index].qtt;
        this.setState({ orderList: tempObjList });
        let tempCounterTotalPrice = 0;
        for (let i in this.state.orderList) {
            tempCounterTotalPrice += this.state.orderList[i].orderItemPrice;
        }
        this.setState({ total: tempCounterTotalPrice })

    }

    render() {
        return (
            <div className="addFoodPageWrapper">

                {/* calculation - mobile -------------------------------------------*/}
                < div className='foodWrapper'>
                    {
                        this.state.total !== 0 ?

                            <div id="topCartMobile" className="onlyMobileElement topCartMobile"
                                style={{

                                    backgroundColor: "var(--secondColorOpacity2)",
                                    zIndex: '1'
                                }}>
                                <div id="orderSideWrapperMobile" className="orderSideWrapperMobile" >

                                    {

                                        this.state.orderList.map((oderItem, index) => {
                                            return (
                                                <div key={index} className="orderItemCard">
                                                    <div>{oderItem.dishName}</div>



                                                    <div onClick={() => { this.changeQtt(index, 1) }}
                                                        style={{
                                                            backgroundImage: "url('img/plus.png')",
                                                        }}
                                                        className="plus"></div>



                                                    <div onClick={() => { this.changeQtt(index, -1) }}
                                                        style={{
                                                            backgroundImage: "url('img/minus.png')",
                                                        }}
                                                        className="minus"></div>



                                                    <div>{oderItem.qtt}</div>
                                                    <div
                                                        style={{
                                                            justifySelf: "flex-end"
                                                        }}
                                                    >{oderItem.orderItemPrice}</div>
                                                </div>
                                            )

                                        })
                                    }
                                    {
                                        this.state.total !== 0 ?

                                            <div
                                                style={{
                                                    justifySelf: "flex-end",
                                                    color: "red",
                                                    fontWeight: "bold"
                                                }}>

                                                סהכ לתשלום: {this.state.total} שח
                                <Link onClick={() => { this.props.getOrderList(this.state.orderList, this.state.total) }}
                                                    to="/PayOptions"> - מעבר לתשלום
                                <div className="goToBtn"></div>
                                                </Link>
                                            </div>

                                            :
                                            null
                                    }

                                </div>
                            </div>

                            :
                            null
                    }

                    {/* food cards - mobile and desktop -------------------------------------------*/}

                    <p className="dishTypeHeader">ראשונות</p>

                    <div className="dishType">

                        {
                            this.state.sideDishes.map((dish, index) => {
                                return (
                                    <div key={index} className="foodCard"

                                        style={{
                                            backgroundImage: "url(" + dish.img + ")",

                                        }}>

                                        <div>
                                            <div className="dishName">{dish.dishName}</div>
                                            <div className="tooltip">פרטי מנה<span className="tooltiptext">{dish.description}</span>
                                            </div>
                                        </div>
                                        <div className="addBtnCard plus"
                                            style={{ borderRadius: '50%', margin: 'auto', backgroundImage: "url('img/plus.png')" }}

                                            onClick={(dishName) => { this.orderListHandler(dish.dishName, dish.price) }}>

                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>

                    <p className="dishTypeHeader">עיקריות</p>

                    <div className="dishType">
                        {
                            this.state.mainDishes.map((dish, index) => {
                                return (
                                    <div key={index} className="foodCard"

                                        style={{
                                            backgroundImage: "url(" + dish.img + ")",

                                        }}>

                                        <div>
                                            <div className="dishName">{dish.dishName}</div>
                                            <div className="tooltip">פרטי מנה<span className="tooltiptext">{dish.description}</span>
                                            </div>
                                        </div>
                                        <div className="addBtnCard plus"
                                            style={{ borderRadius: '50%', margin: 'auto', backgroundImage: "url('img/plus.png')" }}
                                            onClick={(dishName) => { this.orderListHandler(dish.dishName, dish.price) }}>
                                        </div>
                                    </div>

                                )
                            })

                        }
                    </div>
                    <p className="dishTypeHeader">קינוחים</p>

                    <div className="dishType">

                        {
                            this.state.diserts.map((dish, index) => {
                                return (
                                    <div key={index} className="foodCard"

                                        style={{
                                            backgroundImage: "url(" + dish.img + ")",

                                        }}>

                                        <div>
                                            <div className="dishName">{dish.dishName}</div>
                                            <div className="tooltip">פרטי מנה<span className="tooltiptext">{dish.description}</span>
                                            </div>
                                        </div>
                                        <div className="addBtnCard plus"
                                            style={{ borderRadius: '50%', margin: 'auto', backgroundImage: "url('img/plus.png')" }}
                                            onClick={(dishName) => { this.orderListHandler(dish.dishName, dish.price) }}>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>

                </div>

                {/* calculation - desktop -------------------------------------------*/}
                {
                    this.state.total !== 0 ?

                        <div id="orderSideWrapper" className="orderSideWrapper onlyDesktopElement" >

                            {

                                this.state.orderList.map((oderItem, index) => {
                                    return (
                                        <div key={index} className="orderItemCard">
                                            <div >{oderItem.dishName}</div>



                                            <div onClick={() => { this.changeQtt(index, 1) }}
                                                style={{
                                                    backgroundImage: "url('img/plus.png')",
                                                }}
                                                className="plus"></div>



                                            <div onClick={() => { this.changeQtt(index, -1) }}
                                                style={{
                                                    backgroundImage: "url('img/minus.png')",
                                                }}
                                                className="minus"></div>



                                            <div>{oderItem.qtt}</div>
                                            <div
                                                style={{
                                                    justifySelf: "flex-end"
                                                }}
                                            >{oderItem.orderItemPrice}</div>
                                        </div>
                                    )

                                })
                            }
                            {
                                this.state.total !== 0 ?

                                    <div
                                        style={{
                                            justifySelf: "flex-end",
                                            color: "red",
                                            fontWeight: "bold"
                                        }}>

                                        סהכ לתשלום: {this.state.total} שח
                                <Link onClick={() => { this.props.getOrderList(this.state.orderList, this.state.total) }}
                                            to="/PayOptions"> - מעבר לתשלום
                                <div className="goToBtn"></div>
                                        </Link>
                                    </div>

                                    :
                                    null
                            }

                        </div>
                        :
                        null
                }
                {/* : */}
                {/* <button onClick={() => { this.setState({ showFullOrder: !this.state.showFullOrder }) }} className="showFullOrderbtn">full order</button> */}

                {/* } */}

            </div>
        )
    }
}


export default AddFoodPage;
