import React from "react";
import { connect } from "react-redux";
import { fetchUserForum } from "../../store/actions/UserActions";

import { Link } from "react-router-dom";
import { fetchThread } from "../../store/actions/ThreadAction";
import {
  fetchSubCategoriesById,
  fetchCategory
} from "../../store/actions/CategoryActions";
import moment from "moment";
class UserForum extends React.Component {
  componentDidMount() {
    // this.props.fetchUserForum(this.props.postUser.userId,
    //   this.props.postUser.key);
    // if (this.props.thread) {
    //   //fetch forum
    //   this.props.fetchSubCategoriesById(this.props.thread.forumId);
    // }
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

    if (nextProps.thread && this.props.thread !== nextProps.thread) {
      //fetch forum
      this.props.fetchSubCategoriesById(nextProps.thread.forumId);
    }

    //fetch category & subcateogry

    if (nextProps.forum && this.props.forum !== nextProps.forum) {
      if (nextProps.forum.parentId)
        nextProps.fetchSubCategoriesById(nextProps.forum.parentId);
      // else nextProps.fetchCategory(nextProps.forum.categoryId);
    }
  }

  render() {
    // this.props.subCategory && console.log(this.props);
    return (
      <React.Fragment>
        {" "}
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
                to={
                  this.props.thread
                    ? this.props.subCategory
                      ? `/thread/${this.props.categoryId}/${
                          this.props.subCategory
                        }/${this.props.forum.key}/${this.props.thread.key}`
                      : `/thread/${this.props.categoryId}/${
                          this.props.forum.key
                        }/${this.props.thread.key}`
                    : ""
                }
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
        )}{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
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
        : null,

    forum:
      state.categories.subCategories &&
      state.thread.threadPost &&
      ownProps.postUser &&
      state.thread.threadPost[ownProps.postUser.threadId]
        ? state.categories.subCategories[
            state.thread.threadPost[ownProps.postUser.threadId].forumId
          ]
        : null,

    subCategory:
      state.categories.subCategories &&
      state.thread.threadPost &&
      ownProps.postUser &&
      state.thread.threadPost[ownProps.postUser.threadId] &&
      state.categories.subCategories[
        state.thread.threadPost[ownProps.postUser.threadId].forumId
      ].parentId
        ? state.categories.subCategories[
            state.thread.threadPost[ownProps.postUser.threadId].forumId
          ]
        : null

    // subCategories: state.categories.subCategories.parentId
    //   ? state.categories.subCategories
    //   : null
  };
};
const mapStateToDispatch = dispatch => {
  return {
    fetchUserForum: (id, postId) => dispatch(fetchUserForum(id, postId)),
    fetchThread: threadId => dispatch(fetchThread(threadId)),
    fetchSubCategoriesById: id => dispatch(fetchSubCategoriesById(id)),
    fetchCategory: id => dispatch(fetchCategory(id))
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(UserForum);
