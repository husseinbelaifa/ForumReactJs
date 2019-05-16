import React from "react";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import ForumList from "./forum/ForumList";
import NewThread from "./threads/NewThread";
import CategoryList from "./categories/CategoryList";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ThreadList from "./threads/ThreadList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ForumList} />
          <Route path="/categories" exact component={CategoryList} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>{" "}
      </BrowserRouter>{" "}
      <Footer />
    </div>
  );
};

export default App;
