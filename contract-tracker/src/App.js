import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
import './App.css';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: process.env.REACT_APP_SECRET_CODE,
  authDomain: "contract-finder.firebaseapp.com",
  databaseURL: "https://contract-finder.firebaseio.com",
  projectId: "contract-finder",
  storageBucket: "contract-finder.appspot.com",
  messagingSenderId: "700679517924"
};
firebase.initializeApp(config);

var readData = firebase.database().ref("Contracts");

/* create contract mode => editIndex < 0
 edit mode => editIndex >= 0
 see App Constructor for more info */

class UserInput extends Component {
  // constructor for user input
  constructor(props) {
    super(props);

    // initial all fields to blan strings
    this.state = {
      title: "",
      description: "",
      price: "",
    };

    // bind "this"" to  userInput
    this.updateContractInput = this.updateContractInput.bind(this);
    this.submitContract = this.submitContract.bind(this);
  } 

  // handle submit - when submit button does
  submitContract(e) {
    // prevent passing default inputs
    e.preventDefault();

    // pass state to parent component method based on method aved in onSubmit prop
    // calls updateContract() in edit mode and createContract() in new contract mode
    this.props.onSubmit(this.state.title, this.state.description, this.state.price, this.props.editIndex);

    // reset input fields to default
    this.setState({
      title: "",
      description: "",
      price: ""
    });
  }

  // update state of userInput on change in text field
  updateContractInput(field, e) {
    // set value to value (text) in the target (text field) of the action (type)
    var value = e.target.value;

    //update state
    this.setState({
        // copy current state
        ...this.state,
        //change singular field - string (i.e. price) will be evaluated to change state
        [field]: value,
    });
  }

  render() {
    return (
      <div className="inputContainer">
        {/*create form, go to submitContact method method on Submit
      same for new contract mode and edit mode*/}
        <form className='column' onSubmit={this.submitContract}>

          {/*in new contract mode*/}
          {this.props.editIndex < 0 &&
            <div>
              <label className='header' htmlFor='title'>
                New Contract
              </label>
              {/*Input field for title*/}
              <input
                id='title'
                placeholder='Title of Contract'
                type='text'
                autoComplete='off'
                value={this.state.title}
                onChange={e => this.updateContractInput("title", e)}
              />
              {/*Input field for description*/}
              <input
                id='description'
                placeholder='Description'
                type='text'
                autoComplete='off'
                value={this.state.description}
                onChange={e => this.updateContractInput("description", e)}
              />
              {/*Input field for price*/}
              <input
                id='price'
                placeholder='Price'
                type='text'
                autoComplete='off'
                value={this.state.price}
                onChange={e => this.updateContractInput("price", e)}
              />
              {/*submit button, must put text in title input to submit*/}
              <button
                className='button'
                type='submit'
                disabled={!this.state.title}>
                Submit
              </button>
            </div>}

          {/*in edit mode*/}
          {this.props.editIndex >= 0 &&
            <div>
              <label className='header' htmlFor='title'>
                Edit Contract {this.props.editIndex + 1}
              </label>
              {/*Input field for title, set placeholder to the contact you want to edit's title*/}
              <input
                id='title'
                placeholder={this.props.uploadedContract.title}
                type='text'
                autoComplete='off'
                value={this.state.title}
                onChange={e => this.updateContractInput("title", e)}
              />
              {/*Input field for description, set placeholder to the contact you want to edit's description*/}
              <input
                id='description'
                placeholder={this.props.uploadedContract.description}
                type='text'
                autoComplete='off'
                value={this.state.description}
                onChange={e => this.updateContractInput("description", e)}
              />
              {/*Input field for price, set placeholder to the contact you want to edit's price*/}
              <input
                id='price'
                placeholder={this.props.uploadedContract.price}
                type='text'
                autoComplete='off'
                value={this.state.price}
                onChange={e => this.updateContractInput("price", e)}
              />
              {/*Submit button - same as new contract but with different text*/}
              <button
                className='button'
                type='submit'
                disabled={!this.state.title && !this.state.description && !this.state.price}>
                Finish Editing
              </button>
            </div>}
        </form>
      </div>
    )
  }

}


class App extends Component {
  // set initial state
  constructor(props) {
    super(props);

    this.state = {
      contractList: [],
      // edit index = -1 when not editting, edit index will be changed to 
      // index value of contract in contractList when editting
      editIndex: -1,
      // editContract is made up of empty strings when not editting
      editContract: { title: "", description: "", price: "" }
    };

    // bind necessary methods so "this" refers to App
    this.createContract = this.createContract.bind(this);
    this.uploadContract = this.uploadContract.bind(this);
    this.editContract = this.editContract.bind(this);
  }

  // grab data from database
  componentWillMount() {
    readData.on('value', (snapshot) => {
      this.setState({
        ...this.state,
        contractList: snapshot.val().Contracts,
      })
    })
  }

  // change state when edit button is pressed to change to edit mode
  uploadContract(editIndex) {
    this.setState({
      // make copy of state
      ...this.state,
      // editIndex is the index of the contract you want to edit
      editIndex: editIndex,
      // editContract is the contract object itself
      editContract: this.state.contractList[editIndex]
    });
  }

  // update contract with parameters passed from userInput component
  // passed in to onSubmit prop when in edit mode
  editContract(title, description, price, index) {
    // create new contract with parameters from playerInput
    let newContract = {
      title: title,
      description: description,
      price: price
    };

    // copy contractList into new variable
    let newContractList = this.state.contractList;
    // change contract to created contract at index passed from playerInput
    // this is the index of the contract that the edit button was clicked
    newContractList[index] = newContract;

    // set state to rerender
    this.setState({
      ...this.state,
      // update contract list to update table/list
      contractList: newContractList,
      // reset index and contract to get out of edit mode
      editIndex: -1,
      editContract: { title: "", description: "", price: "" }
    });

    // add contract to database - editted contracts replace old contracts
    // by keeping track of index
    firebase.database().ref('Contracts').set({
        Contracts: newContractList
      });
  }

  // update contract with parameters passed from userInput component
  // passed in to onSubmit prop when in create new contract mode
  createContract (title, description, price, index) {  
    // create new contract ARRAY with parameters from playerInput
    let newContract = [{
      title: title,
      description: description,
      price: price
    }];

    // make new contractList that is the old contract list concatonated
    // with the single element new contract list
    let newContractList = this.state.contractList.concat(newContract);

    // update state with new contract list
    this.setState({
      ...this.state,
      contractList: newContractList
    });

    // add contract to database - new contract get named based on position in array
    firebase.database().ref('Contracts').set({
        Contracts: newContractList
      });
  }

  // render app
  render() {
    return (
      <div className="App">
        <h1 className="Header">Contract Tracker</h1>

        {/*create new contract mode, passed in createContract() as onSumbit prop to userInput*/}
        {this.state.editIndex < 0 &&
          <UserInput id="input"
            onSubmit={this.createContract}
            editIndex={this.state.editIndex}
            uploadedContract={this.state.editContract}
          />}

        {/*edit mode, passed in editContract() as onSumbit prop to userInput*/}
        {this.state.editIndex >= 0 &&
          <UserInput id="input"
            onSubmit={this.editContract}
            editIndex={this.state.editIndex}
            uploadedContract={this.state.editContract}
          />}

        {/*map contractList to render each contract with neccessary info
          'contract' - the individual contract when traversed
          'index' - the index of the contract in the array*/}
        <ul className="contractList">
          {this.state.contractList.map((contract, index) =>
            <li key={index} className="contract" >
              <h1 className="title">
                {contract.title}
              </h1>
              <h3 className="description">
                Description: {contract.description}
              </h3>
              <h3 className="price">
                Price: {contract.price}
              </h3>
              {/*call upload contract and pass index value of contract to
              to change to edit mode*/}
              <button className='button'
                onClick={(e) => this.uploadContract(index)}>
                Edit
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

// export app to render on index.js
export default App;