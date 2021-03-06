import React from "react";
import "../style.css";
import { connect } from "react-redux";
import { fetchLastPostInSubCategories } from "../../store/actions/PostAction";
import { fetchUserForum } from "../../store/actions/UserActions";
import UserForum from "../User/UserForum";
class LastThread extends React.Component {
  componentDidMount() {
    // console.log(this.props.postId);
    // this.props.postId &&
    this.props.postId &&
      this.props.fetchLastPostInSubCategories(this.props.postId);
    // this.props.fetchCurrentUser(this.props.post.userId, this.props.postId);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.postId !== this.props.postId) {
      nextProps.fetchLastPostInSubCategories(nextProps.postId);
    }

    return nextProps.postId !== this.props.postId;
  }
  render() {
    // console.log(this.props.post);
    return (
      <div class="last-thread">
        <UserForum
          postUser={this.props.post}
          categoryId={this.props.categoryId}
        />{" "}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post.posts ? state.post.posts[ownProps.postId] : ""
  };
};
const mapStateToDispatch = dispatch => {
  return {
    fetchLastPostInSubCategories: postId =>
      dispatch(fetchLastPostInSubCategories(postId)),
    fetchUserForum: id => dispatch(fetchUserForum(id))
  };
};
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(LastThread);
