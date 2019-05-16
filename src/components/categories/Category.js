import React from "react";
import "../style.css";
const Category = props => {
  return (
    <div>
      <h2 className="list-title">
        <a href="category.html">{props.category}</a>
      </h2>
    </div>
  );
};

export default Category;
