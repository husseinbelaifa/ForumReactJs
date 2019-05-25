import React from "react";
import { connect } from "react-redux";
import { fetchThread } from "../../store/actions/ThreadAction";
import { fetchUserThread } from "../../store/actions/UserActions";
import UserInfo from "../User/UserInfo";
import { Link } from "react-router-dom";
import { postCount, fetchPostByThread } from "../../store/actions/PostAction";
import moment from "moment";
class PostList extends React.Component {
  componentDidMount() {
    //fetch the thread
    this.props.fetchThread(this.props.match.params.threadId);

    //count number of posts

    this.props.postCount(this.props.match.params.threadId);

    //fetch All posts related to thread
    this.props.fetchPostByThread(this.props.match.params.threadId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.thread !== this.props.thread) {
      nextProps.fetchUserThread(
        nextProps.thread.userId,
        nextProps.match.params.threadId
      );
    }

    // if (nextProps.posts !== this.props.posts) {
    //   nextProps.posts &&
    //     nextProps.posts.post &&
    //     Object.keys(nextProps.posts.post).map(keyName => {
    //       return nextProps.fetchUserPost(
    //         nextProps.posts.post[keyName].userId,
    //         nextProps.posts.post[keyName].key
    //       );
    //     });
    // }
  }

  renderInfoThread() {
    // console.log(this.props.firstPost);
    return (
      <React.Fragment>
        <h1>{this.props.thread && this.props.thread.title}</h1>

        <p>
          By{" "}
          <Link
            to={this.props.user ? `/profile/${this.props.user.user.key}` : ""}
            class="link-unstyled"
          >
            {this.props.user && this.props.user.user.name}
          </Link>
          ,{" "}
          {this.props.thread && moment(this.props.thread.publishedAt).fromNow()}
          <span
            style={{ float: "right", marginTop: "2px" }}
            class="hide-mobile text-faded text-small"
          >
            {this.props.postsCount && this.props.postsCount.postCount} replies
            by{" "}
            {this.props.thread &&
              this.props.thread.contributors &&
              Object.keys(this.props.thread.contributors).length}{" "}
            contributors
          </span>
        </p>
      </React.Fragment>
    );
  }

  renderPost() {
    const posts =
      this.props.posts &&
      this.props.posts.post &&
      Object.keys(this.props.posts.post).map(keyName => {
        return (
          <div class="post-list">
            <div class="post">
              <UserInfo
                userId={this.props.posts.post[keyName].userId}
                postId={this.props.posts.post[keyName].key}
              />

              <div class="post-content">
                <div>
                  <p>
                    {this.props.posts.post[keyName].text}
                    {/* Is horseradish and Wasabi the same thing? I've heard so many
                    different things.
                    <br />
                    <br />I want to know once and for all. */}
                  </p>
                </div>
                <a
                  href="#"
                  style={{ marginLeft: "auto" }}
                  class="link-unstyled"
                  title="Make a change"
                >
                  <i class="fa fa-pencil" />
                </a>
              </div>

              <div class="post-date text-faded">6 hours ago</div>
            </div>
          </div>
        );
      });

    return posts;
  }

  render() {
    // console.log(this.posts);
    return (
      <div class="container">
        <div class="col-large push-top">
          <ul class="breadcrumbs">
            <li>
              <a href="#">
                <i class="fa fa-home fa-btn" />
                Home
              </a>
            </li>
            <li>
              <a href="category.html">Discussions</a>
            </li>
            <li class="active">
              <a href="#">Cooking</a>
            </li>
          </ul>
          {this.renderInfoThread()}
          {this.renderPost()}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchThread: threadId => dispatch(fetchThread(threadId)),
    fetchUserThread: (id, threadId) => dispatch(fetchUserThread(id, threadId)),
    postCount: threadId => dispatch(postCount(threadId)),
    fetchPostByThread: threadId => dispatch(fetchPostByThread(threadId))
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    thread:
      state.thread.threadPost && ownProps.match.params
        ? state.thread.threadPost[ownProps.match.params.threadId]
        : null,

    user:
      state.user.userThread && ownProps.match.params
        ? state.user.userThread[ownProps.match.params.threadId]
        : null,

    postsCount:
      state.post.postCount && ownProps.match.params
        ? state.post.postCount[ownProps.match.params.threadId]
        : null,

    posts:
      state.post.postsThread && ownProps.match.params
        ? state.post.postsThread[ownProps.match.params.threadId]
        : null
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
