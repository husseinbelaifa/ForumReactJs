import React from "react";

const Login = () => {
  return (
    <div class="container">
      <div class="flex-grid justify-center">
        <div class="col-2">
          <form action="" class="card card-form">
            <h1 class="text-center">Login</h1>

            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="password" class="form-input" />
            </div>

            <div class="push-top">
              <button type="submit" class="btn-blue btn-block">
                Log in
              </button>
            </div>

            <div class="form-actions text-right">
              <a href="register.html">Create an account?</a>
            </div>
          </form>

          <div class="push-top text-center">
            <button class="btn-red btn-xsmall">
              <i class="fa fa-google fa-btn" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
