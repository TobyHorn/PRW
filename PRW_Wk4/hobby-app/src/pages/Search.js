import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Search extends Component {
    constructor(props){
        super(props);
        
        //Set the initial state
        this.state = {
            id: "",
            image: "",
            name: "",
            type: "",
            search: "",
            puzzles: [],
            errors: [],
            results: []
        }
        
        this.performSearch = this.performSearch.bind(this);
    };
    
    //Check if local storage has data, if so pull display it
    componentDidMount() {
        if(localStorage.getItem('puzzles')) {
            let puzzles = JSON.parse(localStorage.getItem('puzzles'));
            this.setState({puzzles: puzzles});
        };
    };
    
    //Set the entered values as the search term
    setSearch(e) {
        e.preventDefault();
        this.setState({search: e.target.value});
    };
    
    performSearch(e) {
        e.preventDefault();
        let search = this.state.search.toLowerCase();
        let errors = [];
        let errorCnt = 0;
        
        for (let i = 0; i < this.state.puzzles.length; i++) {
            if (search === this.state.puzzles[i].name.toLowerCase() || search === this.state.puzzles[i].type.toLowerCase()) {
                let results = this.state.results;
                let result = {image: this.state.puzzles[i].image, name: this.state.puzzles[i].name, type: this.state.puzzles[i].type};
                results.push(result);
                this.setState({results: results});
                console.log(results);
                errorCnt++;
                this.setState({errors: []});
            } else if (errorCnt < 1) {
                errors.push("No Results Found!");
                this.setState({errors: errors});
                this.setState({results: []});
                errorCnt++;
            }
        }
    };
    
    render() {
        return (
            <main id="search">
                <h1>Search</h1>
                <section className="search">
                    <form>
                        <p>
                            <label>Enter A Search Term</label>
                            <input type="text" id="searchInput" onKeyUp={(e) => this.setSearch(e)}></input>
                        </p>
                        <p>
                            <button className="searchBtn" type="submit" onClick={(e) => this.performSearch(e)}><FontAwesome name="search" /> Search</button>
                        </p>
                    </form>
                    <ul id="addErrors" className="errors">
                        {
                            Object.keys(this.state.errors).map((key) => {
                                return (
                                    <li key={key}><p>{this.state.errors[key]}</p></li>
                                );
                            })
                        }
                    </ul>
                </section>
                
                <section className="results">
                    <h2>Search Results</h2>
                    <article>
                        {   Object.keys(this.state.results).map((key) => {
                                return (
                                    <ul key={key} >
                                        <li id="itemID"> {key} </li>
                                        <li> <img src={this.state.results[key].image} /> </li>
                                        <li><p>Name: </p> {this.state.results[key].name} </li>
                                        <li><p>Type: </p> {this.state.results[key].type} </li>
                                    </ul>
                                )
                            })
                        }
                    </article>
                </section>
            </main>
        );
    }
}

export default Search;