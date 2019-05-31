import React from "react";
import Form from "../layout/Form";
import {
  signUp,
  signOut,
  signInWithGoogle
} from "../../store/actions/AuthActions";
import {
  connect
} from "react-redux";
import {
  Link
} from "react-router-dom";
class Register extends React.Component {
  state = {
    registerFormField: [{
        type: "text",
        name: "name",
        id: "name",
        label: "Full Name"
      },
      {
        type: "text",
        name: "username",
        id: "username",
        label: "Username"
      },
      {
        type: "email",
        name: "email",
        id: "email",
        label: "Email"
      },
      {
        type: "password",
        name: "password",
        id: "password",
        label: "Password"
      },
      {
        type: "file",
        name: "avatar",
        id: "avatar",
        label: "Avatar"
      }
    ],
    formName: "Register"
  };

  registerHandler = formValues => {
    // console.log(formValues);
    // this.props.signOut();

    this.props.signUp(formValues);
    this.props.history.push("/");
    // console.log(this.props);
  };
  registerHandlerWithGoogle = () => {
    console.log("sign in with google");
    this.props.signInWithGoogle();
  };
  render() {
    return ( <
      div className = "container" >
      <
      div className = "flex-grid justify-center" >
      <
      div className = "col-2" >
      <
      Form formName = {
        this.state.formName
      }
      inputs = {
        this.state.registerFormField
      }
      onSubmit = {
        this.registerHandler
      }
      />{" "} <
      div className = "text-center push-top" > {
        /* <button
                        className="btn-red btn-xsmall"
                        onClick={this.registerHandlerWithGoogle}
                      >
                        <i className="fa fa-google fa-btn" />
                        Sign up with Google{" "}
                      </button>{" "} */
      } <
      /div>{" "} < /
      div > {
        " "
      } <
      /div>{" "} < /
      div >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser)),
    signOut: () => dispatch(signOut()),
    signInWithGoogle: () => dispatch(signInWithGoogle())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Register);