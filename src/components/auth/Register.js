import React from "react";

const Register = () => {
  return (
    <div class="container">
      <div class="flex-grid justify-center">
        <div class="col-2">
          <form action="" class="card card-form">
            <h1 class="text-center">Register</h1>

            <div class="form-group">
              <label for="name">Full Name</label>
              <input id="name" type="text" class="form-input" />
            </div>

            <div class="form-group">
              <label for="username">Username</label>
              <input id="username" type="text" class="form-input" />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" class="form-input" />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="password" class="form-input" />
            </div>

            <div class="form-group">
              <label for="avatar">Avatar</label>
              <input id="avatar" type="text" class="form-input" />
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-blue btn-block">
                Register
              </button>
            </div>
          </form>
          <div class="text-center push-top">
            <button class="btn-red btn-xsmall">
              <i class="fa fa-google fa-btn" />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
