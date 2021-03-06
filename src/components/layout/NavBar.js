import React from "react";
import "../style.css";
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import { signOut } from "../../store/actions/AuthActions";
import { fetchCurrentUser } from "../../store/actions/UserActions";
class NavBar extends React.Component {
  state = {
    showMenu: false,
    classname: ""
  };

  componentDidMount() {
    if (this.props.auth) {
      this.props.fetchCurrentUser(this.props.auth);
    }
  }

  showDropMenu = event => {
    // console.log("clicked");
    this.setState({
      showMenu: !this.state.showMenu
    });
    if (this.state.showMenu)
      this.setState({
        classname: "active-drop"
      });
    else
      this.setState({
        classname: ""
      });
  };

  signOutHandler = event => {
    // event.preventDefault();
    console.log("i am signout");
    console.log(this.props);

    // this.props.history.push("/");
  };

  renderLoginNavMobile() {
    if (this.props.auth) {
      return (
        <React.Fragment>
          <li className="navbar-item mobile-only">
            <NavLink
              to={
                this.props.currentUser
                  ? `/profile/${this.props.currentUser.key}`
                  : ""
              }
            >
              {" "}
              My Profile{" "}
            </NavLink>{" "}
          </li>{" "}
          <li className="navbar-item mobile-only">
            <NavLink to="/" onClick={this.signOutHandler}>
              Logout{" "}
            </NavLink>{" "}
          </li>{" "}
        </React.Fragment>
      );
    }
  }

  renderLoginNav() {
    if (this.props.auth) {
      return (
        <ul>
          <li
            className="navbar-user"
            onMouseLeave={() => {
              this.setState({
                showMenu: false
              });
              this.setState({
                classname: ""
              });
            }}
            onClick={this.showDropMenu}
          >
            <a href="#">
              <img
                className="avatar-small"
                src={
                  this.props.currentUser ? this.props.currentUser.avatar : null
                }
                alt=""
              />
              <span>
                {" "}
                {this.props.currentUser
                  ? this.props.currentUser.name
                  : null}{" "}
                <img
                  class="icon-profile"
                  src="assets/img/svg/arrow-profile.svg"
                  alt=""
                />
              </span>{" "}
            </a>{" "}
            <div id="user-dropdown" className={this.state.classname}>
              <div className="triangle-drop" />
              <ul className="dropdown-menu">
                <li className="dropdown-menu-item">
                  <Link to={`/profile/${this.props.auth}`}> View profile </Link>{" "}
                </li>{" "}
                <li className="dropdown-menu-item">
                  <Link onClick={this.signOutHandler}> Log out </Link>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
          </li>{" "}
        </ul>
      );
    } else {
      return (
        <ul>
          <li class="navbar-item">
            <NavLink to="/register"> Register </NavLink>{" "}
          </li>{" "}
          <li class="navbar-item">
            <NavLink to="/login"> Login </NavLink>{" "}
          </li>{" "}
        </ul>
      );
    }
  }

  render() {
    return (
      <header className="header" id="header">
        <NavLink className="logo" to="/">
          <img src="/assets/img/svg/vueschool-logo.svg" />
        </NavLink>{" "}
        <div className="btn-hamburger">
          <div className="top bar" />
          <div className="middle bar" />
          <div className="bottom bar" />
        </div>{" "}
        <nav className="navbar">
          {" "}
          {this.renderLoginNav()}{" "}
          <ul>
            <li className="navbar-item">
              <NavLink to="/"> Home </NavLink>{" "}
            </li>{" "}
            {this.renderLoginNavMobile()}{" "}
          </ul>{" "}
        </nav>{" "}
      </header>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth.uid ? state.firebase.auth.uid : null,
    currentUser: state.user.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    fetchCurrentUser: id => dispatch(fetchCurrentUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
