import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import firebase from "./firebase";


//
// import {Provider} from 'react-redux';
// import {createStore} from 'redux';
// import allReducers from './reduxStaff/rootReduser';
// const store = createStore(allReducers);

firebase.auth().onAuthStateChanged(function(user) {
    const authorized = user ? true :false;

    console.log(`in index  ${authorized}`);


ReactDOM.render(
    <BrowserRouter>
        {/*<Provider store={store} >*/}
            <Router isAuthorized={authorized}/>
        {/*</Provider>*/}
    </BrowserRouter>
    , document.getElementById('root'));

});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
