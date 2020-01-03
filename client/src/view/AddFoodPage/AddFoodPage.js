import React, { Component } from 'react';

import './AddFoodPage.css';
import {
    Link
} from "react-router-dom";

//db

class AddFoodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            total: 0,
            showFullOrder: false,
            width: 0, height: 0,
            mainDishes: [],
            sideDishes: [],
            diserts: []
        }


        this.orderListHandler = this.orderListHandler.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.changeQtt = this.changeQtt.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }


    componentDidMount() {

        fetch("http://localhost:4000/menu",
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
                // console.dir( 'doc.mainDishes');

                // console.dir(doc.menu.mainDishes);
                this.setState({
                    mainDishes: doc.mainDishes,
                    sideDishes: doc.sideDishes,
                    diserts: doc.diserts
                })

            })
        }

        )


        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if (this.state.width < 800) {
            this.setState({ showFullOrder: true })
        }
        else {
            this.setState({ showFullOrder: false })

        }
    }
    componentDidUpdate() {
        console.log(window.innerWidth, window.innerHeight)
        this.scrollToBottom();
        // if (window.innerWidth <600pxheight: window.innerHeight
    }

    scrollToBottom() {
        if (this.state.showFullOrder) {
            let element = document.getElementById('orderSideWrapper');
            element.scrollTop = element.scrollHeight;
            // do something at end of scroll
        }
    }
    orderListHandler(dish, dishPrice) {
        // console.log(dish, dishPrice);


        // this.setState({ total: this.state.total + dishPrice })
        let orderItem = { dishName: dish, dishPrice: dishPrice, qtt: 1, orderItemPrice: dishPrice };
        this.setState({ orderList: [...this.state.orderList, orderItem] })
        // console.log(this.state.orderList);

        this.setState({ total: this.state.total + dishPrice })
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
                < div className='foodWrapper'>
                    <p className="dishTypeHeader">עיקריות</p>

                    <div className="dishType">
                        {
                            this.state.mainDishes.map((dish, index) => {
                                return (
                                    <div className="foodCard"
                                        onClick={(dishName) => { this.orderListHandler(dish.dishName, dish.price) }}
                                        style={{
                                            backgroundImage: "url(" + dish.img + ")"
                                        }}>
                                        <div>
                                            <div key={index}>{dish.dishName}</div>
                                            <div class="tooltip">i<span class="tooltiptext">{dish.description}</span>
                                            </div>
                                            <div>
                                                {dish.price} שח
                                        </div>
                                        </div>
                                    </div>

                                )
                            })

                        }
                    </div>
                    <p className="dishTypeHeader">ראשונות</p>

                    <div className="dishType">

                        {
                            this.state.sideDishes.map((dish, index) => {
                                return (
                                    <div className="foodCard"
                                        onClick={(dishName) => { this.orderListHandler(dish.dishName, dish.price) }}

                                        style={{
                                            backgroundImage: "url(" + dish.img + ")"
                                        }}>
                                        <div>
                                            <div key={index}>{dish.dishName}</div>
                                            <div class="tooltip">i<span class="tooltiptext">{dish.description}</span>
                                            </div>

                                            <div>
                                                {dish.price} שח
                                        </div>
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
                                    <div className="foodCard"
                                        onClick={(dishName) => { this.orderListHandler(dish.dishName, dish.price) }}

                                        style={{
                                            backgroundImage: "url(" + dish.img + ")",

                                        }}>
                                        <div>
                                            <div key={index}>{dish.dishName}</div>
                                            <div class="tooltip">i<span class="tooltiptext">{dish.description}</span>
                                            </div>

                                            <div>
                                                {dish.price} שח
                                        </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>

                </div>
                {
                    this.state.showFullOrder ?

                        <div id="orderSideWrapper" className="orderSideWrapper" >
                            <p>סיכום הזמנה</p>
                            <div className="orderItemCard"
                                style={{
                                    color: "grey",
                                    border: "none",
                                    fontWeight: "normal",
                                    fontSize: "0.7rem"
                                }}>
                                <div>מנה</div>
                                <div className="">הוסף</div>
                                <div className="">החסר</div>
                                <div>כמות</div>
                                <div
                                    style={{
                                        justifySelf: "flex-end"
                                    }}>מחיר</div>
                            </div>
                            {

                                this.state.orderList.map((oderItem, index) => {
                                    return (
                                        <div key="index" className="orderItemCard">
                                            <div>{oderItem.dishName}</div>



                                            <button onClick={() => { this.changeQtt(index, 1) }}
                                                style={{
                                                    backgroundImage: "url('img/plus.png')",
                                                }}
                                                className="plus"></button>



                                            <button onClick={() => { this.changeQtt(index, -1) }}
                                                style={{
                                                    backgroundImage: "url('img/minus.png')",
                                                }}
                                                className="minus"></button>



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
                                this.state.total != 0 ?

                                    <div
                                        style={{
                                            justifySelf: "flex-end",
                                            color: "red",
                                            fontWeight: "bold"
                                        }}>

                                        סהכ לתשלום: {this.state.total} שח
                                <Link onClick={() => { this.props.getOrderList(this.state.orderList,this.state.total) }}
                                            to="/PayOptions"> - מעבר לתשלום
                                <div class="goToBtn"></div>
                                        </Link>
                                    </div>

                                    :
                                    <div>

                                    </div>
                            }

                        </div>
                        :
                        <button onClick={() => { this.setState({ showFullOrder: !this.state.showFullOrder }) }} className="showFullOrderbtn">full order</button>

                }

            </div>
        )
    }
}


export default AddFoodPage;
