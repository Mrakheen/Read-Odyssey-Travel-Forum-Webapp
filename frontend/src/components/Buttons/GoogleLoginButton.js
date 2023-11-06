/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { googleSignin } from "../../actions/userActions";

const GoogleLoginButton = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleCredentialResponse = (response) => {
    var t = jwt_decode(response.credential);
    console.log(t);
    dispatch(googleSignin(t.given_name, t.email, t.sub, t.picture));
    document.getElementById("buttonDiv").hidden = true;
  };

  const handleSignOut = () => {
    setUser({});
    document.getElementById("buttonDiv").hidden = false;
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "464238124164-tdea6kfiem0gpuasgestrdtdij6k8p4l.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  return (
    <div>
      <div class="my-2" align="right" id="buttonDiv"></div>
      {/* {user && (
        <div>
          <img src={user.picture} alt="" />
          <h3>{user.name}</h3>
        </div>
      )} */}

      {/* {Object.keys(user).length != 0 && (
        <button id="buttonSignOut" onClick={handleSignOut}>
          {"Sign out"}
        </button>
      )} */}
    </div>
  );
};

export default GoogleLoginButton;
