import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../../store/actions/UserActions";
import { postCountUser } from "../../store/actions/PostAction";
import { fetchSubCategoriesById } from "../../store/actions/CategoryActions";
import {
  threadCountUser,
  fetchThreadByContributor,
  fetchThreadByUserId
} from "../../store/actions/ThreadAction";
import moment from "moment";
const getQuoteFromText = text => {
  const res = text && text.match(/(\[quote\s*=\s*{\s*(.+)}\s*\])/);

  if (res) {
    const res1 = res[0].match(/{(.+)}/);
    // if (res1) return [JSON.parse(res1[0]), text.split(res[0].trim())[1]];

    if (res1) {
      return (
        <React.Fragment>
          <blockquote class="small">
            <div class="author">
              <a href="/user/robin" class="">
                {" "}
                {JSON.parse(res1[0]).username}{" "}
              </a>{" "}
              <span class="time">
                {" "}
                {moment(JSON.parse(res1[0]).date).fromNow()}{" "}
              </span>{" "}
              <i class="fa fa-caret-down" />
            </div>
            <div class="quote">
              <p> {JSON.parse(res1[0]).text} </p>{" "}
            </div>{" "}
          </blockquote>{" "}
          <p> {text.split(res[0].trim())[1]} </p>{" "}
        </React.Fragment>
      );
    } else return text;
  } else return text;
};

const renderThread = (
  { threads, subCategories, usersThread, posts, postsCount, match },
  seeOnlyThread
) => {
  return (
    threads &&
    Object.keys(threads).map(keyName => {
      return (
        <div class="activity">
          <div class="activity-header">
            <img
              src={
                usersThread &&
                threads[keyName].forumId &&
                usersThread[threads[keyName].key] &&
                usersThread[threads[keyName].key].user.avatar
              }
              alt=""
              class="hide-mobile avatar-small"
            />
            <p class="title">
              {" "}
              {threads[keyName].title}{" "}
              {/* How can I chop onions without crying? */}{" "}
              <span>
                {" "}
                {usersThread &&
                  threads[keyName].forumId &&
                  usersThread[threads[keyName].key] &&
                  usersThread[threads[keyName].key].user.username}{" "}
                started a topic in{" "}
                {subCategories &&
                  threads[keyName].forumId &&
                  subCategories[threads[keyName].forumId] &&
                  subCategories[threads[keyName].forumId].name}{" "}
              </span>{" "}
            </p>{" "}
          </div>
          {posts &&
            threads[keyName].key &&
            posts[threads[keyName].key] &&
            posts[threads[keyName].key].post &&
            Object.keys(posts[threads[keyName].key].post).map(keyName1 => {
              if (
                !posts[threads[keyName].key].post[keyName1] ||
                match.params.userId !==
                  posts[threads[keyName].key].post[keyName1].userId ||
                seeOnlyThread
              )
                return null;
              return (
                <div class="post-content">
                  <div>
                    {" "}
                    {getQuoteFromText(
                      posts[threads[keyName].key].post[keyName1].text
                    )}
                    <hr />
                  </div>{" "}
                </div>
              );
            })}
          <div class="thread-details">
            <span> {moment(threads[keyName].publishedAt).fromNow()} </span>{" "}
            <span>
              {" "}
              {postsCount &&
              threads[keyName].key &&
              postsCount[threads[keyName].key]
                ? postsCount[threads[keyName].key].postCount - 1
                : 0}
              comments{" "}
            </span>{" "}
          </div>{" "}
        </div>
      );
    })
  );
};
const renderUserActivity = (props, state) => {
  const [seeOnlyThread, setSeeOnlyThread] = state;
  console.log(seeOnlyThread);
  const text = !seeOnlyThread ? "See only threads" : "See threads & posts";
  return (
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">
          {" "}
          {props.user && props.user.name}
          's recent activity{" "}
        </span>{" "}
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            setSeeOnlyThread(!seeOnlyThread);
            console.log("clicked");
          }}
        >
          {" "}
          {text}{" "}
        </a>{" "}
      </div>
      <hr />
      <div class="activity-list">
        {" "}
        {renderThread(props, seeOnlyThread)}{" "}
      </div>{" "}
    </div>
  );
};

const renderProfile = props => {
  return (
    <div class="col-3 push-top">
      <div class="profile-card">
        <p class="text-center">
          <img
            src={props.user && props.user.avatar}
            alt=""
            class="avatar-xlarge"
          />
        </p>{" "}
        <h1 class="title"> {props.user && props.user.username} </h1>{" "}
        <p class="text-lead"> {props.user && props.user.name} </p>{" "}
        <p class="text-justify">
          {" "}
          {props.user
            ? props.user.bio
              ? props.user.bio
              : "No bio specified."
            : ""}{" "}
        </p>{" "}
        {/* <span class="online">
                {" "}
                {props.user && props.user.username} is online{" "}
              </span> */}{" "}
        <div class="stats">
          <span>
            {" "}
            {props.postsNumber && props.postsNumber}
            posts{" "}
          </span>{" "}
          <span>
            {" "}
            {props.threadsNumber && props.threadsNumber}
            threads{" "}
          </span>{" "}
        </div>{" "}
        <hr />{" "}
        {/* <p class="text-large text-center">
                    <i class="fa fa-globe" /> <a href="#">batman.com</a>{" "}
                  </p>{" "} */}{" "}
      </div>{" "}
      <p class="text-small text-faded text-center">
        Member since{" "}
        {props.user && moment(props.user.registeredAt).format("MMM YYYY")}, last
        visited 4 hours ago{" "}
      </p>{" "}
      <div class="text-center">
        <hr />
        <a href="edit-profile.html" class="btn-green btn-small">
          Edit Profile{" "}
        </a>{" "}
      </div>{" "}
    </div>
  );
};

const ProfileUser = props => {
  const [seeOnlyThread, setSeeOnlyThread] = useState(false);
  useEffect(() => {
    props.fetchUserProfile(props.match.params.userId);
    props.postCountUser(props.match.params.userId);
    props.threadCountUser(props.match.params.userId);

    props.fetchThreadByContributor(props.match.params.userId);

    props.fetchThreadByUserId(props.match.params.userId);
  }, {});

  return (
    <div class="container">
      <div class="flex-grid">
        {" "}
        {renderProfile(props)}{" "}
        {renderUserActivity(props, [seeOnlyThread, setSeeOnlyThread])}{" "}
      </div>{" "}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user:
      state.user.userProfile &&
      ownProps.match.params.userId &&
      state.user.userProfile[ownProps.match.params.userId]
        ? state.user.userProfile[ownProps.match.params.userId].user
        : null,
    postsNumber:
      state.post.postCountUser &&
      ownProps.match.params.userId &&
      state.post.postCountUser[ownProps.match.params.userId]
        ? state.post.postCountUser[ownProps.match.params.userId].postCount
        : null,

    threadsNumber:
      state.thread.threadCountUser &&
      ownProps.match.params.userId &&
      state.thread.threadCountUser[ownProps.match.params.userId]
        ? state.thread.threadCountUser[ownProps.match.params.userId].threadCount
        : null,

    threads:
      ownProps.match.params && state.thread.threadContributor
        ? state.thread.threadContributor[ownProps.match.params.userId].thread
        : null,
    subCategories: state.categories.subCategories,
    usersThread: state.user.userThread,
    posts: state.post.postsThread,
    postsCount: state.post.postCount
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: id => dispatch(fetchUserProfile(id)),
    postCountUser: id => dispatch(postCountUser(id)),
    threadCountUser: id => dispatch(threadCountUser(id)),
    fetchThreadByContributor: id => dispatch(fetchThreadByContributor(id)),
    fetchThreadByUserId: id => dispatch(fetchThreadByUserId(id)),
    fetchSubCategoriesById: id => dispatch(fetchSubCategoriesById(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUser);
