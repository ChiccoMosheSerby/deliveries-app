import React, { Component } from 'react';

import './Branch.css';

class Branch extends Component {
    constructor(props) {
        super(props);
        // let tempDate = new Date();
        // let date =tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        this.state = {
            isThisBranchOpen: true
        }

    }
    render() {
        return (

            <div className='branch'>
                <div> {this.props.branchCity}</div>

                <div>{this.props.branchStreet} {this.props.branchStreetNum}</div>
                <div>{this.props.branchPhoneNum}</div>
                <div>א-ה: {this.props.branchObj.closeHour}-{this.props.branchObj.openHour}</div>
                {
                    this.props.branchObj.openHourWeekend != '' ?

                        <div>ו-ש: {this.props.branchObj.closeHourWeekend}-{this.props.branchObj.openHourWeekend}</div>
                        :
                        <div>ו-ש :סגור</div>
                }
            </div>
        )
    }
}


export default Branch;