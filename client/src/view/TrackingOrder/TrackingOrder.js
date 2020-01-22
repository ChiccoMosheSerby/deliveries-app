// import React, { Component } from 'react';
// import './TrackingOrder.css';
// import {
//     BrowserRouter as Router,

//     Link,
//     useParams
// } from "react-router-dom";
// class TrackingOrder extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             msg: ''
//         }
//     }

//     componentDidMount() {
//         let newOrderAccepted = this.props.ordernumber;
//         //get specific order (searched by order number (client input)) from orders list -  DB 
//         fetch(this.state.hostVar + "/orderStatusToShow",
//             {
//                 method: 'POST',
//                 body: JSON.stringify({ newOrderAccepted }),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         ).then(result => {
//             result.json().then(res => {

//                 this.setState({ msg: res.msg})
//             })
//         }

//         )
//     }

//     render() {
//         return (
//             <div className="trackPage">
               
//             </div>
//         )
//     }
// }



// export default TrackingOrder;
