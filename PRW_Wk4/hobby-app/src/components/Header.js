import React, { Component } from 'react';
import Nav from './Nav';


class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>Welcome to Puzz-A-List!</h1>
                <Nav />
            </header>
        );
    }
}

export default Header;