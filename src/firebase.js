import firebase from "firebase";
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-storage'
import 'firebase/firebase-database'
// import * as admin from 'firebase-admin';
// require('firebase-admin');

var firebaseConfig = {
    apiKey: "AIzaSyCOFJJSFJSHMeuDDI04W-jOrvqV3vClmtA",
    authDomain: "smparking-7cb35.firebaseapp.com",
    databaseURL: "https://smparking-7cb35.firebaseio.com",
    projectId: "smparking-7cb35",
    storageBucket: "smparking-7cb35.appspot.com",
    messagingSenderId: "113431147806",
    appId: "1:113431147806:web:a49c8af98926fcdff2c50f",
    measurementId: "G-3D7SLEFWM0"
};


const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const rdb = firebase.database();
// const admin = firebase.admin();
firebase.analytics();
export { fb, db, rdb };
