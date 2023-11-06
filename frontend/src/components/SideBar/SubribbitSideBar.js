import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestJoinSubribbitAction } from "../../actions/subribbitActions";
import ShowSubribbitMembersButton from "../Buttons/ShowSubribbitMembersButton";
import { subribbitMembersAction } from "../../actions/subribbitActions";
import UpdateSubribbitButton from "../Buttons/UpdateSubribbitButton";
import ShowSubribbitMembersForMembersButton from "../Buttons/ShowSubribbitMembersForMembersButton";

function SubribbitSideBar({ user, sub }) {
  const dispatch = useDispatch();

  const subribbitDateISO = new Date(sub.subribbit.createdAt);
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

  function checkSubribbitPrivate() {
    if (sub.subribbit.typeName === "PRIVATE") return true;
    return false;
  }

  function checkOwner() {
    if (user != null) {
      if (sub.subribbit.ownerId == user.id) {
        return true;
      }
    }
    return false;
  }

  // get userLogin from state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  function isUserAffiliated() {
    if (sub.subribbit.currentUserStatus === "NOT JOINED") return false;
    return true;
  }

  function isMember() {
    if (sub.subribbit.currentUserStatus === "ACCEPTED") return true;
    return false;
  }

  const requestJoinSubribbitButton = (e) => {
    e.preventDefault();
    console.log("asda");
    dispatch(requestJoinSubribbitAction(sub.subribbit.id));
  };

  return (
    <Card className="p-4 rounded" id="subribbitSideBarSize">
      <div class="row d-flex pb-3">
        <strong class="pb-2 h2 font-weight-bold">{sub.subribbit.name}</strong>
        <p class="">{sub.subribbit.description}</p>
      </div>

      {userInfo ? (
        checkOwner() ? (
          <div class="row pt-2">
            <div class="col-md-6">
              <ShowSubribbitMembersButton subribbit={sub.subribbit} />
            </div>
            <div class="col-md-6">
              <UpdateSubribbitButton subribbit={sub.subribbit} />
            </div>
          </div>
        ) : isUserAffiliated() ? (
          isMember() ? (
            <div class="row pt-4">
              <button
                type="button"
                disabled
                class="btn btn-success btn-sm btn-block"
              >
                {" "}
                JOINED{" "}
              </button>
            </div>
          ) : (
            <div class="row pt-4">
              <button
                type="button"
                disabled
                class="btn btn-warning btn-sm btn-block"
              >
                {" "}
                {sub.subribbit.currentUserStatus}{" "}
              </button>
            </div>
          )
        ) : checkSubribbitPrivate() ? (
          <div class="row pt-4">
            <button
              type="button"
              class="btn btn-primary btn-sm btn-block"
              onClick={requestJoinSubribbitButton}
            >
              {" "}
              Request Join{" "}
            </button>
          </div>
        ) : (
          <div class="row pt-4">
            <button
              type="button"
              class="btn btn-primary btn-sm btn-block"
              onClick={requestJoinSubribbitButton}
            >
              {" "}
              Join{" "}
            </button>
          </div>
        )
      ) : (
        <div class="row pt-4">
          {/* <Link to="/login">
            <button type="button" class="btn btn-primary btn-sm btn-block">
              {" "}
              Login{" "}
            </button>
          </Link> */}
        </div>
      )}
    </Card>
  );
}

export default SubribbitSideBar;
