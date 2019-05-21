import React from "react";
import { connect } from "react-redux";
import { fetchUserForum } from "../../store/actions/UserActions";

class UserForum extends React.Component {
  componentDidMount() {
    // this.props.fetchUserForum(this.props.post.userId, this.props.post.key);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.postUser !== this.props.postUser)
    // console.log(nextProps.postUser.userId + " " + nextProps.postUser.key);
    this.props.fetchUserForum(
      nextProps.postUser.userId,
      nextProps.postUser.key
    );
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <img class="avatar" src="" alt="" />
        <div class="last-thread-details">
          <a href="thread.html"> </a>{" "}
          <p class="text-xsmall">
            By <a href="profile.html"> </a>, {this.props.threadTime}{" "}
          </p>{" "}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps.postUser);
  // return {};
  return {
    user:
      typeof ownProps.postUser !== "undefined"
        ? state.user.userForum[ownProps.postUser.key].user
        : null
  };
};
const mapStateToDispatch = dispatch => {
  return {
    fetchUserForum: (id, postId) => dispatch(fetchUserForum(id, postId))
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(UserForum);
