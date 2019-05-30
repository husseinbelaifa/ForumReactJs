import React from "react";
import { connect } from "react-redux";
import { fetchThread } from "../../store/actions/ThreadAction";
import { fetchUserThread } from "../../store/actions/UserActions";
import UserInfo from "../User/UserInfo";
import { Link } from "react-router-dom";
import { postCount, fetchPostByThread } from "../../store/actions/PostAction";
import Reactions from "../layout/Reactions";
import PostAction from "../layout/PostAction";
import moment from "moment";
import { checkModerator } from "../../store/actions/UserActions";
import Form from "../layout/Form";
import {
  fetchCategory,
  fetchSubCategoriesById
} from "../../store/actions/CategoryActions";

import NewPost from "./NewPost";

class PostList extends React.Component {
  componentDidMount() {
    //fetch the thread
    this.props.fetchThread(this.props.match.params.threadId);

    //count number of posts

    this.props.postCount(this.props.match.params.threadId);

    //fetch All posts related to thread
    this.props.fetchPostByThread(this.props.match.params.threadId);

    //fetch forum

    this.props.fetchCategory(this.props.match.params.categoryId);

    this.props.fetchSubCategoriesById(this.props.match.params.subCategoryId);

    this.props.match.params.subOfSubCategoryId &&
      this.props.fetchSubCategoriesById(
        this.props.match.params.subOfSubCategoryId
      );

    //if it has attribute parentId fetch subcateogry

    //if it has catgoryId fetch category
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

  renderThreadPostAction() {
    if (
      (this.props.auth &&
        this.props.thread &&
        this.props.auth === this.props.thread.userId) ||
      this.props.moderator
    ) {
      if (this.props.match.params.subOfSubCategoryId) {
        return (
          <React.Fragment>
            <Link
              to={`/threads/${this.props.match.params.categoryId}/${
                this.props.match.params.subCategoryId
              }/${this.props.match.params.threadId}/${
                this.props.match.params.subOfSubCategoryId
              }/edit`}
              class="btn btn-small btn-blue"
            >
              {" "}
              Edit Thread{" "}
            </Link>{" "}
            <Link
              to={`threads/${this.props.match.params.categoryId}/${
                this.props.match.params.subCategoryId
              }/${this.props.match.params.threadId}/${
                this.props.match.params.subOfSubCategoryId
              }/delete`}
              class="btn btn-small btn-red"
            >
              {" "}
              Delete Thread{" "}
            </Link>{" "}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Link
              to={`/threads/${this.props.match.params.categoryId}/${
                this.props.match.params.subCategoryId
              }/${this.props.match.params.threadId}/edit`}
              class="btn btn-small btn-blue"
            >
              {" "}
              Edit Thread{" "}
            </Link>{" "}
            <Link
              to={`threads/${this.props.match.params.categoryId}/${
                this.props.match.params.subCategoryId
              }/${this.props.match.params.threadId}/delete`}
              class="btn btn-small btn-red"
            >
              {" "}
              Delete Thread{" "}
            </Link>{" "}
          </React.Fragment>
        );
      }
    } else return null;
  }
  renderInfoThread() {
    // console.log(this.props.firstPost);
    return (
      <React.Fragment>
        <h1> {this.props.thread && this.props.thread.title} </h1>{" "}
        <div className="action-thread"> {this.renderThreadPostAction()} </div>{" "}
        <p>
          By{" "}
          <Link
            to={this.props.user ? `/profile/${this.props.user.user.key}` : ""}
            class="link-unstyled"
          >
            {" "}
            {this.props.user && this.props.user.user.name}{" "}
          </Link>
          ,{" "}
          {this.props.thread && moment(this.props.thread.publishedAt).fromNow()}{" "}
          <span
            style={{
              float: "right",
              marginTop: "2px"
            }}
            class="hide-mobile text-faded text-small"
          >
            {" "}
            {this.props.postsCount && this.props.postsCount.postCount}
            replies by{" "}
            {this.props.thread &&
              this.props.thread.contributors &&
              Object.keys(this.props.thread.contributors).length}{" "}
            contributors{" "}
          </span>{" "}
        </p>{" "}
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
              />{" "}
              <div class="post-content">
                <div>
                  {" "}
                  {this.renderQuote(this.props.posts.post[keyName].text)}{" "}
                  {/* <p> {this.props.posts.post[keyName].text} </p>{" "} */}{" "}
                </div>{" "}
              </div>{" "}
              <div class="post-date text-faded">
                {" "}
                {moment(
                  this.props.posts.post[keyName].publishedAt
                ).fromNow()}{" "}
              </div>{" "}
              <Reactions postId={this.props.posts.post[keyName].key} />{" "}
              {/* {this.renderIcon(this.props.posts.post[keyName].userId)} */}{" "}
              <PostAction
                postId={this.props.posts.post[keyName].key}
                userId={this.props.posts.post[keyName].userId}
                threadId={this.props.match.params.threadId}
              />{" "}
            </div>{" "}
          </div>
        );
      });

    return posts;
  }
  renderSubOfSubCategory() {
    if (
      this.props.categorie &&
      this.props.subCategorie &&
      this.props.subOfSubCategorie
    ) {
      return (
        <li>
          <Link
            to={
              this.props.categorie &&
              this.props.subCategorie &&
              this.props.subOfSubCategorie
                ? `/categories/${this.props.categorie.key}/${
                    this.props.subCategorie.key
                  }/${this.props.subOfSubCategorie.key}
                `
                : ""
            }
          >
            {" "}
            {this.props.subOfSubCategorie &&
              this.props.subOfSubCategorie.name}{" "}
          </Link>{" "}
        </li>
      );
    }
  }

  getQuoteFromText(text) {
    const res = text && text.match(/(\[quote\s*=\s*{\s*(.+)}\s*\])/);

    // res && console.log(text.split(res[0].trim()));

    if (res) {
      const res1 = res[0].match(/{(.+)}/);
      if (res1) return [JSON.parse(res1[0]), text.split(res[0].trim())[1]];
      else return null;
    } else return null;
  }
  renderQuote(text) {
    const res = text && this.getQuoteFromText(text);

    console.log(res);

    if (!res) return <p> {text} </p>;

    return (
      <React.Fragment>
        <blockquote class="small">
          <div class="author">
            <a href="/user/robin" class="">
              {" "}
              {res[0].username}{" "}
            </a>{" "}
            <span class="time"> {moment(res[0].date).fromNow()} </span>{" "}
            <i class="fa fa-caret-down" />
          </div>{" "}
          <div class="quote">
            <p> {res[0].text} </p>{" "}
          </div>{" "}
        </blockquote>{" "}
        <p> {res[1]} </p>{" "}
      </React.Fragment>
    );
  }
  renderMenu() {
    // const text =
    //   '[quote={"username":"robin","date":1507226534,"text":"Is horseradish and Wasabi the same thing? I\'ve heard so many different things."}]\n\nThey\'re not the same!';
    // // const res = text.match(/\[quote={(.+)}\]/);
    // // const res1 = res[0].match(/{(.+)}/);
    // // console.log("res");
    // // console.log(JSON.parse(res1[0]));
    // this.getQuoteFromText(text);
    return (
      <ul class="breadcrumbs">
        <li>
          <Link to="/">
            <i class="fa fa-home fa-btn" />
            Home{" "}
          </Link>{" "}
        </li>{" "}
        <li>
          <Link
            to={
              this.props.categorie
                ? `/categories/${this.props.categorie.key}`
                : ""
            }
          >
            {" "}
            {this.props.categorie && this.props.categorie.name}{" "}
          </Link>{" "}
        </li>{" "}
        <li>
          {" "}
          <Link
            to={
              this.props.categorie && this.props.subCategorie
                ? `/categories/${this.props.categorie.key}/${
                    this.props.subCategorie.key
                  }`
                : ""
            }
          >
            {" "}
            {this.props.subCategorie && this.props.subCategorie.name}{" "}
          </Link>{" "}
        </li>{" "}
        {this.renderSubOfSubCategory()}{" "}
      </ul>
    );
  }

  render() {
    // console.log(this.posts);
    return (
      <div class="container">
        <div class="col-large push-top">
          {" "}
          {this.renderMenu()} {this.renderInfoThread()} {this.renderPost()}{" "}
          <NewPost
            threadId={this.props.match.params.threadId}
            userId={this.props.auth}
          />{" "}
        </div>{" "}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchThread: threadId => dispatch(fetchThread(threadId)),
    fetchUserThread: (id, threadId) => dispatch(fetchUserThread(id, threadId)),
    postCount: threadId => dispatch(postCount(threadId)),
    fetchPostByThread: threadId => dispatch(fetchPostByThread(threadId)),
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId)),
    fetchSubCategoriesById: id => dispatch(fetchSubCategoriesById(id))
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth.uid ? state.firebase.auth.uid : null,

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
        : null,

    categorie:
      state.categories.categories && ownProps.match.params.categoryId
        ? state.categories.categories[ownProps.match.params.categoryId]
        : null,

    subCategorie:
      state.categories.subCategories && ownProps.match.params.subCategoryId
        ? state.categories.subCategories[ownProps.match.params.subCategoryId]
        : null,
    subOfSubCategorie:
      state.categories.subCategories && ownProps.match.params.subOfSubCategoryId
        ? state.categories.subCategories[
            ownProps.match.params.subOfSubCategoryId
          ]
        : null,
    moderator: state.user.moderator
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
