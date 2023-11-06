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

function Home() {
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
  }, [messageDeletePost, sort, sortCounter, updateSubribbitData, search]); // passing match.sub here so that if match.sub changes, useEffect will be called. Read more: https://reactjs.org/docs/hooks-effect.html

  function getSortLink(sortValue) {
    var sortLink = "/home?sort=" + sortValue;
    return sortLink;
  }

  function checkPostEmpty() {
    if (posts.length < 1 && search === "") return true;
    return false;
  }

  // get userLogin from state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div class="container-fluid px-0">
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
        <div class="row">
          <div class="col-md-3 mt-2">
            <div id="subribbitList">
              <SubribbitList />
            </div>
          </div>

          <div class="col-md-5">
            <div>
              {!loading && error ? (
                <GeneralGetErrorPage />
              ) : (
                <div class="row pt-2">
                  {/* <div class="col-md-12 p-0">
                    <SubribbitSideBar user={userInfo} sub={subribbitDetails} />
                  </div> */}

                  <div class="col-md-12">
                    <div class="row">
                      <div
                        class="card border-0 mb-2 p-0"
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
                    </div>

                    <div class="row">
                      <div class="card border-0" id="createPost" align="center">
                        {userInfo ? (
                          <div class="row py-2">
                            <div class="col-md-12" style={{ padding: "0" }}>
                              
                            </div>
                          </div>
                        ) : (
                          <div class="row py-3" id="loginRequireBar" style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)' }}>
                            <div class="col-md-8 p-2" align="left" style={{ color: 'white' }}>
                              &nbsp;&nbsp;&nbsp;&nbsp;<strong>Login or sign up to start posting!</strong>
                            </div>
                            <div class="col-md-2 p-1" align="right">
                              <Link to="/login">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm"
                                >
                                  Log In
                                </button>
                              </Link>
                            </div>
                            <div class="col-md-2 p-1" align="left">
                              <Link to="/register">
                                <button
                                  type="button"
                                  class="btn btn-success btn-sm"
                                >
                                  Sign Up
                                </button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div class="row">
                      <div class="card" id="chooseFilter" align="left">
                        <div class="d-flex flex-row p-2">
                          <div>
                            <Link to={getSortLink("latest")}>
                              <button
                                type="button"
                                class="btn btn-primary btn-sm"
                                onClick={() => {
                                  setSearch("");
                                  setSortCounter(sortCounter + 1);
                                }}
                              >
                                <i class="far fa-clock"></i>&nbsp;&nbsp;Latest
                              </button>
                            </Link>
                            &nbsp; &nbsp;
                          </div>
                          <div>
                            <Link to={getSortLink("numComments")}>
                              <button
                                type="button"
                                class="btn btn-success btn-sm"
                                onClick={() => {
                                  setSearch("");
                                  setSortCounter(sortCounter + 1);
                                }}
                              >
                                <i class="fas fa-fire-alt"></i>
                                &nbsp;&nbsp;Most Comments
                              </button>
                            </Link>
                            &nbsp; &nbsp;
                          </div>
                          <div>
                            <Link to={getSortLink("rating")}>
                              <button
                                type="button"
                                class="btn btn-warning btn-sm"
                                onClick={() => {
                                  setSearch("");
                                  setSortCounter(sortCounter + 1);
                                }}
                              >
                                <i class="fas fa-award"></i>&nbsp;&nbsp;Most
                                Upvote
                              </button>
                            </Link>
                            &nbsp;
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <center>
                        {search !== "" ? (
                          <div>
                            <small
                              style={{ color: "white", marginBottom: "2px" }}
                            >
                              <strong style={{ color: "black" }}>Showing search result for: <i>{search}</i></strong>
                              <button
                                id="clearSearchButton"
                                onClick={() => setSearch("")}
                              >
                                &nbsp;&nbsp;<strong style={{ color: "black" }}><u><b>Clear</b></u></strong>
                              </button>
                            </small>
                          </div>
                        ) : null}
                      </center>
                    </div>

                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message color="danger">{error}</Message>
                    ) : (
                      <div class="row">
                        {checkPostEmpty() ? (
                          <CommunityNoPostsYet sub={match.sub} />
                        ) : (
                          <div>
                            {posts.map((post) => (
                              <Row>
                                <Post post={post} sub={match.sub} />
                              </Row>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
