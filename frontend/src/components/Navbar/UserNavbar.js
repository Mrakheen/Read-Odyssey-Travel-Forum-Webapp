//import React from "react";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logoSmall from "../../image/greenFrog.png";
import logoName from "../../image/logoName.png";
import homeIcon from "../../image/home_icon.png";
import communityIcon from "../../image/community_icon.png";
import { useDispatch, useSelector } from "react-redux";
import homeLogo from "../../image/home-solid.svg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import NotificationButton from "../Notification/NotificationButton";
import CreatePostButtonNavbar from "../Posts/CreatePostButtonNavbar";
import { GetUsername } from "../Utilities/GetUsername";
import Home from "../Home/Home"
import ShowCommunityGuidelinesMessage from "../CommunityGuidlines/ShowCommunityGuidelinesMessage";

function UserNavbar({ onSearch }) {
  // get userLogin from state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  // now call the dispatch to logout in userActions
  const logoutHandler = () => {
    dispatch(logout());
  };

  // const realUsername = GetUsername(userInfo.username);
  // console.log(realUsername);

  const [scrolled, setScrolled] = useState(false);

  // Add a scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg custom-navbar ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <Container>
        <div class="pt-1">
          <Link to="/">
            <Navbar.Brand>
              <img
                src={logoSmall}
                className="d-inline-block ml-1" // Add a left margin
                id="logoNavbar"
                width="200"
                height="50"
                alt="Logo Small"
              />
            </Navbar.Brand>
          </Link>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" align="center">
          {/* Need to set this navbar as a separate ul first, and then give a me-auto. Check the next ul */}
           <ul class="navbar-nav me-auto">
            {/*<li class="nav-item active">
              <Link to="/home">
                <button type="button" className="btn btn-dark" id="buttonHome">
                  <img src={homeIcon} alt="Home" width="30" height="30" />
                  <span className="sr-only">(current)</span>
                </button>
              </Link>
            </li>*/}

            {/* <li class="nav-item active">
              <Link to="/subribbits">
                <button type="button" className="btn btn-dark" id="buttonHome">
                  <img src={communityIcon} alt="Home" width="30" height="30" />
                  <span className="sr-only">(current)</span>
                </button>
              </Link>
            </li>*/} 

          </ul>
          <ul class="navbar-nav navbar-right">
            <CreatePostButtonNavbar />
            &nbsp;&nbsp;&nbsp;
          </ul>
          <ul class="navbar-nav navbar-right">
            {userInfo ? <NotificationButton /> : null}
            &nbsp;
          </ul>
          {/* So here is the next ul, where I put the navbar-right in a separate ul for the user dropdown */}
          <ul class="navbar-nav navbar-right">
            <li class="nav-item">
              <button type="button" class="btn btn-dark Profile-Bttn">
                {userInfo ? (
                  <NavDropdown
                    title={
                      <>
                        <img
                          src={userInfo.gravatarURL}
                          id="profileLogo"
                          alt=""
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;<b style={{ color: 'black' }}><i>{userInfo.username}</i></b>
                      </>
                    }
                    class="pt-1"
                  >
                    <LinkContainer to={`/user/${userInfo.username}`}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    <LinkContainer to="/community-guidelines">
                    <NavDropdown.Item>
                      Community Guidelines
                    </NavDropdown.Item>
                  </LinkContainer>
                          </NavDropdown>
                        ) : (
                          <LinkContainer to="/login">
                            <Nav.Link>
                              <i className="fas fa-user"></i>
                              &nbsp;&nbsp;Login
                            </Nav.Link>
                          </LinkContainer>
                        )}
              </button>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}

export default UserNavbar;
