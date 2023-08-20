/* eslint-disable no-unused-vars */
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import { Dashboard } from "./pages/dashboard";
import Profile from "./pages/Profile/profile";
import Customers from "./pages/Customers/customers";

import Private from "./private/Private";

import AuthProvider from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <AuthProvider>
              <ToastContainer autoClose={3000}></ToastContainer>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/dashboard"
                  element={
                    <Private>
                      <Dashboard />
                    </Private>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Private>
                      <Profile />
                    </Private>
                  }
                />
                <Route
                  path="/customers"
                  element={
                    <Private>
                      <Customers />
                    </Private>
                  }
                />
              </Routes>
            </AuthProvider>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

/*
<nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              positronX
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/dashboard"}>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        */
