import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { NavLink } from 'react-router-dom';


class Nav extends Component {
    render() {
        return (
            <nav className="content nav">
            <NavLink to="/Home"><FontAwesome name="home" /> Home</NavLink>
            <NavLink to="/Search"><FontAwesome name="search" /> Search</NavLink>
            </nav>
        );
    }
}

export default Nav;