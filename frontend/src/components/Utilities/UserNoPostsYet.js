import React from "react";
import { GetUsername } from "./GetUsername";

function UserNoPostsYet({ username }) {
  return (
    <div id="userNoPostsYet">
      <center>
        <i class="fas fa-quote-right"></i>
        <br />
        <p>{username} hasn't posted anything</p>
      </center>
    </div>
  );
}

export default UserNoPostsYet;
