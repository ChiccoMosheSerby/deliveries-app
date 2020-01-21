import React, { Component } from "react";
import { Link } from "react-router-dom";

import './NavLinks.css';


class NavLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLink: 1
        }

    }

    handleClick = id => {
        this.setState({ activeLink: id });
    };
    render() {
        return (
            <nav>
                {
                    this.props.items.map((link, index) => {
                        return (
                            <Link style={{
                            opacity:"0.1"
                            }}
                            onClick={() => { this.props.setPageId(link.id); this.handleClick(link.id) }}
                                key={link.id} to={link.to}
                                className={
                                    link.className +
                                    (link.id === this.state.activeLink ? " active_item" : "")
                                }>{link.name}</Link>
                        )
                    })
                }
            </nav>

        );
    }
}

export default NavLinks;