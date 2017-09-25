import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Home from "../pages/Home";
import Search from "../pages/Search";


class Main extends Component {
    render() {
        return (
            <section className="main">
                <Route exact path="/" component={Home} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Search" component={Search} />
            </section>
        );
    }
}

export default Main;