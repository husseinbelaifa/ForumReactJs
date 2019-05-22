import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
const Category = props => {
  return (
    <div>
      <h2 className="list-title">
        <Link to={props.category ? `/categories/${props.category.key}` : ""}>
          {props.category ? props.category.name : ""}
        </Link>
      </h2>{" "}
    </div>
  );
};

export default Category;
