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

    !this.props.subcategory &&
      this.props.fetchSubCategoriesById(this.props.subCategoryId);
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
    // console.log(this.props.subCateogry);
    let subs = "";
    if (this.props.subCateogry) {
      subs = (
        <ul class="subforums">
          {" "}
          {this.props.subCateogry.map(subofCateogry => {
            return (
              <li>
                <Link
                  to={
                    subofCateogry
                      ? `/threads/${this.props.categoryId}/${
                          subofCateogry.parentId
                        }/${subofCateogry.key}`
                      : ""
                  }
                >
                  {" "}
                  {subofCateogry ? subofCateogry.name : ""}{" "}
                </Link>{" "}
              </li>
            );
          })}{" "}
        </ul>
      );
    } else {
      subs = (
        <p>
          {" "}
          {this.props.subofsubcategory
            ? this.props.subofsubcategory.description
            : this.props.infosubcategory}{" "}
        </p>
      );
    }

    return subs;
  }

  render() {
    return (
      <div className="forum-details">
        <Link
          className="text-xlarge"
          to={
            !this.props.subofsubcategoryboolean
              ? `/threads/${this.props.categoryId}/${this.props.subCategoryId}`
              : `/threads/${this.props.categoryId}/${
                  this.props.subCategoryId
                }/${this.props.subofsubcategory.key}`
          }
        >
          {" "}
          {this.props.subofsubcategory
            ? this.props.subofsubcategory.name
            : this.props.subcategory}{" "}
        </Link>{" "}
        {this.renderSubOfSubCategoryOrNot()}{" "}
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

  return {
    subCateogry: subOfSubCategory,
    subofsubcategory:
      ownProps.subCategoryId && state.categories.subCategories
        ? state.categories.subCategories[ownProps.subCategoryId]
        : null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSubCategoriesById: id => dispatch(fetchSubCategoriesById(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategory);
