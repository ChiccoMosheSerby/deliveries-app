import React, { Component } from 'react';

import './BranchDeleiveryCard.css';
import Branch from '../Branch/Branch';
import OrderBtn from '../OrderBtn/OrderBtn';


import {
    Link
} from "react-router-dom";

class BranchDeleiveryCard extends Component {


    render() {
        return (
            <Link to="/orderStep2" className="BranchDeleiveryCard">
                <div className="logoInCard" style={{
                    backgroundImage: "url('img/logo.png')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    margin: "auto",
                    border: "solid 1px Var(--firstColor)"
                }}></div>
              
                <OrderBtn
                    branchObj={this.props.branchObj}
                    setOrderObj_Branch={this.props.setOrderObj_Branch}
                    setOrderObj_orderType={this.props.setOrderObj_orderType}
                    state={this.props.state}
                />
                <div className="links">
                    <div className="tooltip onlyDesktop">Branch Details
                <span className="tooltiptext">
                            <Branch
                                branchPhoneNum={this.props.branchObj.branchPhoneNum}
                                branchCity={this.props.branchObj.branchCity}
                                branchStreet={this.props.branchObj.branchStreet}
                                branchStreetNum={this.props.branchObj.branchStreetNum}
                                isThisBranchOpen={this.props.branchObj.isThisBranchOpen}
                                branchObj={this.props.branchObj} />

                        </span></div>
                </div>
            </Link>

        )
    }
}

export default BranchDeleiveryCard;
