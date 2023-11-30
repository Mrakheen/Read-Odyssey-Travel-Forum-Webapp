import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import logoSmall from "../../image/greenFrog.png";
import { Link, useNavigate, Redirect } from "react-router-dom";
import Loader from "../Utilities/Loader";
import Message from "../Utilities/Message";
import { createPostAction } from "../../actions/postActions";
import store from "../../store";
import UserNavbar from "../Navbar/UserNavbar";
import { listOwnedAndJoinedSubribbits } from "../../actions/subribbitActions";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CREATE_POST_RESET } from "../../actions/types";
import GeneralGetErrorPage from "../Utilities/GeneralGetErrorPage";
import image1 from "../../image/1.png";

function CreatePost() {
  const parameterSearch = useLocation().search;
  const subribbitParameter = new URLSearchParams(parameterSearch).get(
    "subribbit"
  );

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [subribbitName, setSubribbitName] = useState("");
  const [content, setContent] = useState("");
  const [nsfw, setNsfw] = useState("n");
  const [image, setImage] = useState(null); // Add state for image

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  function notifyError() {
    toast(error);
  }

  function notifySuccess() {
    toast(post);
  }

  const ownedAndJoinedSubribbitList = useSelector(
    (state) => state.ownedAndJoinedSubribbitList
  );
  const {
    error: errorOwnedAndJoinedSubribbits,
    loading: loadingOwnedAndJoinedSubribbits,
    ownedAndJoinedSubribbits,
  } = ownedAndJoinedSubribbitList;

  useEffect(() => {
    if (subribbitParameter === null) {
      setSubribbitName("home");
    } else {
      setSubribbitName(subribbitParameter);
    }
    dispatch(listOwnedAndJoinedSubribbits());
  }, [errorOwnedAndJoinedSubribbits]);

  const createPost = useSelector((state) => state.createPost);
  const { error, loading, post } = createPost;

  useEffect(() => {
    if (error) {
      notifyError();
      dispatch({ type: CREATE_POST_RESET });
    }
    if (post) {
      notifySuccess();
      dispatch({ type: CREATE_POST_RESET });
    }
  }, [error, post]);

  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    setImageFile(file);
  }; 

  const [enteredLocation, setEnteredLocation] = useState(""); // State to store manually entered location

  const openGoogleMaps = () => {    
    let googleMapsURL = `https://www.google.com/maps`;
    // Open Google Maps in a new tab/window
    window.open(googleMapsURL, '_blank');
  };

  const [locationName,setEnteredlocationName] = useState("");

  const handleManualLocationChange = (e) => {
    const enteredValue = e.target.value.trim(); // Remove leading/trailing spaces
    setEnteredlocationName(enteredValue);
    const formattedValue = enteredValue.split(' ').join('+'); // Replace spaces with '+'
  
    let locationURL = 'https://www.google.com/maps/place/';
  
    if (formattedValue !== '') {
      locationURL += formattedValue;
    }
    setEnteredLocation(locationURL);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("nsfw", nsfw);
    formData.append("image", imageFile); // Check the variable name "imageFile"
    // Add the image to the formData
    formData.append("subribbit", subribbitName);
    formData.append("locationTagLink",enteredLocation);
    formData.append("locationName",locationName);
  
    // Double-check the POST Request Header
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
        "Content-Type": "multipart/form-data", // Ensure the correct Content-Type header
      },
    };
  
    dispatch(createPostAction(formData, config));
  };

  return (
    <div>
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
          {userInfo ? (
            <div className="row pt-3">
              <div className="col-md-3" style={{ width: "29.16%" }}>
                {" "}
              </div>
              <div className="col-md-5 py-3" id="createPostForm">
                <h4 className="text-light py-3 px-3 font-weight-bold">
                  Create Post
                </h4>
                <ToastContainer />
                <Form onSubmit={submitHandler} encType="multipart/form-data">
                  <div className="row">
                    {loadingOwnedAndJoinedSubribbits ? (
                      <Loader />
                    ) : errorOwnedAndJoinedSubribbits ? (
                      <Message color="danger">
                        {errorOwnedAndJoinedSubribbits}
                      </Message>
                    ) : (
                      <div>
                        <div class="card p-3" id="postDetailCard">
                          <Form.Control
                            as="select"
                            aria-label="Default select example"
                            onChange={(e) => setSubribbitName(e.target.value)}
                            value={subribbitParameter}
                          >
                            <option value="home">home</option>
                            {ownedAndJoinedSubribbits.map((subribbit) => (
                              <option value={subribbit.name}>
                                {subribbit.name}
                              </option>
                            ))}
                          </Form.Control>
                          <div id="defaultCommunityIsHome">
                            The default community is home.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div class="row">
                    <div>
                    <div className="card p-3" id="writePost">
                      <Form.Group className="mb-3" controlId="title" method="post" enctype="multipart/form-data">
                        <Form.Control
                          required
                          type="text"
                          placeholder="TITLE (required)"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                      <p style={{ color: 'white' }}><u>Location URL: {enteredLocation}</u></p>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name of location as in google maps"
                          //value={enteredLocation}
                          onChange={handleManualLocationChange}
                        />
                        
                        {/* Button to select from Google Maps */}
                        <Button onClick={openGoogleMaps}>Find From Google Maps</Button>
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="content" method="post" enctype="multipart/form-data">
                        <Form.Control
                          as="textarea"
                          rows={4}
                          type="text"
                          placeholder="text..... (optional)"
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </Form.Group>

                      {/* Add image input field */}
                      <Form.Group className="mb-3" controlId="image" method="post" enctype="multipart/form-data">
                        <label htmlFor="image"  style={{ color: 'white' }}>Choose an image or video (optional)</label>
                        <Form.Control
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleImageChange}
                        />
                      </Form.Group>
                        {/* <Form.Check
                          type="switch"
                          id="custom-switch"
                          label="NSFW"
                          onChange={handleChangeNsfw}
                        /> */}

                        <div class="pt-4" align="right">
                          <div class="text-muted">
                            <div class="row">
                              <div class="col-md-9" align="center">
                                {post && (
                                  <b>
                                    <small>
                                      <div>Post Created</div>
                                    </small>
                                  </b>
                                )}
                              </div>
                              <div class="col-md-3">
                                {loading ? (
                                  <button
                                    type="submit"
                                    disabled
                                    class="btn btn-dark btn-sm"
                                  >
                                    <Loader size="10px" />
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    class="btn btn-primary btn-sm"
                                  >
                                    Post
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
              <div className="col-md-5 px-5 pt-2"></div>
            </div>
          ) : (
            <div>
              <div class="row pt-5" align="center">
                <div class="row pt-5"></div>
                <div class="row pt-5">
                  <h3>
                    <i class="fas fa-exclamation-triangle"></i>
                  </h3>
                </div>
                <div class="row pt-2">
                  <b>Authentication Required</b>
                  <br />
                  <small>
                    You need to be logged in to access this page{" "}
                    <i class="far fa-smile"></i>
                  </small>
                </div>

                <div class="row pt-5">
                  <div class="col-md-4 offset-md-4">
                    <Link to="/login">
                      <button class="btn btn-dark btn-block">LOGIN</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default CreatePost;



