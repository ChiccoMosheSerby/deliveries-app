
import React, { Component } from 'react';

import {
    Link
} from "react-router-dom";

class CreditOrCash extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: [this.props.option1, this.props.option2], //cash / credit
            // option1="אשראי" option2="מזומן"
        }
    }
    render() {
        return (
            <div className="twoOptionsWrapper">
                <div className="twoOptions">

                    {/* option1="אשראי" */}
                    <Link onClick={() => {
                        this.props.setOrderObj_paymentType(this.state.selectedOption[0])
                    }}
                        to="/summery">
                            {this.props.option1}
                        <div style={{
                            backgroundImage: "url('img/credit.gif')",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundColor:"#ffc500",
                            webkitTransform: 'scaleX(-1)',
                            transform: 'scaleX(-1)'

                        }}></div>
                    </Link>

                    <Link onClick={() => {
                        this.props.setOrderObj_paymentType(this.state.selectedOption[1])
                    }}
                        to="/summery">
                            {this.props.option2}
                        <div style={{
                            backgroundImage: "url('img/cash.gif')",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundColor:"#771c7f",

                        }}></div>
                    </Link>
                </div>
            </div>
        )
    }
}


export default CreditOrCash;
