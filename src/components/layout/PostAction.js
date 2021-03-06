import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchThread } from "../../store/actions/ThreadAction";
import { checkModerator } from "../../store/actions/UserActions";
import { deletePost } from "../../store/actions/PostAction";
const PostAction = props => {
  useEffect(() => {
    //fetch the thread by id
    props.fetchThread(props.threadId);
    props.checkModerator(props.userId);
  }, {});

  if (
    props.auth &&
    props.thread &&
    (props.auth === props.userId || props.moderator) &&
    props.thread.firstPostId !== props.postId
  ) {
    return (
      <div
        style={{
          marginLeft: "auto"
        }}
      >
        {" "}
        {/* <a
                                  href="#"
                                  class="link-unstyled"
                                  title="Make a change"
                                  style={{
                                    marginRight: "10px"
                                  }}
                                >
                                  <i class="fa fa-pencil" />
                                </a>{" "} */}{" "}
        <a
          href="#"
          class="link-unstyled"
          title="Remove a Post"
          onClick={e => removePost(props, e)}
        >
          <i class="fa fa-remove" />
        </a>{" "}
      </div>
    );
  } else return null;
};

const removePost = (ownProps, e) => {
  e.preventDefault();
  // console.log(ownProps);
  // console.log(e);
  ownProps.deletePost(ownProps.postId, ownProps.userId, ownProps.threadId);
};

const mapDispatchToProps = dispatch => {
  return {
    fetchThread: id => dispatch(fetchThread(id)),
    checkModerator: id => dispatch(checkModerator(id)),
    deletePost: (postId, userId, threadId) =>
      dispatch(deletePost(postId, userId, threadId))
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth.uid ? state.firebase.auth.uid : null,
    thread:
      state.thread.threadPost && ownProps.threadId
        ? state.thread.threadPost[ownProps.threadId]
        : null,

    moderator: state.user.moderator
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostAction);
