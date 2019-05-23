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
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login" exact component={Login} />{" "}
          <Route path="/register" exact component={Register} />{" "}
          <Route path="/" exact component={ForumList} />{" "}
          <Route path="/categories/:id" exact component={CategoryList} />{" "}
          <Route
            path="/threads/:categoryId/:subCategoryId"
            exact
            component={ThreadList}
          />
          <Route
            path="/threads/:categoryId/:subCategoryId/:subOfSubCategoryId"
            exact
            component={ThreadList}
          />
        </Switch>{" "}
      </BrowserRouter>{" "}
      <Footer />
    </div>
  );
};

export default App;
