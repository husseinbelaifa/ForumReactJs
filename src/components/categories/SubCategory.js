import React from "react";
import "../style.css";
import { fetchSubCategoriesById } from "../../store/actions/CategoryActions";
import { connect } from "react-redux";
class SubCategory extends React.Component {
  // let subs = "";
  // if (props.subsOfSubCategory) {
  //   subs = (
  //     <ul class="subforums">
  //       <li>
  //         <a href="#">{props.subsOfSubCategory}</a>
  //       </li>
  //     </ul>
  //   );
  // } else {
  //   subs = <p> {props.infosubcategory}</p>;
  // }

  render() {
    console.log(this.props.subsOfSubCategory);
    return (
      <div className="forum-details">
        <a className="text-xlarge" href="forum.html">
          {" "}
          {this.props.subcategory}
        </a>{" "}
        {/* {subs} */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { fetchSubCategoriesById: id => dispatch(fetchSubCategoriesById(id)) };
};

export default connect(
  null,
  mapDispatchToProps
)(SubCategory);
