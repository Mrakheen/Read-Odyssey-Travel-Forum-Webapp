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
import CommunityNoPostsYet from "../Utilities/CommunityNoPostsYet";
import GeneralGetErrorPage from "../Utilities/GeneralGetErrorPage";
import image1 from "../../image/1.png";
import SubribbitList from "./SubribbitList.js";
import ShowSubribbitMembersForMembersButton from "../Buttons/ShowSubribbitMembersForMembersButton";
import { GetUsername } from "../Utilities/GetUsername";

function Subribbit() {
  const match = useParams();
  const dispatch = useDispatch();
  const [sortCounter, setSortCounter] = useState(0);

  const parameterSearch = useLocation().search;
  const sort = new URLSearchParams(parameterSearch).get("sort");

  const [search, setSearch] = useState("");

  const searchPlaceholder = "Search a title about " + match.sub;

  const postList = useSelector((state) => state.postList);
  const { error, loading, posts } = postList;

  const subribbitDetails = useSelector((state) => state.subribbitDetails);
  const {
    error: subribbitDetailError,
    loading: subribbitDetailLoading,
    subribbit: subribbitDetail,
  } = subribbitDetails;

  const deletePost = useSelector((state) => state.deletePost);
  const { message: messageDeletePost } = deletePost;

  const requestJoinSubribbit = useSelector(
    (state) => state.requestJoinSubribbit
  );
  const {
    error: requestJoinSubribbitError,
    loading: requestJoinSubribbitLoading,
    requestJoinSubribbit: requestJoinSubribbitSuccess,
  } = requestJoinSubribbit;

  const updateSubribbit = useSelector((state) => state.updateSubribbit);
  const {
    loading: loadingUpdateSubribbit,
    error: errorUpdateSubribbit,
    subribbit: updateSubribbitData,
  } = updateSubribbit;

  const updateSubribbitMember = useSelector(
    (state) => state.updateSubribbitMember
  );
  const {
    error: errorUpdateMember,
    loading: loadingUpdateMember,
    member: memberUpdateMember,
  } = updateSubribbitMember;

  useEffect(() => {
    dispatch(listPosts(match.sub, sort, search));
    dispatch(subribbitDetailAction(match.sub));
  }, [
    match.sub,
    sort,
    sortCounter,
    messageDeletePost,
    subribbitDetailError,
    requestJoinSubribbitSuccess,
    updateSubribbitData,
    updateSubribbitMember,
    search,
  ]); // passing match.sub here so that if match.sub changes, useEffect will be called. Read more: https://reactjs.org/docs/hooks-effect.html

  // get userLogin from state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const realUsername = GetUsername(subribbitDetails.subribbit.ownerUsername);

  function getSortLink(sortValue) {
    var sortLink = "/community/" + match.sub + "?sort=" + sortValue;
    return sortLink;
  }

  function checkSubNameNotFound() {
    if (subribbitDetailError === "Subribbit name not found") return false;
    return true;
  }

  function isMemberOrOwner() {
    if (
      subribbitDetail.currentUserStatus === "ACCEPTED" ||
      subribbitDetail.currentUserStatus === "OWNER"
    )
      return true;
    return false;
  }

  function checkPostEmpty() {
    if (posts.length < 1 && search === "") return true;
    return false;
  }

  function checkSubribbitPrivate() {
    if (subribbitDetails.subribbit.typeName === "PRIVATE") return true;
    return false;
  }

  var linkCreatePost = "/createPost?subribbit=" + match.sub;
  const subribbitDateISO = new Date(subribbitDetails.subribbit.createdAt);
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = subribbitDateISO.getDate();
  const year = subribbitDateISO.getFullYear();
  const month = monthList[subribbitDateISO.getMonth()];

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
            {checkSubNameNotFound() ? (
              <div class="mx-4">
                {error || subribbitDetailError ? (
                  <GeneralGetErrorPage />
                ) : (
                  <div class="row pt-2">
                    <div class="col-md-12 p-0">
                      <SubribbitSideBar
                        user={userInfo}
                        sub={subribbitDetails}
                      />
                    </div>

                    <div class="col-md-12">
                      <div class="row">
                        <div
                          class="card border-0 my-2 p-0"
                          id="searchTitle"
                          align="left"
                        >
                          <Form.Control
                            required
                            type="search"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div
                          class="card border-0"
                          id="createPost"
                          align="center"
                        >
                          {userInfo ? (
                            isMemberOrOwner() ? (
                              <div class="row py-2">
                                <div class="col-md-12" style={{ padding: "0" }}>
                                  <Link to={linkCreatePost}>
                                    <button
                                      type="button"
                                      class="btn btn-dark btn-sm btn-block"
                                    >
                                      Create post about {match.sub}
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <div class="row py-2">
                                <div class="col-md-12" style={{ padding: "0" }}>
                                  <button
                                    type="button"
                                    disabled
                                    class="btn btn-dark btn-sm btn-block"
                                  >
                                    Join to create post on r/{match.sub}
                                  </button>
                                </div>
                              </div>
                            )
                          ) : (
                            <div class="row py-3" id="loginRequireBar">
                              <div class="col-md-8 pt-2" align="left">
                                &nbsp;&nbsp;&nbsp;&nbsp;Login or sign up before
                                posting
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
                                Showing search result for: <i>{search}</i>
                                <button
                                  id="clearSearchButton"
                                  onClick={() => setSearch("")}
                                >
                                  &nbsp;&nbsp;<b>Clear</b>
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
            ) : (
              <div class="row pt-5" align="center">
                <div class="row pt-5"></div>
                <div class="row pt-5"></div>
                <div class="row">
                  <b>Sorry, Subredyssey name not found.</b>
                  <br />
                  <small>
                    The Subredyssey may have been removed or the name is
                    incorrect.
                  </small>
                  <br />
                </div>

                <div class="row pt-5">
                  <div class="col-md-4 offset-md-4">
                    <Link to="/home">
                      <button class="btn btn-dark btn-block">GO HOME</button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div class="col-md-4 my-2">
            <div id="subribbitInfo">
              <div class="col-md-3 mt-2">
                {checkSubribbitPrivate() ? (
                  <span class="badge badge-info">
                    {subribbitDetails.subribbit.typeName}
                  </span>
                ) : (
                  <span class="badge badge-success">
                    {subribbitDetails.subribbit.typeName}
                  </span>
                )}
              </div>
              <div class="col-md-6 mt-3" id="subribbitInfoText">
                <i class="fa fa-window-maximize"></i>
                {`  ${subribbitDetails.subribbit.numPosts} posts`}
              </div>
              <div class="col-md-6 mt-3" id="subribbitInfoText">
                <i class="fa fa-users"></i>{" "}
                {subribbitDetails.subribbit.numMembers} members
              </div>

              <div class="row pt-3 ps-3" id="subribbitSidebarDescription">
                <div>
                  {subribbitDetails.subribbit.id ? (
                    <ShowSubribbitMembersForMembersButton
                      subribbit={subribbitDetails.subribbit}
                    />
                  ) : null}
                </div>
                <div class="text-light font-weight-bold mb-3">
                  {" "}
                  <i class="fas fa-birthday-cake"></i> &nbsp; Created at: {date}{" "}
                  {month} {year}{" "}
                </div>
                <div class="text-light font-weight-bold mb-3">
                  {" "}
                  <i class="fas fa-user-check"></i> &nbsp;Owner:{" "}
                  {subribbitDetails.subribbit.ownerUsername}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subribbit;
