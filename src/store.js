import { createStore, combineReducers, compose } from "redux"
import firebase from "firebase"
import "firebase/firestore"

import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase"
import { reduxFirestore, firestoreReducer } from "redux-firestore"

// Reducers
// @todo
// Firestore vs Real-time database

// From https://console.firebase.google.com/u/0/project/the-trencend/overview
const firebaseConfig = {
    apiKey: "AIzaSyAbLjjv0n1648oxOp9lw2SMpu98-C0qqXA",
    authDomain: "the-trencend.firebaseapp.com",
    databaseURL: "https://the-trencend.firebaseio.com",
    projectId: "the-trencend",
    storageBucket: "the-trencend.appspot.com",
    messagingSenderId: "949977336076"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialise App - shameless copy
// https://github.com/prescottprue/react-redux-firebase

firebase.initializeApp(firebaseConfig)

// Initialise FireStore
// timestamps stored in Cloud Firestore will be read back as
// Firebase Timestamp objects instead of as system Date objects.So you will also
// need to update code expecting a Date to instead expect a Timestamp.
const firestore = firebase.firestore()
// firebase.firestore()

const settings = { /* your settings... */ timestampsInSnapshots: true }
firestore.settings(settings)

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
})

// Create initial state
// Fetch setting from local storage to initialState later
const initialState = {}

// Create store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    composeEnhancers(reactReduxFirebase(firebase))
)

export default store
