import React from "react";
import { connect } from "react-redux";
import Form from "../layout/Form";
import { fetchThread, updateThread } from "../../store/actions/ThreadAction";
import { fetchLastPostInSubCategories } from "../../store/actions/PostAction";

class EditThread extends React.Component {
  state = {
    threadFormField: [
      {
        type: "text",
        name: "title",
        id: "title",
        label: "Title:"
      },
      {
        type: "textArea",
        name: "content",
        id: "content",
        label: "Content:"
      }
    ],
    formName: "Update Thread"
  };
  componentDidMount() {
    // console.log(this.props.match.params);
    this.props.match.params.threadId &&
      this.props.fetchThread(this.props.match.params.threadId);
    this.props.thread &&
      this.props.fetchLastPostInSubCategories(this.props.thread.firstPostId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.thread && nextProps.thread !== this.props.thread)
      nextProps.fetchLastPostInSubCategories(nextProps.thread.firstPostId);
  }

  EditThreadHandler = formValues => {
    console.log(formValues);
    this.props.updateThread(this.props.match.params.threadId, formValues);
    if (this.props.subOfSubCategoryId)
      this.props.history.push(
        `/thread/${this.props.match.params.categoryId}/${
          this.props.match.params.subCategoryId
        }/${this.props.match.params.subOfSubCategoryId}/${
          this.props.match.params.threadId
        }`
      );
    else
      this.props.history.push(
        `/thread/${this.props.match.params.categoryId}/${
          this.props.match.params.subCategoryId
        }/${this.props.match.params.threadId}`
      );
  };
  render() {
    console.log(this.props.post);
    const initalValues = this.props.thread &&
      this.props.post && {
        title: this.props.thread.title,
        content: this.props.post.text
      };
    // this.props.thread && console.log(initalValues);
    return (
      <div class="container">
        <div class="col-full push-top">
          <h1>Update a thread</h1>{" "}
          <Form
            formName={this.state.formName}
            inputs={this.state.threadFormField}
            // registerLink={this.state.link_to_register}
            onSubmit={this.EditThreadHandler}
            initialValues={initalValues}
          />{" "}
        </div>{" "}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    thread:
      state.thread.threadPost && ownProps.match.params.threadId
        ? state.thread.threadPost[ownProps.match.params.threadId]
        : null,

    post:
      state.thread.threadPost &&
      state.post.posts &&
      ownProps.match.params.threadId &&
      state.thread.threadPost[ownProps.match.params.threadId]
        ? state.post.posts[
            state.thread.threadPost[ownProps.match.params.threadId].firstPostId
          ]
        : null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchThread: id => dispatch(fetchThread(id)),
    fetchLastPostInSubCategories: id =>
      dispatch(fetchLastPostInSubCategories(id)),
    updateThread: (threadId, formValues) =>
      dispatch(updateThread(threadId, formValues))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditThread);
