// ShowCommunityGuidelinesMessage.js
import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  FloatingLabel,
  Toast,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import logoSmall from "../../image/greenFrog.png";
import { listPosts } from "../../actions/postActions";
import { subribbitDetailAction } from "../../actions/subribbitActions";
import Post from "../Posts/Post";
import Loader from "../Utilities/Loader";
import Message from "../Utilities/Message";
import UserNavbar from "../Navbar/UserNavbar";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import HomeSideBar from "../SideBar/HomeSideBar";
import SuccessToast from "../Toasts/SuccessToast";
import { DELETE_POST_RESET } from "../../actions/types";
import SubribbitSideBar from "../SideBar/SubribbitSideBar";
import HomeSubSideBar from "../SideBar/HomeSubSideBar";
import CommunityNoPostsYet from "../Utilities/CommunityNoPostsYet";
import GeneralGetErrorPage from "../Utilities/GeneralGetErrorPage";
import image1 from "../../image/1.png";
import SubribbitList from "../Subribbit/SubribbitList";

function ShowCommunityGuidelinesMessage() {
  const match = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [sortCounter, setSortCounter] = useState(0);
  const sub = "-";
  const parameterSearch = useLocation().search;
  const sort = new URLSearchParams(parameterSearch).get("sort");
  const [search, setSearch] = useState("");
  const postList = useSelector((state) => state.postList);
  const { error, loading, posts } = postList;
  const deletePost = useSelector((state) => state.deletePost);
  const { message: messageDeletePost } = deletePost;
  const updateSubribbit = useSelector((state) => state.updateSubribbit);
  const {
    loading: loadingUpdateSubribbit,
    error: errorUpdateSubribbit,
    subribbit: updateSubribbitData,
  } = updateSubribbit;
  const subribbitDetails = useSelector((state) => state.subribbitDetails);
  const {
    error: subribbitDetailError,
    loading: subribbitDetailLoading,
    subribbit: subribbitDetail,
  } = subribbitDetails;
  const handleNavbarSearch = (searchQuery) => {
    console.log("Search query from Navbar:", searchQuery);
    setSearch(searchQuery);
  };
  useEffect(() => {
    dispatch(listPosts("-", sort, search));
  }, [messageDeletePost, sort, sortCounter, updateSubribbitData, search]);
  function getSortLink(sortValue) {
    var sortLink = "/home?sort=" + sortValue;
    return sortLink;
  }
  function checkPostEmpty() {
    if (posts.length < 1 && search === "") return true;
    return false;
  }
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className="container-fluid px-0">
      <UserNavbar />
      <img
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          objectFit: "cover",
        }}
        src={image1}
        alt=""
      ></img>
      <div id="page-size">
        <div className="row">
          <div className="col-md-3 mt-2">
            <div id="subribbitList">
              <SubribbitList />
            </div>
          </div>
          <div className="col-md-5">
            <div>
              {!loading && error ? (
                <GeneralGetErrorPage />
              ) : (
                <div className="row pt-2">
                  <div
                    className="col-md-12 p-0"
                    id="searchTitle"
                    align="left"
                  >
                    <Form.Control
                      required
                      type="search"
                      placeholder={"\u{1F50E} Search a post title"}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div
                    className="card border-0"
                    id="createPost"
                    align="center"
                  >
                    {userInfo ? (
                      <div className="row py-2">
                        <div className="col-md-12" style={{ padding: "0" }}>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="row py-3"
                        id="loginRequireBar"
                        style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)' }}
                      >
                        <div
                          className="col-md-8 p-2"
                          align="left"
                          style={{ color: 'white' }}
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <strong>Login or sign up to start posting!</strong>
                        </div>
                        <div className="col-md-2 p-1" align="right">
                          <Link to="/login">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              Log In
                            </button>
                          </Link>
                        </div>
                        <div className="col-md-2 p-1" align="left">
                          <Link to="/register">
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                            >
                              Sign Up
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="row"
                    id="chooseFilter"
                    align="left"
                  >
                    <center>
                      {search !== "" ? (
                        <div>
                          <small
                            style={{ color: "white", marginBottom: "2px" }}
                          >
                            <strong style={{ color: "black" }}>
                              Showing search result for: <i>{search}</i>
                            </strong>
                            <button
                              id="clearSearchButton"
                              onClick={() => setSearch("")}
                            >
                              &nbsp;&nbsp;
                              <strong style={{ color: "black" }}>
                                <u><b>Clear</b></u>
                              </strong>
                            </button>
                          </small>
                        </div>
                      ) : null}
                    </center>
                  </div>
                  <div className="row">
                    <div className="card border-0 col-md-12 offset-md-1 text-center" style={{ backgroundColor: '#dfd4d4ad' }}>
                      <h1><strong>Welcome to Redyssey!</strong></h1>
                      <p>
        <strong>Discover the World Through Travel Reviews</strong>
      </p>
      <p>
        Redyssey is not just a platform; it's your gateway to a world of travel experiences. Whether you're looking for dream destinations, just browsing or currently at travel, Redyssey is here to connect you with the heartbeat of travel.
      </p>
      <h2>What Sets Redyssey Apart?</h2>
      <p>
        <span role="img" aria-label="Globe">🌍</span> <strong>Authentic Reviews:</strong> Our community of passionate travelers shares honest and authentic reviews, ensuring you get the real scoop on destinations, accommodations, and adventures.
      </p>
      <p>
        <span role="img" aria-label="Airplane">✈️</span> <strong>Explore Hidden Gems:</strong> Uncover off-the-beaten-path destinations and hidden gems suggested by fellow Redyssey explorers. Say goodbye to the ordinary, and embrace the extraordinary.
      </p>
      <p>
        <span role="img" aria-label="Handshake">🤝</span> <strong>Connect with Travel Enthusiasts:</strong> Redyssey isn't just about reviews; it's about building a community of like-minded individuals who share a love for exploration. Connect, engage, and swap travel stories with fellow adventurers.
      </p>
      <h2>Your Journey Starts Here</h2>
      <p>
        Embark on a journey of discovery with Redyssey. From breathtaking landscapes to bustling cityscapes, our platform is your digital compass for navigating the vast realm of travel possibilities.
      </p>
      <p>
        Join Redyssey today and let the adventure begin!
      </p>
                      <h1><strong>Redyssey Community Guidlines</strong></h1>
                      <p>
        Welcome to the Redyssey community! To ensure a positive and respectful environment for all our members, we have established these community guidelines. Please read and adhere to them when participating in discussions, posting content, or interacting with others on Redyssey.
      </p>
      <h2>1. Be Respectful</h2>
      <p>
        Treat fellow community members with respect and kindness. Avoid offensive languagex, personal attacks, or any form of discrimination. We celebrate diversity and want everyone to feel welcome.
      </p>
      <h2>2. Keep it Civil</h2>
      <p>
        Engage in constructive and civil conversations. Disagreements are natural, but express your opinions in a thoughtful and considerate manner. Refrain from trolling, harassment, or any behavior that disrupts the community.
      </p>
      <h2>3. Authenticity Matters</h2>
      <p>
        Share genuine experiences and information. Avoid spreading misinformation, fake news, or engaging in deceptive practices. Authenticity is crucial in building a trustworthy community.
      </p>
      <h2>4. Respect Privacy</h2>
      <p>
        Respect the privacy of others. Do not share personal information without consent. Be mindful of the content you post and ensure it complies with our privacy guidelines.
      </p>
      <h2>5. Stay on Topic</h2>
      <p>
        Contribute relevant content to the community. Stay on topic within each subreddit and avoid spamming or posting unrelated content. This helps maintain a focused and organized community.
      </p>
      <h2>6. Report Violations</h2>
      <p>
        If you come across content or behavior that violates these guidelines, please report it to the moderators. We rely on the community to help maintain a safe and enjoyable environment for everyone.
      </p>
      <p>
        By following these guidelines, you contribute to creating a vibrant and respectful community on Redyssey. Thank you for being a valued member!
      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default ShowCommunityGuidelinesMessage;

