import React, { Component } from "react";
import { AppBar, RaisedButton, IconButton, MuiThemeProvider } from "material-ui";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Layout } from "antd";


import { pomodoro } from "./firebase-config";
import * as firebase from "firebase";

import "./App.css";
import logo from "./logo.svg";

import Page from "./Page";
import Timer from "./Timer";
import Motivation from "./Motivation";

const { Header, Footer, Sider, Content } = Layout;

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInState: true
    };
  }

  handleLogInButton(logInState) {
    if (this.state.logInState) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.setState({
            username: result.user.displayName,
            logInState: !this.state.logInState,
            photoURL: result.user.photoURL
          });
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setState({
            username: "",
            emailVerified: false,
            logInState: !this.state.logInState
          });

          window.location = "/";
        })
        .catch(function (error) {
          // An error happened.
        });
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="header">
            <AppBar
              title="Pomodoro Timer"
              iconElementLeft={
                <img
                  src="http://www.iconsdb.com/icons/preview/white/tomato-xxl.png"
                  className="appIcon"
                />
              }
              iconElementRight={
                <div className="rightIcons">
                  {!this.state.logInState &&
                    <span className="welcome">
                      {" "}Welcome {this.state.username}!
                      {" "}
                    </span>}
                  <span>
                    {" "}
                    <img className="appIconPicture" src={this.state.photoURL} />
                    {" "}
                  </span>
                  <button
                    className="button"
                    type="primary"
                    onClick={() =>
                      this.handleLogInButton(this.state.logInState)}
                  >
                    {this.state.logInState && <div>Log In</div>}
                    {!this.state.logInState && <div>Log Out</div>}
                  </button>

                </div>
              }
              style={{
                backgroundColor: "black"
              }}
            />
          </div>
          {" "}
          {!this.state.logInState &&
            <Page
              userID={this.state.username}
              photoURL={this.state.photoURL}
            />}
          {this.state.logInState && <Motivation />}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;