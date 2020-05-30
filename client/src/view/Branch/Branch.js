    import React, { Component } from 'react';

    import './Branch.css';

    class Branch extends Component {
        
        render() {
            return (

                <div className='branch'>
                    <div> {this.props.branchCity}</div>

                    <div>{this.props.branchStreet} {this.props.branchStreetNum}</div>
                    <div>{this.props.branchPhoneNum}</div>
                    <div>Mon-Sat: {this.props.branchObj.closeHour}-{this.props.branchObj.openHour}</div>
                    {
                        this.props.branchObj.openHourWeekend !== '' ?

                            <div>Mon-Sat: {this.props.branchObj.closeHourWeekend}-{this.props.branchObj.openHourWeekend}</div>
                            :
                            <div>Sun</div>
                    }
                </div>
            )
        }
    }


    export default Branch;
