import React, { Component } from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

//components----------------------------------------------///////////////////
import FullOrder from './view/FullOrder/FullOrder';
import CreditOrCash from './view/CreditOrCash/CreditOrCash';
import DeliveryOrTakeAway from './view/DeliveryOrTakeAway/DeliveryOrTakeAway';
import BranchDeleiveryCard from './view/BranchDeleiveryCard/BranchDeleiveryCard';
import DeliveryForm from './view/DeliveryForm/DeliveryForm';
import AddFoodPage from './view/AddFoodPage/AddFoodPage';
import OrdersToDo from './view/OrdersToDo/OrdersToDo';
import Order from './view/Order/Order';
// import TrackingOrder from './view/TrackingOrder/TrackingOrder';

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
      pageId: 1,
      orderTrack: '',
      statusMsg: '',
      trackedOrder: '',
      hostVar :'' // production
      // hostVar: 'http://localhost:4000' //development
    }

    //handlers binds ///////////
    this.setOrderObj_Branch = this.setOrderObj_Branch.bind(this);
    this.setOrderObj_orderType = this.setOrderObj_orderType.bind(this);
    this.setOrderObj_clientDetails = this.setOrderObj_clientDetails.bind(this);
    this.setOrderObj_paymentType = this.setOrderObj_paymentType.bind(this);
    this.isManager = this.isManager.bind(this);
    this.getOrderList = this.getOrderList.bind(this);
    this.newOrderAccepted = this.newOrderAccepted.bind(this);
    this.done = this.done.bind(this);
    this.orderStatusToShow = this.orderStatusToShow.bind(this);

  }


  componentDidMount() {

    //get branches list from DB 
    fetch(this.state.hostVar + "/branches",
      {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(doc => {
        this.setState({ branches: doc.branches })
      })
    }

    )
  }

  getOrderList(fullOrder, totalPrice) {
    this.setState({ orderList: fullOrder, total: totalPrice });
  }

  //see deliveriesToDo list : only manager with pass: 1234
  isManager(e) {
    e.preventDefault();
    if (e.target.elements.pass.value === '1234') {

      //get todos list from DB 
      fetch(this.state.hostVar + "/getOrderList",
        {
          method: 'POST',
          body: JSON.stringify({ tst: 'tst' }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(result => {
        result.json().then(res => {
          this.setState({ orderItems: res.list })
          console.dir(this.state.orderItems)
          this.setState({ isManager: true });
        })
      }
      )
    }
    else {
      this.setState({ isManager: false });
    }
  }

  //show order status
  orderStatusToShow(e) {
    e.preventDefault();
    let orderNumToShow = e.target.elements.orderNum.value;

    //get specific order (searched by order number (client input)) from orders list -  DB 
    fetch(this.state.hostVar + "/orderStatusToShow",
      {
        method: 'POST',
        body: JSON.stringify({ orderNumToShow }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(res => {

        this.setState({ statusMsg: res.msg, trackedOrder: res.order })
      })
    }

    )
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
    this.setState({ redirect: true })
    //push new order to DB
    fetch(this.state.hostVar + "/newOrder",
      {
        method: 'POST',
        body: JSON.stringify(newOrderAccepted),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(res => {
        this.setState({ orderItems: res.list, orderTrack: res.track, statusMsg: 'new' })
      })
    }

    )
  }

  done(i) {

    let updatedList = this.state.orderItems;
    updatedList[i].status = 'done';
    let orderNum = updatedList[i].orderNum;
    console.log(orderNum)

    this.setState({ orderItems: updatedList });

    //update status then get new status from DB
    fetch(this.state.hostVar + "/updateOrdersList",
      {
        method: 'POST',
        body: JSON.stringify({ orderNum: orderNum }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  render() {

    return (
      <div className="App">
        <div className="AppWrap">
          <Router>
            <header className="App-header">
              <form onSubmit={(e) => { this.isManager(e) }}>
                <div className="manager">
                  <div>   מנהל: <input name="pass" type="text" autocomplete="off"></input></div>
                  <div > <input style={{

                    height: "100%"
                  }} name="submit" type="submit" value="כנס" ></input></div>
                </div>
              </form>
              <div>
                <Link to="/"> <img src="/img/logo.png" className="App-logo" alt="logo" /></Link>
              </div>

              <form onSubmit={(e) => { this.orderStatusToShow(e) }}>
                <div className="orderNum">
                  <div>   הזן/י מספר הזמנה לבדיקת סטטוס הזמנתך: <input style={{
                    width: "400px",
                    maxWidth: "80vw"
                  }} name="orderNum" type="text" autocomplete="off"></input></div>
                  <div> <input style={{
                    color: "black",
                    height: "100%"

                  }} name="submit" type="submit" value="אישור"></input></div>
                </div>
              </form>

            </header>

            {/* show order status -------------------------------------- */}
            {
              this.state.statusMsg === 'new' ?
                <div style={{
                  fontWeight: 'bolder',
                  backgroundColor: '#FFF',
                  padding: '20px'
                }}>הזמנתך במטבח מתבשלת<p>תודה על הסבלנות</p></div> :
                null
            }
            {
              this.state.statusMsg === 'done' ?
                <p style={{
                  fontWeight: 'bolder',
                  backgroundColor: '#FFF',
                  padding: '20px'
                }}>מוכן!! בדרך אליך במידה וביצעת הזמנת משלוח - אם ביצעת איסוף עצמי אז... בוא כבר!</p>
                :
                null
            }
            {/* END show order status -------------------------------------- */}

            {/* END orders todo - manager view status OR client view-------------------------------------- */}
            {this.state.isManager ?
              <OrdersToDo
                // fullOrder={this.state.orderList}
                ordersToDo={this.state.orderItems}
                done={this.done} msg="אין הזמנות" ></OrdersToDo>

              :

              <Switch>

                {/* branches page ----------------------------------------------------------------------- */}
                <Route exact path="/">
                  <div className="branchesGrid">
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
                </Route>
                {/* END branches page ----------------------------------------------------------- */}

                {/* order type page ----------------------- */}
                <Route path="/orderStep2">
                  <DeliveryOrTakeAway
                    link1="/deliveryForm" link2="/deliveryForm"
                    option1="משלוח" option2="איסוף עצמי"
                    state={this.state} setOrderObj_orderType={this.setOrderObj_orderType} />
                </Route>

                {/* user info page - form --------------------------- */}
                <Route path="/deliveryForm">
                  <DeliveryForm state={this.state}
                    setOrderObj_clientDetails={this.setOrderObj_clientDetails} />
                </Route>

                {/* store page - menu --------------------------- */}
                <Route path="/AddFoodPage">
                  <AddFoodPage getOrderList={this.getOrderList} state={this.state} />
                </Route>

                {/* payment type page - -------------------------- */}
                <Route path="/payOptions">
                  <CreditOrCash link1="/credit" link2="/cash"
                    option1="אשראי" option2="מזומן"
                    state={this.state}
                    setOrderObj_paymentType={this.setOrderObj_paymentType}
                  />
                </Route>

                {/* full details to approve by client - only then new order todos is created - ---------------- */}
                <Route path="/summery">
                  <Order state={this.state} />
                  <FullOrder newOrderAccepted={this.newOrderAccepted} fullOrder={this.state.orderList} state={this.state} />
                </Route>

                {/* send client his order link --------------------------- */}
                <Route path="/trackOrder">
                  <p className="finalMsg">להלן מספר הזמנה לבדיקת סטטוס הזמנה :
                      <div>{this.state.orderTrack}</div>
                    <Link to={'/trackOrder/' + this.state.orderTrack}>click the link</Link>
                  </p>
                  {/* <TrackingOrder newOrderAccepted={this.state.orderTrack}></TrackingOrder> */}

                </Route>
                <Route path="/trackOrder/:orderNum" children={<TrackingOrder />} />

              </Switch>
            }

          </Router>
        </div>
        <footer>
       
            <div style={{
              background: '#3B5998',
              color: 'white'

            }} className="footerItem fa fa-facebook"></div>
            <div
              style={{
                background: 'var(--firstColor)',
                color: 'white'

              }}
              className="footerItem fa fa-youtube"></div>
            <div
              style={{
                background: 'black',
                color: 'white'  

              }}
              className="footerItem fa fa-instagram"></div>
                  <div style={{
                    color:'black',fontSize: '.7rem', alignSelf:'center',gridColumn:'1/end'
                  }}>&#9400; Chicco Moshe Serby</div>

        </footer>
      </div >
    );
  }

}

export default App;

class TrackingOrder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msg: ''
    }
  }

  componentDidMount() {
    let newOrderAccepted = this.props.ordernumber;
    //get specific order (searched by order number (client input)) from orders list -  DB 
    fetch(this.state.hostVar + "/orderStatusToShow",
      {
        method: 'POST',
        body: JSON.stringify({ newOrderAccepted }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(res => {

        this.setState({ msg: res.msg })
      })
    }

    )
  }

  render() {
    let { orderNum } = useParams();
    this.setState({ orderNum: orderNum })
    return (
      <div className="trackPage">
        {orderNum}
      </div>
    )
  }
}
