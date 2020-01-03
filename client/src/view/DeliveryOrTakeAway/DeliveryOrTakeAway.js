import React, { Component } from 'react';
import './DeliveryOrTakeAway.css';

import {
    Link
} from "react-router-dom";

class DeliveryOrTakeAway extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: [this.props.option1, this.props.option2],
            // option1="משלוח" option2="איסוף עצמי"
        }
    }


    render() {
        return (
            <div className="twoOptionsWrapper">
                <div className="twoOptions">
                    {/* option1="משלוח" */}
                    <Link onClick={() => {
                        this.props.setOrderObj_orderType(this.state.selectedOption[0])
                    }}
                        to={this.props.link1}>
                            {this.props.option1}
                        <div style={{
                        backgroundImage:"url('img/deliveryIcone.gif')",
                        backgroundPosition:"center",
                        backgroundSize:"contain",
                        backgroundRepeat:"no-repeat",
                        backgroundColor:"var(--firstColorOpacity)"
                    }}></div>
                    </Link>


                    {/* option2="איסוף עצמי" */}
                    <Link onClick={() => {
                        this.props.setOrderObj_orderType(this.state.selectedOption[1])
                    }}
                        to={this.props.link2}>
                            {this.props.option2}
                        <div style={{
                        backgroundImage:"url('img/TA.gif')",
                        backgroundPosition:"center",
                        backgroundSize:"contain",
                        backgroundRepeat:"no-repeat",
                        backgroundColor:"var(--firstColorOpacity)"
                        
                    }}></div>
                    </Link>
                </div>
            </div>
        )
    }
}


export default DeliveryOrTakeAway;
