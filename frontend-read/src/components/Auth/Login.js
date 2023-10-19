import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import logoSmall from "../../image/greenFrog.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Utilities/Loader";
import Message from "../Utilities/Message";
import { login } from "../../actions/userActions";
import store from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_LOGOUT } from "../../actions/types";
import GoogleLoginButton from "../Buttons/GoogleLoginButton";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});

  // userLogin is from store.js
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  function notifyError() {
    toast(error);
  }

  useEffect(() => {
    if (error) {
      notifyError();
      dispatch({ type: USER_LOGOUT });
    }
    if (userInfo) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, [error, userInfo]);

  useEffect(() => {
    // if userInfo exists then show the home page, this is so that logged in user can't acces /login
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // calling the action
    dispatch(login(username, password));
  };

  return (
    <div id="loginPage" class="container-fluid px-0">
      <div id="loginContainer">
        <div class="card" id="loginCard">
          <h3 className="d-flex mt-3 mb-4 h1 text-white">
            <strong>Let's start a new adventure</strong>
          </h3>
          <br />
          <ToastContainer />

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="email">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-2" controlId="password">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Row>
              <div class="pl-3 mb-5">
                {/* {loading ? (
                  <div id="forgotPass">
                    Forgot your&nbsp;
                    <span
                      className="mb-2"
                      id="forgotPass"
                      style={{ color: "blue" }}
                    >
                      password
                    </span>
                    ?
                  </div>
                ) : (
                  <div id="forgotPass">
                    Forgot your&nbsp;
                    <Link
                      to="/sendResetPasswordEmail"
                      className="mb-2 text-primary"
                      id="forgotPass"
                    >
                      password
                    </Link>
                    ?
                  </div>
                )} */}
              </div>
            </Row>
            <div id="flexSigninButton">
              {loading ? (
                <Button type="submit" disabled className="mb-2 mt-3 w-100 btn">
                  <Loader />
                </Button>
              ) : (
                <div>
                  <Button type="submit" className="mb-2 my-2 w-100 btn">
                    Log In
                  </Button>
                  <GoogleLoginButton />
                </div>
              )}
            </div>
          </Form>
          <small className="d-flex justify-content-end align-items-center text-white">
            <b>
              {" "}
              New to App?&nbsp;
              {loading ? (
                <span class="text-decoration-none text-primary">
                  {"  "}SIGN UP NOW
                </span>
              ) : (
                <Link to="/register" class="text-decoration-none text-primary">
                  {"  "}SIGN UP NOW
                </Link>
              )}
            </b>
          </small>
          <div class="m-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
