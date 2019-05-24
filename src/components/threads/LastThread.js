import React from "react";
import "../style.css";
import { connect } from "react-redux";
import { fetchLastPostInSubCategories } from "../../store/actions/PostAction";
import { fetchUserForum } from "../../store/actions/UserActions";
import UserForum from "../User/UserForum";
class LastThread extends React.Component {
  componentDidMount() {
    // console.log(this.props.postId);
    this.props.fetchLastPostInSubCategories(this.props.postId);
    // this.props.fetchCurrentUser(this.props.post.userId, this.props.postId);
  }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.postId !== this.props.postId) {
  //     nextProps.fetchLastPostInSubCategories(nextProps.postId);
  //   }

  //   if (nextProps.postId !== this.props.postId) console.log(nextProps.post);
  //   return nextProps.postId !== this.props.postId;
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postId !== this.props.postId) {
      nextProps.fetchLastPostInSubCategories(nextProps.postId);
    }

    if (nextProps.postId !== this.props.postId) console.log(nextProps.post);
    return nextProps.postId !== this.props.postId;
  }
  render() {
    console.log(this.props.post);
    return (
      <div class="last-thread">
        <UserForum postUser={this.props.post} />{" "}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post ? state.post[ownProps.postId] : ""
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
