import React from "react";
import Form from "../layout/Form";
import { createPost } from "../../store/actions/PostAction";
import { connect } from "react-redux";
class NewPost extends React.Component {
  state = {
    postFormField: [
      {
        type: "textArea",
        name: "postArea",
        id: "postArea",
        label: ""
      }
    ],
    formName: "Submit Post"
  };
  NewPostHandler = formValues => {
    console.log(formValues);
    this.props.createPost(this.props.threadId, this.props.userId, formValues);
  };
  render() {
    if (!this.props.auth) return null;
    return (
      <React.Fragment>
        <Form
          formName={this.state.formName}
          inputs={this.state.postFormField}
          onSubmit={this.NewPostHandler}
        />{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth.uid ? state.firebase.auth.uid : null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createPost: (threadId, userId, formValues) =>
      dispatch(createPost(threadId, userId, formValues))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
