import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import cardArt from "../../image/cardArtBackground.jpg";
import logoSmall from "../../image/greenFrog.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Utilities/Loader";
import Message from "../Utilities/Message";
import { register } from "../../actions/userActions";
import store from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_LOGOUT } from "../../actions/types";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [confirmPassword, setConfirmPassword] = useState({});

  // Below is to check whether user is authenticated. If auth then can't access /register
  // userLogin is from store.js
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, message } = userRegister;

  // const notify = () => toast("Wow so easy!");

  function notifyError() {
    toast(error);
  }

  function notifySuccess() {
    toast(message);
  }

  useEffect(() => {
    if (error) {
      notifyError();
      dispatch({ type: USER_LOGOUT });
    }
    if (message) {
      notifySuccess();

      setTimeout(() => {
        navigate("/login");
        dispatch({ type: USER_LOGOUT });
      }, 2000);
    }
  }, [error, message]);

  useEffect(() => {
    // if userInfo exists then show the home page, this is so that logged in user can't acces /login
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // calling the action
    dispatch(register(username, email, password, confirmPassword));
  };

  return (
    <div id="loginPage" class="container-fluid px-0">
      <div id="loginContainer">
        <div class="card" id="loginCard">
          <h3 className="d-flex mt-3 mb-4 h1 text-white">Ready to join in</h3>
          <br />
          <ToastContainer />

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="userName">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="userName"
                  placeholder="jondoe111"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-4" controlId="email">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-4" controlId="c_password">
              <FloatingLabel
                controlId="floatingPassword"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center mt-5">
              {loading ? (
                <Button type="submit" disabled className="mb-2 mt-3 w-100 btn">
                  <Loader />
                </Button>
              ) : message ? (
                <Button type="submit" disabled className="mb-2 mt-3 w-100 btn">
                  Get Started
                </Button>
              ) : (
                <Button type="submit" className="mb-2 mt-3 w-100 btn">
                  Get Started
                </Button>
              )}
            </div>
          </Form>
          <small className="d-flex justify-content-end align-items-center text-white">
            <b>
              {" "}
              Already a member?&nbsp;
              {loading ? (
                <span id="signUpLink" class="text-primary">
                  SIGN IN
                </span>
              ) : message ? (
                <span id="signUpLink" class="text-primary">
                  SIGN IN
                </span>
              ) : (
                <Link to="/login" id="signUpLink" class="text-primary">
                  SIGN IN
                </Link>
              )}
            </b>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
