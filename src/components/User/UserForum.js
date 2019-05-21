import React from "react";
import { connect } from "react-redux";
import { fetchUserForum } from "../../store/actions/UserActions";

import { Link } from "react-router-dom";
import { fetchThread } from "../../store/actions/ThreadAction";
import moment from "moment";
class UserForum extends React.Component {
  componentDidMount() {
    // this.props.fetchUserForum(this.props.postUser.userId,
    //   this.props.postUser.key);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.postUser !== this.props.postUser &&
      nextProps.postUser &&
      nextProps.postUser.userId &&
      nextProps.postUser.key
    ) {
      this.props.fetchUserForum(
        nextProps.postUser.userId,
        nextProps.postUser.key
      );

      this.props.fetchThread(nextProps.postUser.threadId);
    }
  }

  render() {
    // if (
    //   this.props.postUser &&
    //   this.props.users &&
    //   this.props.users[this.props.postUser.key]
    // )

    return (
      <React.Fragment>
        {this.props.user ? (
          <React.Fragment>
            {" "}
            <img
              class="avatar"
              src={this.props.user ? this.props.user.avatar : ""}
              alt=""
            />
            <div class="last-thread-details">
              <Link
                to={this.props.thread ? `/thread/${this.props.thread.key}` : ""}
              >
                {" "}
                {this.props.thread ? this.props.thread.title : ""}{" "}
              </Link>{" "}
              <p class="text-xsmall">
                By{" "}
                <Link
                  to={this.props.user ? `/profile/${this.props.user.key}` : ""}
                >
                  {" "}
                  {this.props.user ? this.props.user.name : ""}{" "}
                </Link>
                ,{" "}
                {this.props.thread
                  ? moment(this.props.thread.publishedAt).fromNow()
                  : ""}{" "}
              </p>{" "}
            </div>{" "}
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state.user["userForum"]);
  // typeof ownProps["postUser"] !== "undefined"
  //   ? console.log(state.user.userForum[ownProps.postUser.key])
  //   : console.log("undefined huss");
  return {
    user:
      state.user.userForum &&
      ownProps.postUser &&
      state.user.userForum[ownProps.postUser.key]
        ? state.user.userForum[ownProps.postUser.key].user
        : null,

    thread:
      state.thread.threadPost && ownProps.postUser
        ? state.thread.threadPost[ownProps.postUser.threadId]
        : null
  };
  // return {
  //   user:
  //     typeof ownProps["postUser"] !== "undefined" !== "undefined"
  //       ? state.user.userForum[ownProps.postUser.key].user
  //       : null
  // };
};
const mapStateToDispatch = dispatch => {
  return {
    fetchUserForum: (id, postId) => dispatch(fetchUserForum(id, postId)),
    fetchThread: threadId => dispatch(fetchThread(threadId))
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(UserForum);
