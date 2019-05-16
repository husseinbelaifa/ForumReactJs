import React from "react";
import "../style.css";
const SubCategory = props => {
  let subs = "";
  if (props.subsOfSubCategory) {
    subs = (
      <ul class="subforums">
        <li>
          <a href="#">{props.subsOfSubCategory}</a>
        </li>
      </ul>
    );
  } else {
    subs = <p> {props.infosubcategory}</p>;
  }

  return (
    <div className="forum-details">
      <a className="text-xlarge" href="forum.html">
        {" "}
        {props.subcategory}
      </a>{" "}
      {subs}
    </div>
  );
};

export default SubCategory;
