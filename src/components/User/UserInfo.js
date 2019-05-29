import React from "react";
import { connect } from "react-redux";
import { fetchUserPost } from "../../store/actions/UserActions";
import { postCountUser } from "../../store/actions/PostAction";
import { Link } from "react-router-dom";
import { threadCountUser } from "../../store/actions/ThreadAction";
class UserInfo extends React.Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchUserPost(this.props.userId, this.props.postId);
    this.props.postCountUser(this.props.userId);
    this.props.threadCountUser(this.props.userId);
  }
  render() {
    return (
      <div class="user-info">
        <Link
          to={this.props.userId ? `/profile/${this.props.userId}` : ""}
          class="user-name"
        >
          {this.props.user && this.props.user.user && this.props.user.user.name}{" "}
        </Link>{" "}
        <Link to={this.props.userId ? `/profile/${this.props.userId}` : ""}>
          <img
            class="avatar-large"
            src={
              this.props.user &&
              this.props.user.user &&
              this.props.user.user.avatar
            }
            alt=""
          />
        </Link>{" "}
        <p class="desktop-only text-small">
          {" "}
          {this.props.numberOfPosts && this.props.numberOfPosts.postCount}
          posts{" "}
        </p>{" "}
        <p class="desktop-only text-small">
          {" "}
          {this.props.numberOfThreads &&
            this.props.numberOfThreads.threadCount}{" "}
          threads{" "}
        </p>{" "}
        {/* <span class="online desktop-only"> online </span> */}{" "}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user:
      state.user.userPost && ownProps.postId
        ? state.user.userPost[ownProps.postId]
        : null,

    numberOfPosts:
      state.post.postCountUser && ownProps.userId
        ? state.post.postCountUser[ownProps.userId]
        : null,
    numberOfThreads:
      state.thread.threadCountUser && ownProps.userId
        ? state.thread.threadCountUser[ownProps.userId]
        : null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserPost: (id, postId) => dispatch(fetchUserPost(id, postId)),
    postCountUser: userId => dispatch(postCountUser(userId)),
    threadCountUser: userId => dispatch(threadCountUser(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
