import React, { useEffect } from "react";
import "../style.css";
import { postsCount } from "../../store/actions/PostAction";
import { threadsCount } from "../../store/actions/ThreadAction";
import { countUser } from "../../store/actions/UserActions";
import { connect } from "react-redux";
const Footer = props => {
  useEffect(() => {
    props.postsCount();

    props.threadsCount();

    props.countUser();
  }, {});
  return (
    <div className="forum-stats desktop-only">
      <hr />
      <ul>
        <li>
          <i className="fa fa-user-o" />
          {props.numberOfUser} users registered{" "}
        </li>{" "}
        <li>
          <i className="fa fa-comments-o" />
          {props.numberOfThread} threads{" "}
        </li>{" "}
        <li>
          <i className="fa fa-comment-o" />
          {props.numberOfPost} posts{" "}
        </li>{" "}
      </ul>{" "}
    </div>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    postsCount: () => dispatch(postsCount()),
    threadsCount: () => dispatch(threadsCount()),
    countUser: () => dispatch(countUser())
  };
};
const mapStateToProps = state => {
  return {
    numberOfPost: state.post.postsCount,
    numberOfThread: state.thread.threadCount,
    numberOfUser: state.user.userCount
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
