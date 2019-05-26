import React from "react";
import "../style.css";
import { fetchSubCategoriesById } from "../../store/actions/CategoryActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class SubCategory extends React.Component {
  componentDidMount() {
    console.log("i am calling did mount");
    this.props.subsOfSubCategory &&
      this.props.subsOfSubCategory.map(subcategory => {
        console.log("sub of sub category");
        this.props.fetchSubCategoriesById(subcategory);
      });

    if (this.props.subCategoryId) {
      console.log("sub category");
      Object.keys(this.props.allSubCategories).map(keyName => {
        this.props.allSubCategories[keyName].forums &&
          // console.log(this.props.allSubCategories[keyName].forums);
          Object.values(this.props.allSubCategories[keyName].forums).map(
            subofsubcategory => {
              console.log(subofsubcategory);
              this.props.fetchSubCategoriesById(subofsubcategory);
            }
          );
        // Object.values(this.props.allSubCategories[keyName].forums).map(
        //   subofsubcategory => {
        //     this.props.fetchSubCategoriesById(subofsubcategory);
        //   }
        // );
      });
    }

    // console.log(this.props.subsOfSubCategory);

    // this.props.fetchSubCategoriesById(this.props.subCategoryId);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (
      JSON.stringify(this.props.subsOfSubCategory) !==
      JSON.stringify(nextProps.subsOfSubCategory)
    ) {
      console.log("return");
      nextProps.subsOfSubCategory &&
        nextProps.subsOfSubCategory.map(subcategory => {
          nextProps.fetchSubCategoriesById(subcategory);
        });
    }
    // else if (nextProps.subofsubcategory !== this.props.subCategoryId) {
    //   console.log("i have returned");
    //   // Object.keys(nextProps.allSubCategories).map(keyName => {
    //   //   nextProps.allSubCategories[keyName].forums &&
    //   //     Object.values(nextProps.allSubCategories[keyName].forums).map(
    //   //       subofsubcategory => {
    //   //         nextProps.fetchSubCategoriesById(subofsubcategory);
    //   //       }
    //   //     );
    //   // });

    //   // return this.props.subCategoryId;
    // }
  }

  renderSubOfSubCategoryOrNot() {
    // console.log(this.props.allSubCategories);
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
  renderLinkCategorie() {
    if (!this.props.subofsubcategoryboolean)
      return `/threads/${this.props.categoryId}/${this.props.subCategoryId}`;
    else if (this.props.subofsubcategory)
      return `/threads/${this.props.categoryId}/${
        this.props.subofsubcategory.parentId
      }/${this.props.subofsubcategory.key}`;
  }
  render() {
    // console.log(this.props);
    return (
      <div className="forum-details">
        <Link className="text-xlarge" to={this.renderLinkCategorie()}>
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

  // console.log(state);

  return {
    allSubCategories: state.categories.subCategories,
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
