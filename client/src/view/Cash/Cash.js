import React, { Component } from 'react';
import './Cash.css';

class Cash extends Component {

    constructor(props) {
        super(props);
    }

    render() {

            return (
               <div>{this.props.ordersToDo}</div>
            )
        }
    }



export default Cash;
