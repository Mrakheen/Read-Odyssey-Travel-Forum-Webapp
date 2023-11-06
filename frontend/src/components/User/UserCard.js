import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateMyProfileButton from "../Buttons/UpdateMyProfileButton";
import { GetUsername } from "../Utilities/GetUsername";

function UserCard({ user }) {
  const userDateISO = new Date(user.date_joined);
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
  const date = userDateISO.getDate();
  const year = userDateISO.getFullYear();
  const month = monthList[userDateISO.getMonth()];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  function checkOwner() {
    if (userInfo != null) {
      if (userInfo.id == user.id) {
        return true;
      }
    }
    return false;
  }

  const isOwner = checkOwner();
  // const realUsername = GetUsername(user.username);
  // console.log(realUsername);
  return (
    <Card className="p-3 rounded" id="userCardSize">
      <div class="row" style={{ minHeight: "100px" }}>
        <div class="col-md-1"> </div>
        <div class="col-md-3">
          <img
            src={user.gravatarURL}
            id="userCardProfileImage"
            title="This unique Gravatar RoboHash profile image is made from your email."
            alt=""
          />
        </div>
        <div class="col-md-7 pl-4">
          <strong id="userCardName">{user.username}</strong>
        </div>
        <div class="col-md-1 ">
          {isOwner ? <UpdateMyProfileButton /> : null}
        </div>
      </div>
      <div class="row  ml-3" style={{ color: "white" }}>
        <b>
          <i class="fas fa-birthday-cake"></i>&nbsp; Created at:{" "}
          <small>
            {" "}
            {date} {month} {year}{" "}
          </small>
        </b>
      </div>

      <div class="row pt-2 ml-3" style={{ color: "white" }}>
        <b>
          <i class="fas fa-pen"></i>&nbsp; Posts:
          <small> {user.numPosts}</small>
        </b>
      </div>

      <div class="row pt-2 ml-3 pb-1" style={{ color: "white" }}>
        <b>
          <i class="fas fa-comment"></i>&nbsp; Comments:
          <small> {user.numComments}</small>
        </b>
      </div>
    </Card>
  );
}

export default UserCard;
