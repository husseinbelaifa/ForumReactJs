import React from "react";
import "../style.css";
const ThreadCount = props => {
  return (
    <div class="threads-count">
      <p>
        <span class="count">{props.threadCount}</span> thread
      </p>
    </div>
  );
};

export default ThreadCount;
