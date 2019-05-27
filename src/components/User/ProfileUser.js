import React, { useEffect } from "react";
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

const ProfileUser = props => {
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
        {renderProfile(props)}
        {renderUserActivity(props)}
      </div>
    </div>
  );
};

const renderThread = ({ threads, subCategories, usersThread, posts }) => {
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
              {threads[keyName].title}
              {/* How can I chop onions without crying? */}
              <span>
                {usersThread &&
                  threads[keyName].forumId &&
                  usersThread[threads[keyName].key] &&
                  usersThread[threads[keyName].key].user.username}{" "}
                started a topic in
                {subCategories &&
                  threads[keyName].forumId &&
                  subCategories[threads[keyName].forumId] &&
                  subCategories[threads[keyName].forumId].name}
              </span>
            </p>
          </div>
        </div>
      );
    })
  );
};
const renderUserActivity = props => {
  return (
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">
          {props.user && props.user.name}'s recent activity
        </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />

      <div class="activity-list">
        {renderThread(props)}
        {/* <div class="activity-header">
            <img
              src={"https://www.sideshowtoy.com/photo_9030371_thumb.jpg"}
              alt=""
              class="hide-mobile avatar-small"
            />
            <p class="title">
              How can I chop onions without crying?
              <span>Joker started a topic in Cooking</span>
            </p>
          </div> */}

        {/* <div class="post-content">
            <div>
              <p>
                I absolutely love onions, but they hurt my eyes! Is there a way
                where you can chop onions without crying?
              </p>
            </div>
          </div> */}

        {/* <div class="thread-details">
            <span>4 minutes ago</span>
            <span>1 comments</span>
          </div> */}
      </div>
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
        </p>
        <h1 class="title"> {props.user && props.user.username} </h1>
        <p class="text-lead"> {props.user && props.user.name} </p>
        <p class="text-justify">
          {props.user
            ? props.user.bio
              ? props.user.bio
              : "No bio specified."
            : ""}{" "}
        </p>
        <span class="online">
          {" "}
          {props.user && props.user.username} is online{" "}
        </span>
        <div class="stats">
          <span> {props.postsNumber && props.postsNumber} posts </span>{" "}
          <span> {props.threadsNumber && props.threadsNumber} threads </span>{" "}
        </div>
        <hr />
        {/* <p class="text-large text-center">
              <i class="fa fa-globe" /> <a href="#">batman.com</a>{" "}
            </p>{" "} */}
      </div>{" "}
      <p class="text-small text-faded text-center">
        Member since
        {props.user && moment(props.user.registeredAt).format("MMM YYYY")}, last
        visited 4 hours ago{" "}
      </p>
      <div class="text-center">
        <hr />
        <a href="edit-profile.html" class="btn-green btn-small">
          Edit Profile{" "}
        </a>{" "}
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
    posts: state.post.posts
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
