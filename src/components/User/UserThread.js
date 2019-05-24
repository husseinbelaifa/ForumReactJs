import React from "react";
import moment from "moment";
import { fetchUserPost } from "../../store/actions/UserActions";
import { connect } from "react-redux";
class UserThread extends React.Component {
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.postId !== this.props.postId) {
  //   }
  // }

  // componentDidMount() {
  //  this.props.lastPost && this.props.fetchUserPost(
  //     this.props.lastPost.userId,
  //     this.props.lastPost.key
  //   );
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastPost && nextProps.lastPost !== this.props.lastPost)
      nextProps.fetchUserPost(
        nextProps.lastPost.userId,
        nextProps.lastPost.key
      );

    return nextProps.lastPost && nextProps.lastPost !== this.props.lastPost;
  }
  render() {
    // this.props.lastUserPost &&
    //  console.log(this.props.lastUserPostthis.props.lastUserPost.avatar);
    return (
      <React.Fragment>
        <img
          class="avatar-medium"
          src={this.props.lastUserPost && this.props.lastUserPost.user.avatar}
          alt=""
        />
        <div>
          <p class="text-xsmall">
            <a href="profile.html">
              {" "}
              {this.props.lastUserPost &&
                this.props.lastUserPost.user.name}{" "}
            </a>{" "}
          </p>{" "}
          <p class="text-xsmall text-faded">
            {" "}
            {this.props.lastPost &&
              moment(this.props.lastPost.publishedAt).fromNow()}{" "}
          </p>{" "}
        </div>{" "}
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUserPost: (id, postId) => dispatch(fetchUserPost(id, postId))
  };
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  return {
    lastUserPost:
      state.user.userPost && ownProps.lastPost
        ? state.user.userPost[ownProps.lastPost.key]
        : null
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserThread);
