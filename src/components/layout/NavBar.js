import React from "react";
import "../style.css";
const NavBar = () => {
  return (
    <header className="header" id="header">
      <a href="index.html" className="logo">
        <img src="assets/img/svg/vueschool-logo.svg" />
      </a>

      <div className="btn-hamburger">
        <div className="top bar" />
        <div className="middle bar" />
        <div className="bottom bar" />
      </div>

      <nav className="navbar">
        <ul>
          <li className="navbar-user">
            <a href="#">
              <img
                className="avatar-small"
                src="https://pbs.twimg.com/profile_images/881260299420041217/GMVGlDea_400x400.jpg"
                alt=""
              />
              <span>
                Alex Kyriakidis
                <img
                  className="icon-profile"
                  src="/assets/img/svg/arrow-profile.svg"
                  alt=""
                />
              </span>
            </a>

            <div id="user-dropdown">
              <div className="triangle-drop" />
              <ul className="dropdown-menu">
                <li className="dropdown-menu-item">
                  <a href="profile.html">View profile</a>
                </li>
                <li className="dropdown-menu-item">
                  <a href="#">Log out</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <ul>
          <li className="navbar-item">
            <a href="index.html">Home</a>
          </li>
          <li className="navbar-item">
            <a href="category.html">Category</a>
          </li>
          <li className="navbar-item">
            <a href="forum.html">Forum</a>
          </li>
          <li className="navbar-item">
            <a href="thread.html">Thread</a>
          </li>

          <li className="navbar-item mobile-only">
            <a href="profile.html">My Profile</a>
          </li>
          <li className="navbar-item mobile-only">
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
