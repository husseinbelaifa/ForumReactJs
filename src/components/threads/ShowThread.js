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
import { Link } from "react-router-dom";
import UserThread from "../User/UserThread";
class ShowThread extends React.Component {
  componentDidMount() {
    this.props.fetchUserThread(this.props.thread.userId, this.props.thread.key);

    this.props.fetchLastPostInSubCategories(this.props.thread.lastPostId);

    this.props.postCount(this.props.thread.key);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.thread !== this.props.thread) {
      console.log("updateing");

      nextProps.fetchUserThread(nextProps.thread.userId, nextProps.thread.key);

      nextProps.fetchLastPostInSubCategories(nextProps.thread.lastPostId);

      nextProps.postCount(nextProps.thread.key);
    }
  }

  renderLinkPost() {
    if (
      this.props.cateogry &&
      this.props.subCategory &&
      this.props.subOfSubCategory
    )
      return `/thread/${this.props.cateogry.key}/${
        this.props.subCategory.key
      }/${this.props.subOfSubCategory.key}/${this.props.thread.key}`;
    else if (
      this.props.cateogry &&
      this.props.subCategory &&
      !this.props.subOfSubCategory
    )
      return `/thread/${this.props.cateogry.key}/${
        this.props.subCategory.key
      }/${this.props.thread.key}`;
  }

  render() {
    // console.log(this.props.cateogry.key);

    return (
      <div class="thread">
        <div>
          <p>
            <Link to={this.renderLinkPost()}>{this.props.thread.title}</Link>
          </p>
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
          <p class="replies-count">
            {" "}
            {this.props.numberOfPost}
            reply{" "}
          </p>{" "}
          <UserThread lastPost={this.props.lastPost} />{" "}
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
