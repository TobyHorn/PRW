import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { NavLink } from 'react-router-dom';




class Footer extends Component {
    render() {
        return (
            <footer className="content footer">
            <NavLink to="/Home"><FontAwesome name="home" size="2x" /></NavLink>
            <NavLink to="/Search"><FontAwesome name="search" size="2x" /></NavLink>
            </footer>
        );
    }
}

export default Footer;