import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPostDetails } from "../../actions/postActions";
import Loader from "../Utilities/Loader";
import Message from "../Utilities/Message";
import UserNavbar from "../Navbar/UserNavbar";
import { Card, Form, Row, Col, Button, FloatingLabe, Image } from "react-bootstrap";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import {
  createCommentAction,
  getAllCommentAction,
} from "../../actions/commentActions";
import Comment from "../Comments/Comment";
import { CREATE_COMMENT_RESET } from "../../actions/types";
import PostCardDropDown from "../Buttons/PostCardDropDown";
import SuccessToast from "../Toasts/SuccessToast";
import { DELETE_COMMENT_RESET } from "../../actions/types";
import VotePostButton from "../Buttons/VotePostButton";
import PostSideBar from "../SideBar/PostSideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostDetailsDropDown from "../Buttons/PostDetailsDropDown";
import GeneralGetErrorPage from "../Utilities/GeneralGetErrorPage";
import image1 from "../../image/1.png";
import { GetUsername } from "../Utilities/GetUsername";


function PostDetail() {
  
  function renderImage(image) {
    if (image && image !== "/media/null") {
      // Check if the image is a video (you can update this check as needed)
      const isVideo = image.endsWith('.mp4'); // You may need a more robust check
  
      if (isVideo) {
        return (
          <video
            controls
            className="post-video"
            style={{
              width: "100%",
              maxHeight: "100%",
              display: "block",
              margin: "0 auto"
            }}
          >
            <source src={`http://127.0.0.1:8001${image}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      } else {
        // Render an image
        return (
          <Image
            src={`http://127.0.0.1:8001${image}`}
            className="post-image"
            style={{
              width: "100%",
              maxHeight: "100%",
              display: "block",
              margin: "0 auto"
            }}
          />
        );
      }
    } else {
      return null;
    }
  }
  

  const [editPostOn, setEditPostOn] = useState(false);

  const dispatch = useDispatch();

  const match = useParams();
  const sub = " ";

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [text, setText] = useState("");

  const createComment = useSelector((state) => state.createComment);
  const { loadingCreateComment, errorCreateComment, messageCreateComment } =
    createComment;

  const votePost = useSelector((state) => state.votePost);
  const {
    loading: loadingVotePost,
    error: errorVotePost,
    message: messageVotePost,
  } = votePost;

  const allComments = useSelector((state) => state.allComments);
  const { errorAllComments, loadingAllComments, comments } = allComments;

  const deleteComment = useSelector((state) => state.deleteComment);
  const {
    error: errorDeleteComment,
    loading: loadingDeleteComment,
    message: messageDeleteComment,
  } = deleteComment;

  const updatePost = useSelector((state) => state.updatePost);
  const {
    error: errorUpdatePost,
    loading: loadingUpdatePost,
    message: messageUpdatePost,
  } = updatePost;

  const placeholder = userInfo
    ? `${userInfo.username}, share your opinion here`
    : null;

  const [messageDeletePost, setMessageDeletePost] = useState(null);


  useEffect(() => {
    if (post) {
      dispatch(listPostDetails(match.id));
    }
  }, [messageUpdatePost, messageVotePost, messageCreateComment, votePost, match.id, post]);
    
  
  useEffect(() => {
    if (messageCreateComment) {
      setText("");

      document.getElementById("submitCommentForm").reset();
      dispatch({ type: CREATE_COMMENT_RESET });
    }

    dispatch(getAllCommentAction(match.id));

    // here the hook i'm puting messageDeleteComment so that it reloads the get all comment when comment is deleted, also when it is created
  }, [dispatch, match, messageCreateComment, messageDeleteComment]);

  useEffect(() => {
    if (errorCreateComment) {
      notifyCommentError();
      dispatch({ type: CREATE_COMMENT_RESET });
    }
    if (messageCreateComment) {
      notifyCommentSuccess();
      dispatch({ type: CREATE_COMMENT_RESET });
    }
    if (messageDeleteComment) {
      notifyDeleteCommentSuccess();
      dispatch({ type: DELETE_COMMENT_RESET });
    }
  }, [errorCreateComment, messageCreateComment, messageDeleteComment]);

  function notifyCommentError() {
    toast(errorCreateComment);
  }

  function notifyCommentSuccess() {
    toast(messageCreateComment);
  }

  function notifyDeleteCommentSuccess() {
    toast(messageDeleteComment);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCommentAction(text, match.id));
    dispatch(listPostDetails(match.id));
  };

  function checkOwner() {
    if (userInfo != null) {
      if (userInfo.username == post.userName) {
        return true;
      }
    }
    return false;
  }

  function checkSubLink() {
    if (post.subRibbit === "home") {
      return "/home";
    }
    return `/community/${post.subRibbit}`;
  }

  function checkIsNsfwShouldHide() {
    if (post.nsfw === "y" && !userInfo) {
      return true;
    }
    return false;
  }

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
      <ToastContainer />
      {error || errorAllComments ? (
        <GeneralGetErrorPage />
      ) : (
        <div class="row">
          <div class="col-md-3" style={{ width: "29.16%" }}>
            {" "}
          </div>
          <div class="col-md-5 p-0">
            <div class="">
              <div class="card p-3" id="postDetailCard">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message color="danger">{error}</Message>
                ) : (
                  <div class="row">
                    <div id="postHeader">
                      <div class="row">
                        <div class="col-md-11">
                          <small>
                            <strong>
                              <Link
                                to={checkSubLink()}
                                id="postDetailSubRibbit"
                              >
                                {post.subRibbit}
                              </Link>
                            </strong>
                          </small>
                          &nbsp;&nbsp;
                          <small>
                            ~ Posted by&nbsp;
                            <Link
                              to={`/user/${post.userName}`}
                              id="postDetailUsername"
                            >
                              {post.userName}
                            </Link>
                            &nbsp;
                            {post.humanTimeDiffCreatedAt} ago
                          </small>
                        </div>
                        <div class="col-md-1">
                          <PostDetailsDropDown post={post} sub=" " />
                        </div>
                      </div>
                    </div>

                    <div className="pinpoint">
                      <span
                        role="img"
                        aria-label="location pin"
                        onClick={() => {
                          if (post.locationTagLink) {
                            window.open(post.locationTagLink, '_blank');
                          }
                        }}
                        style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}
                      > 📍  
                        <u><i><strong>  {post.locationName}</strong></i></u>
                      </span>
                    </div>

                    <Card.Body>
                      <div class="row">
                        <div class="col-md-1">
                          <center>
                            <VotePostButton post={post} />
                          </center>
                        </div>

                        <div class="col-md-11">
                          <Card.Title as="h3">
                            <strong>{post.title}</strong>
                          </Card.Title>

                          <Card.Text>
                            {checkIsNsfwShouldHide() ? (
                              <span className="badge badge-secondary">
                                Login to see NSFW post
                              </span>
                            ) : (
                              <div>
                                {post.content !== "{}" ? (
                                  <div>{post.content}</div>
                                ) : null}
                                 {renderImage(post.image)}
                              </div>
                            )}
                          </Card.Text>

                        </div>
                      </div>
                    </Card.Body>
                  </div>
                )}

                  <div class="row mt-2" align="center" id="postStats">
                    <div class="col-md-4">
                      <i class="far fa-comment-alt"></i>&nbsp;&nbsp;
                      <strong style={{ fontSize: '13px' }}>{post.numComments} comments</strong>
                    </div>
                    <div class="col-md-4">
                      <i class="far fa-clipboard"></i>&nbsp;&nbsp;
                      <strong style={{ fontSize: '13px' }}>{post.votesReceived} vote(s)</strong>
                    </div>
                  </div>
                </div>

                <div class="card p-3" id="postDetailCard">
                  {userInfo ? (
                    <div>
                      <Form onSubmit={submitHandler} id="submitCommentForm">
                        <Form.Group className="my-2" controlId="text">
                          <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            type="text"
                            placeholder={placeholder}
                            onChange={(e) => setText(e.target.value)}
                          />
                        </Form.Group>
                        <div class="pt-1" align="right">
                          <div class="row">
                            <div align="right">
                              <Button
                                type="submit"
                                className="btn btn-primary btn-sm"
                              >
                                Comment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  ) : (
                    <div class="row">
                      <div class="col-md-8 p-2" align="left">
                        &nbsp;&nbsp;&nbsp;&nbsp;Login or sign up before posting
                        comments
                      </div>
                      <div class="col-md-2 p-1" align="right">
                        <Link to="/login">
                          <button type="button" class="btn btn-primary btn-sm">
                            Log In
                          </button>
                        </Link>
                      </div>
                      <div class="col-md-2 p-1" align="left">
                        <Link to="/register">
                          <button type="button" class="btn btn-success btn-sm">
                            Sign Up
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                {loadingAllComments ? (
                  <Loader />
                ) : errorAllComments ? (
                  <Message color="danger">{error}</Message>
                ) : comments.length === 0 ? (
                  <div class="card" id="noCommentsYet" align="center">
                    <i class="fas fa-comments"></i> <b>No comments yet</b>
                    <small>Be the first to share what you think!</small>
                  </div>
                ) : (
                  <div class="card px-3" id="allComments">
                    {comments.map((comment) => (
                      <Row>
                        <Comment
                          comment={comment}
                          user={userLogin}
                          post={post}
                        />
                      </Row>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
