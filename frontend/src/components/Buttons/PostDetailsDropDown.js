import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDeletePostModal from "../Modals/ConfirmDeletePostModal";
import ReportPostModal from "../Modals/ReportPostModal"; // Import the ReportPostModal component
import UpdatePostModal from "../Modals/UpdatePostModal";

function PostDetailsDropDown({ post, sub }) {
  const dispatch = useDispatch();

  // get userLogin from state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  function checkOwner() {
    if (userInfo != null) {
      if (userInfo.username === post.userName) {
        return true;
      }
    }
    return false;
  }

  const [modalShow, setModalShow] = useState(false);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false); // State for the ReportPostModal

  return (
    <>
      {checkOwner() ? (
        <div class="btn-group" id="postCardDropDown">
          <i
            class="fas fa-ellipsis-h"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></i>
          <div class="dropdown-menu">
            <a class="dropdown-item" onClick={() => setModalShowUpdate(true)}>
              Edit post
            </a>
            <a class="dropdown-item" onClick={() => setModalShow(true)}>
              Delete
            </a>
            <a
              class="dropdown-item"
              onClick={() => setReportModalShow(true)} // Open the ReportPostModal
            >
              Report Post
            </a>
          </div>
          <UpdatePostModal
            sub={sub}
            show={modalShowUpdate}
            post={post}
            onHide={() => setModalShowUpdate(false)}
          />
          <ConfirmDeletePostModal
            sub={sub}
            show={modalShow}
            redirectTo="/home"
            post={post}
            onHide={() => setModalShow(false)}
          />
          <ReportPostModal
            show={reportModalShow}
            onHide={() => setReportModalShow(false)}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default PostDetailsDropDown;
