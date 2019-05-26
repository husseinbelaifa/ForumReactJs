import React, { useEffect } from "react";
import { postThumpUp, postThumpDown } from "../../store/actions/PostAction";
import { connect } from "react-redux";
const Reactions = props => {
  useEffect(() => {
    props.postThumpUp(props.postId, false);
    props.postThumpDown(props.postId, false);

    console.log("thump up");
  }, {});
  console.log(props);
  return (
    <div class="reactions">
      <button
        class="btn-xsmall"
        onClick={() => props.postThumpUp(props.postId, true)}
      >
        <span class="emoji">👍</span>️{" "}
        {props.thumpUpCounter && props.thumpUpCounter.thumpUp}
      </button>
      <button
        class="btn-xsmall"
        onClick={() => props.postThumpDown(props.postId, true)}
      >
        <span class="emoji">👎</span>️{" "}
        {props.thumpDownCounter && props.thumpDownCounter.thumpDOWN}
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    thumpUpCounter:
      state.post.postsThumpUp && ownProps.postId
        ? state.post.postsThumpUp[ownProps.postId]
        : 0,

    thumpDownCounter:
      state.post.postsThumpDown && ownProps.postId
        ? state.post.postsThumpDown[ownProps.postId]
        : 0
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postThumpUp: (postId, clicked) => dispatch(postThumpUp(postId, clicked)),
    postThumpDown: (postId, clicked) => dispatch(postThumpDown(postId, clicked))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reactions);
