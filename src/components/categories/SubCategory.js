import React from "react";
import "../style.css";
import { fetchSubCategoriesById } from "../../store/actions/CategoryActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class SubCategory extends React.Component {
  componentDidMount() {
    this.props.subsOfSubCategory &&
      this.props.subsOfSubCategory.map(subcategory => {
        this.props.fetchSubCategoriesById(subcategory);
      });
  }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.subsOfSubCategory) {
  //     nextProps.subsOfSubCategory.map(subcategory => {
  //       nextProps.fetchSubCategoriesById(subcategory);

  //       return true;
  //     });
  //   }

  //   return false;
  // }

  renderSubOfSubCategoryOrNot() {
    let subs = "";
    if (this.props.subCateogry) {
      subs = (
        <ul class="subforums">
          {this.props.subCateogry.map(subofCateogry => {
            return (
              <li>
                <Link to=""> {subofCateogry ? subofCateogry.name : ""} </Link>
              </li>
            );
          })}
        </ul>
      );
    } else {
      subs = <p> {this.props.infosubcategory}</p>;
    }

    return subs;
  }

  render() {
    return (
      <div className="forum-details">
        <a className="text-xlarge" href="forum.html">
          {" "}
          {this.props.subcategory}
        </a>{" "}
        {this.renderSubOfSubCategoryOrNot()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const subOfSubCategory =
    ownProps.subsOfSubCategory &&
    ownProps.subsOfSubCategory.map(subcategory => {
      // console.log(state.categories.subCategories[subcategory]);
      return state.categories.subCategories[subcategory];
    });

  return { subCateogry: subOfSubCategory };
};
const mapDispatchToProps = dispatch => {
  return { fetchSubCategoriesById: id => dispatch(fetchSubCategoriesById(id)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategory);
