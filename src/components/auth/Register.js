import React from "react";
import Form from "../layout/Form";
class Register extends React.Component {
  state = {
    registerFormField: [
      { type: "text", name: "name", id: "name", label: "Full Name" },
      { type: "text", name: "username", id: "username", label: "Username" },
      { type: "email", name: "email", id: "email", label: "Email" },
      {
        type: "password",
        name: "password",
        id: "password",
        label: "Password"
      },
      { type: "text", name: "avatar", id: "avatar", label: "Avatar" }
    ],
    formName: "Register"
  };

  render() {
    return (
      <div className="container">
        <div className="flex-grid justify-center">
          <div className="col-2">
            <Form
              formName={this.state.formName}
              inputs={this.state.registerFormField}
            />
            <div className="text-center push-top">
              <button className="btn-red btn-xsmall">
                <i className="fa fa-google fa-btn" />
                Sign up with Google{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Register;
