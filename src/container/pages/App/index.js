import React from 'react';
// import logo from '../../../assets/img/logo/logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Dashboard from '../Dashboard'
import Login from '../Login'
import Register from '../Register'

import { Provider } from 'react-redux'
import { store } from '../../../config/redux'

import '../../../../node_modules/sweetalert-react/node_modules/sweetalert/dist/sweetalert.css'

function App() {
    return ( <
        Provider store = {
            store
        } >
        <
        Router >
        <
        div > {
            /* <nav>
                            <ul>
                              <li>
                                <Link to="/">Home</Link>
                              </li>
                              <li>
                                <Link to="/Login">Login</Link>
                              </li>
                              <li>
                                <Link to="/register">Register</Link>
                              </li>
                            </ul>
                          < /nav> */
        } <
        Route path = "/"
        exact component = {
            Dashboard
        }
        /> <
        Route path = "/login"
        component = {
            Login
        }
        /> <
        Route path = "/register"
        component = {
            Register
        }
        /> < /
        div > <
        /Router> < /
        Provider >
    );
}

export default App;