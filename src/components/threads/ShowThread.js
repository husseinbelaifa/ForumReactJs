import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  fetchUserThread,
  fetchUserPost
} from "../../store/actions/UserActions";
import {
  postCount,
  fetchLastPostInSubCategories
} from "../../store/actions/PostAction";
import UserThread from "../User/UserThread";
class ShowThread extends React.Component {
  componentDidMount() {
    this.props.fetchUserThread(this.props.thread.userId, this.props.thread.key);
    //count number of post for each thread

    //fetch last post of thread

    this.props.fetchLastPostInSubCategories(this.props.thread.lastPostId);

    // this.props.fetchUserPost(this.props.thread.lastPostId);

    this.props.postCount(this.props.thread.key);
  }

  render() {
    // this.pros.lastPost && console.log(this.pros.lastPost);

    // if (this.props.lastPost)

    return (
      <div class="thread">
        <div>
          <p>
            <a href="thread.html">{this.props.thread.title}</a>{" "}
          </p>{" "}
          <p class="text-faded text-xsmall">
            By{" "}
            <a href="profile.html">
              {" "}
              {this.props.user && this.props.user.name}{" "}
            </a>
            , {moment(this.props.thread.publishedAt).fromNow()}.{" "}
          </p>{" "}
        </div>{" "}
        <div class="activity">
          <p class="replies-count"> {this.props.numberOfPost} reply </p>{" "}
          <UserThread lastPost={this.props.lastPost} />
        </div>{" "}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  // state.post.postCount &&
  //   ownProps.thread &&
  //   state.post.postCount[ownProps.thread.key] &&
  //   console.log(state.post.postCount[ownProps.thread.key].postCount);

  // ownProps.thread &&
  //   state.post &&
  //   state.post.posts &&
  //   state.post.posts[ownProps.thread.lastPostId] &&
  //   console.log(state.post.posts[ownProps.thread.lastPostId]);
  return {
    user:
      state.user.userThread &&
      ownProps.thread &&
      state.user.userThread[ownProps.thread.key]
        ? state.user.userThread[ownProps.thread.key].user
        : null,

    numberOfPost:
      state.post.postCount &&
      ownProps.thread &&
      state.post.postCount[ownProps.thread.key]
        ? state.post.postCount[ownProps.thread.key].postCount
        : null,

    lastPost:
      ownProps.thread &&
      state.post &&
      state.post.posts &&
      state.post.posts[ownProps.thread.lastPostId]
        ? state.post.posts[ownProps.thread.lastPostId]
        : null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUserThread: (id, threadId) => dispatch(fetchUserThread(id, threadId)),
    fetchLastPostInSubCategories: id =>
      dispatch(fetchLastPostInSubCategories(id)),
    postCount: threadId => dispatch(postCount(threadId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowThread);
