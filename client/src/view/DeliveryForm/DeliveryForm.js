import React, { Component } from 'react';
import './DeliveryForm.css';
import { Redirect } from 'react-router'


class DeliveryForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            city: this.props.state.selectedBranch,
            street: '',
            streetNumber: '',
            phoneNumber: '',
            name: '',
            email: '',
            redirect: false

        };
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/AddFoodPage' />;
        }
        else {
            return (
                <div className = "formWrap">
                    {
                        this.props.state.DeleiveryOrTakeAway === 'delivery' ?

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.props.setOrderObj_clientDetails(this.state);
                                this.setState({ redirect: true })
                            }} >
                                <div className="deliveryForm">
                                    <div className="oneRow">
                                        <div className="city">
                                        Delivery: <span>{this.state.city}</span>
                                        </div>

                                        <input
                                            onChange={(e) => { this.setState({ street: e.target.value }) }}
                                            onFocus={(e) => { e.target.placeholder = "" }}
                                            onBlur={(e) => { e.target.placeholder = "street" }}
                                            placeholder="street" name="street" type="text" required>
                                        </input>

                                        <input
                                            onChange={(e) => { this.setState({ streetNumber: e.target.value }) }}
                                            onFocus={(e) => { e.target.placeholder = "" }} className="streetNum"
                                            onBlur={(e) => { e.target.placeholder = "street number" }}
                                            placeholder="street number" type="number" min="1" name="streetNumber" required>
                                        </input>

                                    </div>

                                    <div className="oneRow">
                                    {/* Format: 123-45-678 */}
                                        <input
                                            type="tel" 
                                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                             onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }}
                                            onFocus={(e) => { e.target.placeholder = "" }}
                                            onBlur={(e) => { e.target.placeholder = "phone" }}
                                            placeholder="phone" name="phoneNumber" required>
                                        </input>

                                        <input
                                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                                            onFocus={(e) => { e.target.placeholder = "" }}
                                            onBlur={(e) => { e.target.placeholder = "name" }}
                                            placeholder="name" name="name" type="text" >
                                        </input>

                                        <input
                                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                                            onFocus={(e) => { e.target.placeholder = "" }}
                                            onBlur={(e) => { e.target.placeholder = "Email" }}
                                            placeholder="Email" name="email" type="text">
                                        </input>
                                    </div>
                                    <div>
                                        <input className="submitBtn" name="submit" type="submit" value="" />
                                    </div>
                                </div>

                            </form>
                            :
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.props.setOrderObj_clientDetails(this.state);
                                this.setState({ redirect: true })
                            }} >
                                <div className="deliveryForm">
                                    <div className="oneRow">
                                        <div className="city">
                                          TA: <span>{this.state.city}</span>
                                        </div>
                                    </div>

                                    <div className="oneRow">
                                        <input
                                            type="tel" 
                                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }}
                                            onFocus={(e) => { e.target.placeholder = "" }}
                                            onBlur={(e) => { e.target.placeholder = "phone" }}
                                            placeholder="phone" name="phoneNumber" required>
                                        </input>

                                        <input
                                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                                            onFocus={(e) => { e.target.placeholder = "" }}
                                            onBlur={(e) => { e.target.placeholder = "name" }}
                                            placeholder="name" name="name" type="text" >
                                        </input>

                                        <input
                                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                                            onFocus={(e) => { e.target.placeholder = "" }}
                                            onBlur={(e) => { e.target.placeholder = "Email" }}
                                            placeholder="Email" name="email" type="text">
                                        </input>
                                    </div>
                                    <input className="submitBtn" name="submit" type="submit" value="" />
                                </div>
                            </form>
                    }
                </div>
            )
        }
    }
}


export default DeliveryForm;
