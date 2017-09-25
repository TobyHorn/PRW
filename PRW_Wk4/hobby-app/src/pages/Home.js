import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Home extends Component {
    constructor(props){
        super(props);
        
        //Set the initial state
        this.state = {
            image: "",
            name: "",
            type: "",
            puzzles: [],
            id: "",
            edit: false,
            editImage: "",
            editName: "",
            editType: "",
            addErrors: [],
            editErrors: [],
            viewPuzzles: []
        }
        
        //Bind each event
        this.setImage = this.setImage.bind(this);
        this.setName = this.setName.bind(this);
        this.setType = this.setType.bind(this);
        this.addPuzzle = this.addPuzzle.bind(this);
        this.editPuzzle = this.editPuzzle.bind(this);
        this.deletePuzzle = this.deletePuzzle.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }
    
    
    //Check if local storage has data, if so pull display it
    componentDidMount() {
        if(localStorage.getItem('puzzles')) {
            let puzzles = JSON.parse(localStorage.getItem('puzzles'));
            this.setState({puzzles: puzzles, viewPuzzles: puzzles});
        };
    };
    
    //Validate each input
    validate(image, name, type) {
        let errors = [];
        
        if(image.length === 0 || image.match(/\.(jpeg|jpg|gif|png)$/) === null) {
            errors.push("Please enter a url to an image!");
        };
        
        if (name.length === 0) {
            errors.push("You must enter a name for your puzzle!");
        };
        
        if (type.length === 0) {
            errors.push("Please select a puzzle type!");
        };
        
        return errors;
    };
    
    //Set the entered values as a new object's values
    setImage(e) {
        e.preventDefault();
        this.setState({image: e.target.value});
    };
    
    setName(e) {
        e.preventDefault();
        this.setState({name: e.target.value});
    };
    
    setType(e) {
        e.preventDefault();
        this.setState({type: e.target.value});
    };
    
    //Add the object to the array
    addPuzzle(e) {
        e.preventDefault();
        let image = this.state.image;
        let name = this.state.name;
        let type = this.state.type;
        let errors = this.validate(image, name, type);

        if(errors.length !== 0) {
            this.setState({addErrors: errors});
            } else {
                let puzzles = this.state.puzzles;
                let puzzle = {image: image, name: name, type: type};
                puzzles.push(puzzle);
                this.setState({puzzles: puzzles});
                localStorage.setItem('puzzles', JSON.stringify(puzzles));
                document.querySelector('#addImage').value = "";
                document.querySelector('#addName').value = "";
                document.querySelector('#addType').value = "";
            };
    };
    
    //Delete an object from the array
    deletePuzzle(e) {
        e.preventDefault();
        let puzzles = this.state.puzzles;
        let id = parseInt(e.target.parentElement.parentElement.parentElement.querySelector("#itemID").textContent);
        puzzles.splice(id, 1);
        this.setState({puzzles: puzzles});
        localStorage.setItem("puzzles", JSON.stringify(puzzles));
    };
    
    //Replace the existing values with the newly edited ones
    setEditImage(e) {
        e.preventDefault();
        this.setState({editImage: e.target.value});
    };
    
    setEditName(e) {
        e.preventDefault();
        this.setState({editName: e.target.value});
    };
    
    setEditType(e) {
        e.preventDefault();
        this.setState({editType: e.target.value});
    };
    
    //Edit an object within the array
    editPuzzle(e) {
        e.preventDefault();
        let id = parseInt(e.target.parentElement.parentElement.parentElement.querySelector('#itemID').textContent);
        let puzzle = this.state.puzzles[id];
        this.setState({edit: true, id: id}, () => {});
    };
    
    //Update the edited object
    updatePuzzle(e) {
        e.preventDefault();
        
        let puzzles = this.state.puzzles;
        let id = this.state.id;
        let image = this.state.editImage;
        let name = this.state.editName;
        let type = this.state.editType;
        let errors = this.validate(image, name, type);
        
        if(errors.length !== 0) {
            this.setState({editErrors: errors});
            
            } else {
                
            let puzzle = {image: image, name: name, type: type};
            puzzles[id] = puzzle;
                
            this.setState({puzzles: puzzles});
            localStorage.setItem('puzzles', JSON.stringify(puzzles));
            this.closeEdit();
        };
    };
    
    closeEdit(e) {
        this.setState({edit: false});
    };
    
    
    
    
    //Render the elements to be written onto the DOM
    render() {
        return (
            <main id="home">
                <h1>Dashboard</h1>
                <section className="add">
                    <h3>Add New Puzzle</h3>
                    <form>
                        <p>
                            <label>Puzzle Image</label>
                            <input type="text" id="addImage" onKeyUp={(e) => this.setImage(e)}></input>
                        </p>
                        <p>
                            <label>Puzzle Name</label>
                            <input type="text" id="addName" onKeyUp={(e) => this.setName(e)}></input>
                        </p>
                        <p>
                            <label>Puzzle Type</label>
                            <input type="text" id="addType" onKeyUp={(e) => this.setType(e)}></input>
                        </p>
                    </form>
                    <p>
                        <button className="addBtn" type="submit" onClick={(e) => this.addPuzzle(e)}><FontAwesome name="plus" /> Add</button>
                    </p>
                    <ul id="addErrors" className="errors">
                        {
                            Object.keys(this.state.addErrors).map((key) => {
                                return (
                                    <li key={key}><p>{this.state.addErrors[key]}</p></li>
                                );
                            })
                        }
                    </ul>
                </section>

                <section className="myPuzzles">
                    <h2>My Puzzles</h2>
                    <article>
                        {   Object.keys(this.state.viewPuzzles).map((key) => {
                                return (
                                    <ul key={key} >
                                        <li id="itemID"> {key} </li>
                                        <li> <img src={this.state.viewPuzzles[key].image} /> </li>
                                        <li><p>Name: </p> {this.state.viewPuzzles[key].name} </li>
                                        <li><p>Type: </p> {this.state.viewPuzzles[key].type} </li>
                                        <li>
                                            <button className="editBtn" onClick={(e) => this.editPuzzle(e)}><FontAwesome name="pencil" /></button>
                                            <button className="deleteBtn" onClick={(e) => this.deletePuzzle(e)}><FontAwesome name="trash" /></button>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </article>
                </section>



                <section className="edit">
                    {this.state.edit === true &&
                    <section className="editingSection">
                        <h2>Edit Puzzle</h2>
                        <form id="editPuzzle">
                            <p>
                                <label>Image</label>
                                <input id="editImage" name="editImage" type="text" onKeyUp={(e) => this.setEditImage(e)} />
                            </p>
                            <p>
                                <label>Name</label>
                                <input id="editName" name="editName" type="text" onKeyUp={(e) => this.setEditName(e)} />
                            </p>
                            <p>
                                <label>Type</label>
                                <input id="editType" name="editType" type="text" onKeyUp={(e) => this.setEditType(e)} />
                            </p>
                        </form>
                        <p>
                            <button className="closeBtn" onClick={(e) => this.closeEdit(e)}><FontAwesome name="times" /> Cancel</button>
                            <button className="saveBtn" type="submit" onClick={(e) => this.updatePuzzle(e)}><FontAwesome name="floppy-o" /> Save</button>
                        </p>
                        <ul id="editErrors" className="errors">
                        {   Object.keys(this.state.editErrors).map((key) => {
                                return (
                                    <li key={key}><p>{this.state.editErrors[key]}</p></li>
                                )
                            })
                        }
                        </ul>
                    </section>
                    }
                </section>
            </main>
        );
    };
};

export default Home;