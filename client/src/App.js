import React, { Component } from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//DB
// import branches from './view/DB/branches';

//components----------------------------------------------///////////////////
import FullOrder from './view/FullOrder/FullOrder';

import NavLinks from './view/NavLinks/NavLinks';
import CreditOrCash from './view/CreditOrCash/CreditOrCash';
import DeliveryOrTakeAway from './view/DeliveryOrTakeAway/DeliveryOrTakeAway';
import BranchDeleiveryCard from './view/BranchDeleiveryCard/BranchDeleiveryCard';
import DeliveryForm from './view/DeliveryForm/DeliveryForm';
import AddFoodPage from './view/AddFoodPage/AddFoodPage';
import OrdersToDo from './view/OrdersToDo/OrdersToDo';
import Order from './view/Order/Order';
//end - components----------------------------------------------////////////

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedBranch: '',
      DeleiveryOrTakeAway: '',
      clientStreet: '',
      clientStreetNumber: '',
      clientPhoneNumber: '',
      clientName: '',
      clientEmail: '',
      paymentType: '',
      isManager: false,
      orderTime: '',
      total: 0,
      orderList: [],
      orderItems: [],
      branches: [],
      pageId: 1
    }
    //get branches from DB


    //binds///////////
    this.setOrderObj_Branch = this.setOrderObj_Branch.bind(this);
    this.setOrderObj_orderType = this.setOrderObj_orderType.bind(this);
    this.setOrderObj_clientDetails = this.setOrderObj_clientDetails.bind(this);
    this.setOrderObj_paymentType = this.setOrderObj_paymentType.bind(this);
    this.isManager = this.isManager.bind(this);
    this.getOrderList = this.getOrderList.bind(this);
    this.setPageId = this.setPageId.bind(this);
    this.newOrderAccepted = this.newOrderAccepted.bind(this);
    this.done = this.done.bind(this);

  }

  setPageId(id) {
    this.setState({ pageId: id })
  }
  componentDidMount() {

    // <Order state={this.state} />this.state.total
    // <FullOrder fullOrder =  {this.state.orderList} />

    fetch("http://localhost:4000/branches",
      {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(doc => {
        // console.dir(doc);
        this.setState({ branches: doc.branches })
      })
    }

    )
  }

  getOrderList(fullOrder, totalPrice) {

    this.setState({ orderList: fullOrder, total: totalPrice });
  }

  //see deliveriesToDo list : only manager with pass
  isManager(e) {
    e.preventDefault();
    if (e.target.elements.pass.value === '1234') {
      this.setState({ isManager: true });
    }
    else {
      this.setState({ isManager: false });
    }
  }

  //the branch clicked by client in first page
  setOrderObj_Branch(orderObj) {
    this.setState({ selectedBranch: orderObj.branchCity, pageId: 2 });
  }

  //the order type clicked by client
  setOrderObj_orderType(type) {
    this.setState({ DeleiveryOrTakeAway: type, pageId: 3 });
  }

  //the payment type clicked by client
  setOrderObj_paymentType(paymentType) {
    this.setState({ paymentType: paymentType, pageId: 6 });
  }

  //gathering all the data that client choosed in this session
  setOrderObj_clientDetails(orderObj) {
    this.setState({
      clientStreet: orderObj.street,
      clientStreetNumber: orderObj.streetNumber,
      clientPhoneNumber: orderObj.phoneNumber,
      clientName: orderObj.name,
      clientEmail: orderObj.email,
      pageId: 4
    });

    //current time
    let tempDate = new Date();
    let date = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    this.setState({ orderTime: date })
  }

  newOrderAccepted(newOrderAccepted) {
    fetch("http://localhost:4000/newOrder",
      {
        method: 'POST',
        body: JSON.stringify(newOrderAccepted),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(doc => {
        this.setState({ orderItems: doc })
      })
    }

    )
  }

  done(i) {

    let updatedList = this.state.orderItems;
    updatedList[i].status = 'done';
    this.setState({ orderItems: updatedList });
    fetch("http://localhost:4000/updateOrdersList",
      {
        method: 'POST',
        body: JSON.stringify(updatedList),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(doc => {
      })
    }

    )
  }

  render() {
    return (
      <div className="App">
        <div className="AppWapper">


          <Router>
            <header className="App-header">
              <div>
                <Link to="/"> <img src="/img/logo2.png" className="App-logo" alt="logo" /></Link>
                <NavLinks pageId={this.state.pageId} setPageId={this.setPageId} items={
                  [
                    { id: 1, name: " בחירת סניף >", to: "/", className: "nav_item" },
                    { id: 2, name: "  סוג הזמנה >", to: "/orderStep2", className: "nav_item" },
                    { id: 3, name: " פרטים למשלוח >", to: "/deliveryForm", className: "nav_item" },
                    { id: 4, name: "  בחר אוכל >", to: "/AddFoodPage", className: "nav_item" },
                    { id: 5, name: " סוג תשלום > האוכל בדרך!", to: "/payOptions", className: "nav_item" }
                  ]
                } />

              </div>
              <form onSubmit={(e) => { this.isManager(e) }}>
                <div className="manager">
                  <div>   מנהל: <input name="pass" type="text"></input></div>
                  <div> <input name="submit" type="submit" value="כנס"></input></div>
                </div>
              </form>

            </header>

            {this.state.isManager ?
              <OrdersToDo
                fullOrder={this.state.orderList}
                ordersToDo={this.state.orderItems}
                done={this.done} ></OrdersToDo>

              :
              <Switch>
                <Route exact path="/">
                  {/* <div id="mapid"></div> */}
                  <div className="gridWrap">
                    <div className="grid">
                      {
                        this.state.branches.map((branch, index) => {
                          return (
                            <div key={index} to="/orderStep2"
                              onClick={() => {
                                this.setOrderObj_Branch(branch);

                              }}>

                              <BranchDeleiveryCard key={branch.branchId} branchObj={branch}
                                setOrderObj_Branch={this.setOrderObj_Branch}
                                state={this.state}
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </Route>

                <Route path="/orderStep2">

                  <DeliveryOrTakeAway
                    link1="/deliveryForm" link2="/deliveryForm"
                    option1="משלוח" option2="איסוף עצמי"
                    state={this.state} setOrderObj_orderType={this.setOrderObj_orderType} />

                </Route>

                <Route path="/deliveryForm">

                  <DeliveryForm state={this.state}
                    setOrderObj_clientDetails={this.setOrderObj_clientDetails} />

                </Route>

                <Route path="/AddFoodPage">

                  <AddFoodPage getOrderList={this.getOrderList} state={this.state} />
                </Route>

                <Route path="/payOptions">

                  <CreditOrCash link1="/credit" link2="/cash"
                    option1="אשראי" option2="מזומן"
                    state={this.state}
                    setOrderObj_paymentType={this.setOrderObj_paymentType}
                  />

                </Route>

                <Route path="/summery">
                  <Order state={this.state} />

                  <FullOrder newOrderAccepted={this.newOrderAccepted} fullOrder={this.state.orderList} state={this.state} />
                </Route>
                <Route path="/ordersToDo">
                  תודה - ההזמנה כבר במטבח ותכף אצלך!!
                  {/* <OrdersToDo 
                    fullOrder={this.state.orderList}
                    ordersToDo={this.state.orderItems}
                    done={this.done} ></OrdersToDo> */}
                </Route>

              </Switch>
            }

          </Router>




        </div>
      </div >
    );
  }
}

export default App;