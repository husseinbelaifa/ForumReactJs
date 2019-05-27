import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../../store/actions/UserActions";
import { postCountUser } from "../../store/actions/PostAction";
import { threadCountUser } from "../../store/actions/ThreadAction";
import moment from "moment";

const ProfileUser = props => {
  useEffect(() => {
    props.fetchUserProfile(props.match.params.userId);
    props.postCountUser(props.match.params.userId);
    props.threadCountUser(props.match.params.userId);
  }, {});

  return (
    <div class="container">
      <div class="flex-grid">{renderProfile(props)}</div>
    </div>
  );
};

const renderProfile = props => {
  return (
    <div class="col-3 push-top">
      <div class="profile-card">
        <p class="text-center">
          <img
            src="https://www.sideshowtoy.com/photo_9030371_thumb.jpg"
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
        : null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: id => dispatch(fetchUserProfile(id)),
    postCountUser: id => dispatch(postCountUser(id)),
    threadCountUser: id => dispatch(threadCountUser(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUser);
