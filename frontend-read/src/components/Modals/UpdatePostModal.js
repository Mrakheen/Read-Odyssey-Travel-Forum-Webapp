import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { updatePostAction } from "../../actions/postActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_POST_RESET } from "../../actions/types";

function UpdatePostModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatePost = useSelector((state) => state.updatePost);
  const { loading, message } = updatePost;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [title, setTitle] = useState(props.post.title);
  const [content, setContent] = useState(props.post.content);
  const [nsfw, setNsfw] = useState(props.post.nsfw);

  const [isTitleCalled, setIsTitleCalled] = useState(false);
  const [isContentCalled, setIsContentCalled] = useState(false);
  const [isNsfwCalled, setIsNsfwCalled] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    setImageFile(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    // Create a new FormData object here
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("nsfw", nsfw);
    formData.append("image", imageFile); // Check the variable name "imageFile"
  
    // Double-check the POST Request Header
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
        "Content-Type": "multipart/form-data", // Ensure the correct Content-Type header
      },
    };
  
    // Call the updatePostAction with separate arguments
    dispatch(updatePostAction(props.post.id, title, content, nsfw, imageFile, config));
  };
  
  
  if (message) {
    navigate(`/post/${props.post.id}`);
    props.onHide();
    dispatch({ type: UPDATE_POST_RESET });
  }

  const callSetTitle = (value) => {
    setTitle(value);
    setIsTitleCalled(true);
  };

  const callSetContent = (value) => {
    setContent(value);
    setIsContentCalled(true);
  };

  const callSetNsfw = (value) => {
    setNsfw(value);
    setIsNsfwCalled(true);
  };

  const handleChangeNsfw = (event) => {
    if (event.target.checked) {
      callSetNsfw("y");
    } else {
      callSetNsfw("n");
    }
  };

  const getDefaultNsfwChecked = () => {
    return props.post.nsfw === "y";
  };


  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton id="confirmDeleteModalHeader">
        <Modal.Title id="contained-modal-title-vcenter">Update post</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              required
              type="title"
              defaultValue={props.post.title}
              onChange={(e) => callSetTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="content">
            <Form.Control
              as="textarea"
              rows={4}
              type="content"
              defaultValue={props.post.content}
              onChange={(e) => callSetContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="NSFW"
            onChange={handleChangeNsfw}
            defaultChecked={getDefaultNsfwChecked()}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} id="confirmDeleteModalButtonCancel">
            Cancel
          </Button>
          {loading ? (
            loading && (
              <Button variant="dark" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              </Button>
            )
          ) : (
            <Button onClick={submitHandler} id="confirmDeleteModalButtonSubmit">
              Update
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdatePostModal;
