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
import cardArt from "../../image/cardArtBackground.jpg";
import logoSmall from "../../image/greenFrog.png";
import { listSubribbits } from "../../actions/subribbitActions";
import Post from "../Posts/Post";
import Loader from "../Utilities/Loader";
import Message from "../Utilities/Message";
import UserNavbar from "../Navbar/UserNavbar";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import HomeSideBar from "../SideBar/HomeSideBar";
import SuccessToast from "../Toasts/SuccessToast";
import { DELETE_POST_RESET } from "../../actions/types";
import SubribbitCard from "./SubribbitCard";
import SubribbitListSideBar from "../SideBar/SubribbitListSideBar";
import CommunityNoSubribbitsYet from "../Utilities/CommunityNoSubribbitsYet";
import GeneralGetErrorPage from "../Utilities/GeneralGetErrorPage";

function SubribbitList() {
  const match = useParams();
  const dispatch = useDispatch();
  const subribbitList = useSelector((state) => state.subribbitList);
  const { error, loading, subribbits } = subribbitList;

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (userInfo) dispatch(listSubribbits(search));
  }, [search]);

  // get userLogin from state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  function checkSubribbitEmpty() {
    if (subribbits.length < 1 && search === "") return true;
    return false;
  }

  return (
    <div class="col-md-10 offset-md-1">
      {userInfo ? (
        <div>
          {!loading && error ? (
            <GeneralGetErrorPage />
          ) : (
            <div class="row">
              <div class="row m-0 p-0 my-3">
                <div
                  class="card border-0 my-2 p-0"
                  id="searchTitle"
                  align="left"
                >
                  <Form.Control
                    required
                    type="search"
                    placeholder="Search subredyssey"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div class="row">
                <center>
                  {search !== "" ? (
                    <div>
                      <small style={{ color: "white", marginBottom: "2px" }}>
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
                <div style={{ padding: "0" }}>
                  {checkSubribbitEmpty() ? (
                    <CommunityNoSubribbitsYet />
                  ) : (
                    <div>
                      {subribbits.map((subribbit) => (
                        <Row>
                          <SubribbitCard subribbit={subribbit} />
                        </Row>
                      ))}
                    </div>
                  )}
                  <Link to="/createSubribbit">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm btn-block my-3"
                      style={{ minHeight: "20px" }}
                    >
                      Create Subredyssey
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div class="text-light" align="center">
          {/* <div class="row pt-5"></div> */}
          <div class="row pt-4">
            <h3>
              <i class="fas fa-exclamation-triangle"></i>
            </h3>
          </div>
          <div class="row pt-2">
            <b>Authentication Required</b>
            <br /> <br />
            <small>You need to be logged in to access this section </small>
          </div>

          <div class="pt-4 mb-3">
            <Link to="/login">
              <button class="btn btn-primary btn-block">Log in</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubribbitList;
