import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { deletePostAction } from "../../actions/postActions";
import { useNavigate } from "react-router-dom";
import { DELETE_POST_RESET } from "../../actions/types";

function ConfirmDeletePostModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deletePost = useSelector((state) => state.deletePost);
  const { loading, error, message } = deletePost;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(deletePostAction(props.post.id, props.post.subRibbit)); // Pass the subRibbit here
  };


  // Handle redirection based on the message from the action
  useEffect(() => {
    if (message) {
        dispatch({ type: DELETE_POST_RESET });

        if (message === "Post deleted") {
            // Redirect to the specified destination after post deletion
            navigate(props.redirectTo);
        }
    }
  }, [message, navigate, dispatch, props.redirectTo]);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton id="confirmDeleteModalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          Delete post?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete your post? You can't undo this.</p>
      </Modal.Body>
      <Modal.Footer>
        {error && <b><small><div>{error}</div></small></b>}
        <Button onClick={props.onHide} id="confirmDeleteModalButtonCancel">
          Cancel
        </Button>
        {loading ? (
          loading && (
            <Button variant="dark" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          )
        ) : (
          <Button
            onClick={submitHandler}
            id="confirmDeleteModalButtonSubmit"
          >
            Delete post
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeletePostModal;
