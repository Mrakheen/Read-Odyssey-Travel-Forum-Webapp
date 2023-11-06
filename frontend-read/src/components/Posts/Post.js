import React, { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostCardDropDown from "../Buttons/PostCardDropDown";
import VotePostButton from "../Buttons/VotePostButton";
import { useDispatch, useSelector } from "react-redux";
import { GetUsername } from "../Utilities/GetUsername";

function Post({ post, sub }) {
  function checkSubLink() {
    if (post.subRibbit === "home") {
      return "/home";
    }
    return `/community/${post.subRibbit}`;
  }

  function checkIsNsfw() {
    if (post.nsfw === "y") {
      return true;
    }
    return false;
  }

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
  
  // const realUsername = GetUsername(post.userName);
  // console.log(realUsername);

  return (
    <Card className="rounded" id="postCardMain">
      <div className="row">
        <div className="col-md-1" id="postCardLeft">
          <VotePostButton post={post} />
        </div>
        <div className="col-md-10">
          <Link to={`/post/${post.id}`} id="postCardLink">
            <Card className="my-1 rounded border-0" id="postCardSize">
              <div className="row">
                <div id="postCardHeader">
                  <small>
                    <Link to={checkSubLink()} id="postCardSubRibbit">
                      <strong>{post.subRibbit}</strong>
                    </Link>
                    &nbsp;&nbsp;~ Posted by&nbsp;
                    <Link to={`/user/${post.userName}`} id="postCardUsername">
                      {post.userName}
                    </Link>
                    &nbsp;{post.humanTimeDiffCreatedAt} ago
                  </small>
                </div>
              </div>
              <div className="row">
                <Card.Body>
                  <div className="row">
                    <Link to={`/post/${post.id}`} id="postCardBody">
                      <Card.Title as="h3">
                        <strong>{post.title}</strong>
                      </Card.Title>
                      <Card.Text>
                        <div id="postCardContent">
                          {checkIsNsfw() ? (
                            <span className="badge badge-secondary">NSFW</span>
                          ) : (
                            <div>
                              {post.content !== "{}" ? (
                                <div>{post.content}</div>
                              ) : null}
                              {renderImage(post.image)}
                            </div>
                          )}
                        </div>
                      </Card.Text>
                    </Link>
                  </div>
                </Card.Body>
              </div>
              <div className="row pt-2">
                <div className="row">
                  <div id="postCardFooter">
                    <div className="row">
                      <div className="col-md-4">
                        <i className="far fa-comment-alt"></i>&nbsp;&nbsp;
                        <strong style={{ fontSize: '13px' }}>{post.numOfComments} comments</strong>
                      </div>
                      <div className="col-md-4">
                        <i className="far fa-clipboard"></i>&nbsp;&nbsp;
                        <strong style={{ fontSize: '13px' }}>{post.votesReceived} vote(s)</strong>
                              </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        <div className="col-md-1">
          <div className="row pt-2">
            <PostCardDropDown post={post} sub={sub} />
          </div>
          <div className="row" id="postCardBottomRight">
            <Link to={`/post/${post.id}`}></Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Post;
