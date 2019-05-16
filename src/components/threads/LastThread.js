import React from "react";
import "../style.css";
const LastThread = props => {
  return (
    <div class="last-thread">
      <img class="avatar" src={props.threadAuthorAvatar} alt="" />
      <div class="last-thread-details">
        <a href="thread.html">{props.threadTitle}</a>
        <p class="text-xsmall">
          By <a href="profile.html">{props.threadAuthor}</a>, {props.threadTime}
        </p>
      </div>
    </div>
  );
};

export default LastThread;
