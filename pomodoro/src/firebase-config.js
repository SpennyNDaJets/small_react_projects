import * as firebase from 'firebase';

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_SECRET_CODE,
    authDomain: "pomodoro-49963.firebaseapp.com",
    databaseURL: "https://pomodoro-49963.firebaseio.com",
    projectId: "pomodoro-49963",
    storageBucket: "pomodoro-49963.appspot.com",
    messagingSenderId: "133089987936"
};

export const pomodoro = firebase.initializeApp(firebaseConfig);