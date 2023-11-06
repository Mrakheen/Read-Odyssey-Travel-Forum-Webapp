import React from "react";

function CommunityNoPostsYet({ sub }) {
  function isCommunity() {
    if (sub !== undefined) return true;
    return false;
  }

  return (
    <div id="communityNoPostsYet">
      <i class="fas fa-quote-right"></i>
      <br />
      {isCommunity() ? (
        <b>{sub} doesn't have any posts yet</b>
      ) : (
        <b>No posts yet</b>
      )}
      <br />
      <small>Start creating posts!</small>
    </div>
  );
}

export default CommunityNoPostsYet;
