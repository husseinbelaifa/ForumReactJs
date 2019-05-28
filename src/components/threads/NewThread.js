import React from "react";
import Form from "../layout/Form";
import { addThread } from "../../store/actions/ThreadAction";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../../store/actions/UserActions";
class NewThread extends React.Component {
  componentDidMount() {
    if (this.props.auth) this.props.fetchCurrentUser(this.props.auth);
  }
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
    formName: "Submit Thread"
  };
  NewThreadHandler = formValues => {
    // console.log(formValues);
    // console.log(this.props.match.params);

    if (this.props.user && this.props.user.key) {
      if (this.props.match.params.subOfSubCategoryId) {
        this.props.addThread(
          this.props.match.params.subOfSubCategoryId,
          this.props.user.key,
          formValues
        );
        this.props.history.push(
          `/threads/${this.props.match.params.categoryId}/${
            this.props.match.params.subCategoryId
          }/${this.props.match.params.subOfSubCategoryId}`
        );
      } else if (this.props.match.params.subCategoryId) {
        this.props.addThread(
          this.props.match.params.subCategoryId,
          this.props.user.key,
          formValues
        );
        this.props.history.push(
          `/threads/${this.props.match.params.categoryId}/${
            this.props.match.params.subCategoryId
          }`
        );
      }
    }
  };
  render() {
    return (
      <div class="container">
        <div class="col-full push-top">
          <h1>
            Create new thread in <em> {this.props.category} </em>{" "}
          </h1>{" "}
          <Form
            formName={this.state.formName}
            inputs={this.state.threadFormField}
            // registerLink={this.state.link_to_register}
            onSubmit={this.NewThreadHandler}
          />{" "}
        </div>{" "}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth.uid ? state.firebase.auth.uid : null,
    user: state.user.currentUser ? state.user.currentUser : null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addThread: (forumId, userId, formValues) =>
      dispatch(addThread(forumId, userId, formValues)),
    fetchCurrentUser: id => dispatch(fetchCurrentUser(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewThread);
