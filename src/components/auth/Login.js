import React from "react";
import Form from "../layout/Form";
import {
  signIn,
  signInWithGoogle
} from "../../store/actions/AuthActions";
import {
  connect
} from "react-redux";
class Login extends React.Component {
  state = {
    loginFormField: [{
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
      }
    ],
    formName: "Login",
    link_to_register: "/register"
  };
  loginHandler = formValues => {
    console.log(this.props);

    this.props.signIn(formValues);
    this.props.history.push("/");
  };

  signInWithGoogle = () => {
    this.props.signInWithGoogle();
  };

  render() {
    return ( <
      div class = "container" >
      <
      div class = "flex-grid justify-center" >
      <
      div class = "col-2" >
      <
      Form formName = {
        this.state.formName
      }
      inputs = {
        this.state.loginFormField
      }
      registerLink = {
        this.state.link_to_register
      }
      onSubmit = {
        this.loginHandler
      }
      />{" "} <
      div class = "push-top text-center" > {
        /* <button
                        class="btn-red btn-xsmall"
                        onClick={this.signInWithGoogle}
                      >
                        <i class="fa fa-google fa-btn" />
                        Sign in with Google{" "}
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
    signIn: User => dispatch(signIn(User)),
    signInWithGoogle: () => dispatch(signInWithGoogle())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);