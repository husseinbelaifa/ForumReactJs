import React from "react";
import Form from "../layout/Form";
class Login extends React.Component {
  state = {
    loginFormField: [
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
      }
    ],
    formName: "Login",
    link_to_register: "/register"
  };
  loginHandler(formValues) {
    console.log(formValues);
  }
  render() {
    return (
      <div class="container">
        <div class="flex-grid justify-center">
          <div class="col-2">
            <Form
              formName={this.state.formName}
              inputs={this.state.loginFormField}
              registerLink={this.state.link_to_register}
              onSubmit={this.loginHandler}
            />{" "}
            <div class="push-top text-center">
              <button class="btn-red btn-xsmall">
                <i class="fa fa-google fa-btn" />
                Sign in with Google{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Login;
