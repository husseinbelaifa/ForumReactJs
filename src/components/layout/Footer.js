import React from "react";
import "../style.css";
const Footer = () => {
  return ( <
    div className = "forum-stats desktop-only" >
    <
    hr / >
    <
    ul >
    <
    li >
    <
    i className = "fa fa-user-circle-o" / >
    47 users online <
    /li> <
    li >
    <
    i className = "fa fa-user-o" / >
    497 users registered <
    /li> <
    li >
    <
    i className = "fa fa-comments-o" / >
    49 threads <
    /li> <
    li >
    <
    i className = "fa fa-comment-o" / >
    763 posts <
    /li> <
    /ul> <
    /div>
  );
};

export default Footer;