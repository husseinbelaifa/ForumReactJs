import React from "react";
import Pagination from "../layout/Pagination";
import {
  fetchCategory,
  fetchSubCategoriesById
} from "../../store/actions/CategoryActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SubCategory from "../categories/SubCategory";
import ThreadCount from "../threads/ThreadCount";
import LastThread from "../threads/LastThread";
class ThreadList extends React.Component {
  state = { indexSubOfSubCategories: 0 };
  componentDidMount() {
    //fetch Category

    // console.log(this.props.match.params);
    this.props.fetchCategory(this.props.match.params.categoryId);
    this.props.fetchSubCategoriesById(this.props.match.params.subCategoryId);

    if (this.props.match.params.subOfSubCategoryId) {
      this.props.fetchSubCategoriesById(
        this.props.match.params.subOfSubCategoryId
      );
    } else {
      //fetch all subofsubscategories

      this.props.subCategory &&
        this.props.subCategory.forums &&
        Object.values(this.props.subCategory.forums).map(subCategoryId => {
          this.props.fetchSubCategoriesById(subCategoryId);
        });
    }

    //fetch all subs of subscategories
  }

  renderSubOfSubCategory() {
    if (this.props.match.params.subOfSubCategoryId) {
      return (
        <React.Fragment>
          <li>
            <Link
              to={
                this.props.subCategory
                  ? `/threads/${this.props.category.key}/${
                      this.props.subCategory.key
                    }`
                  : ""
              }
            >
              {this.props.subCategory ? this.props.subCategory.name : ""}{" "}
            </Link>{" "}
          </li>
          <li class="active">
            <Link
              to={
                this.props.subOfSubCategory
                  ? `/threads/${this.props.category.key}/${
                      this.props.subCategory.key
                    }/${this.props.subOfSubCategory.key}`
                  : ""
              }
            >
              {this.props.subOfSubCategory
                ? this.props.subOfSubCategory.name
                : ""}{" "}
            </Link>{" "}
          </li>{" "}
        </React.Fragment>
      );
    } else {
      return (
        <li class="active">
          <Link
            to={
              this.props.subCategory
                ? `/threads/${this.props.category.key}/${
                    this.props.subCategory.key
                  }`
                : ""
            }
          >
            {this.props.subCategory ? this.props.subCategory.name : ""}{" "}
          </Link>{" "}
        </li>
      );
    }
  }

  renderMenu() {
    return (
      <ul class="breadcrumbs">
        <li>
          <Link to="/">
            <i class="fa fa-home fa-btn" />
            Home{" "}
          </Link>{" "}
        </li>{" "}
        <li>
          <Link
            to={
              this.props.category
                ? `/categories/${this.props.category.key}`
                : ""
            }
          >
            {this.props.category ? this.props.category.name : ""}{" "}
          </Link>{" "}
        </li>{" "}
        {this.renderSubOfSubCategory()}{" "}
      </ul>
    );
  }

  renderFormDetail() {
    if (this.props.match.params.subOfSubCategoryId) {
      return (
        <div class="forum-details">
          <h1>
            {" "}
            {this.props.subOfSubCategory &&
              this.props.subOfSubCategory.name}{" "}
          </h1>{" "}
          <p class="text-lead">
            {" "}
            {this.props.subOfSubCategory &&
              this.props.subOfSubCategory.description}{" "}
          </p>{" "}
        </div>
      );
    } else {
      return (
        <div class="forum-details">
          <h1> {this.props.subCategory && this.props.subCategory.name} </h1>{" "}
          <p class="text-lead">
            {" "}
            {this.props.subCategory && this.props.subCategory.description}{" "}
          </p>{" "}
        </div>
      );
    }
  }

  renderCategorieOrNot() {
    if (
      this.props.match.params.subOfSubCategoryId ||
      !this.props.SubOfSubCategories
    )
      return null;

    return (
      <div class="col-full">
        <div class="category-item">
          <div class="forum-list">
            <h2 class="list-title">
              {this.props.subCategory && this.props.subCategory.name}{" "}
            </h2>{" "}
            {this.renderCategorie()}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }

  renderCategorie() {
    return (
      this.props.subCategory &&
      this.props.subCategory.forums &&
      Object.values(this.props.subCategory.forums).map(
        (subCategoryId, index) => {
          // console.log("index" + index);
          return (
            <div class="forum-listing">
              <SubCategory
                categoryId={
                  this.props.match.params && this.props.match.params.categoryId
                }
                subCategoryId={subCategoryId}
                subcategory={
                  this.props.subOfSubCategory &&
                  this.props.subOfSubCategory.name
                }
                infosubcategory={
                  this.props.subOfSubCategory &&
                  this.props.subOfSubCategory.description
                }
                subofsubcategoryboolean="true"
              />
              {/* {console.log(this.props.subOfSubCategory)} */}
              <ThreadCount forum={this.props.SubOfSubCategories[index]} />

              <LastThread
                postId={
                  this.props.SubOfSubCategories[index] &&
                  this.props.SubOfSubCategories[index].lastPostId &&
                  this.props.SubOfSubCategories[index].lastPostId
                }
                threadTitle="Post Reactions"
                threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
                threadAuthor="Rolf Haug"
                threadTime="a month ago"
              />
            </div>
          );
        }
      )
    );
  }
  render() {
    // this.props.subOfSubCategory && console.log(this.props.subOfSubCategory);

    return (
      <div className="container">
        <div class="col-full push-top">
          {this.renderMenu()}
          <div class="forum-header">
            {this.renderFormDetail()}
            {/* <a href="new-thread.html" class="btn-green btn-small">
              Start a thread{" "}
            </a>{" "} */}
          </div>{" "}
        </div>{" "}
        {this.renderCategorieOrNot()}
        <div class="col-full">
          <div class="thread-list">
            <h2 class="list-title"> Threads </h2>{" "}
            <div class="thread">
              <div>
                <p>
                  <a href="thread.html">
                    {" "}
                    How can I chop onions without crying ?{" "}
                  </a>{" "}
                </p>{" "}
                <p class="text-faded text-xsmall">
                  By <a href="profile.html"> Joseph Kerr </a>, yesterday.{" "}
                </p>{" "}
              </div>{" "}
              <div class="activity">
                <p class="replies-count"> 1 reply </p>{" "}
                <img
                  class="avatar-medium"
                  src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
                  alt=""
                />
                <div>
                  <p class="text-xsmall">
                    <a href="profile.html"> Bruce Wayne </a>{" "}
                  </p>{" "}
                  <p class="text-xsmall text-faded"> 2 hours ago </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div class="thread">
              <div>
                <p>
                  <a href="thread.html"> Wasabi vs horseraddish ? </a>{" "}
                </p>{" "}
                <p class="text-faded text-xsmall">
                  By <a href="profile.html"> Robin </a>, 8 hours ago{" "}
                </p>{" "}
              </div>{" "}
              <div class="activity">
                <p class="replies-count"> 3 replies </p>{" "}
                <img
                  class="avatar-medium"
                  src="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Fraynathan?alt=media&token=bd9a0f0e-60f2-4e60-b092-77d1ded50a7e"
                  alt=""
                />
                <span>
                  <a class="text-xsmall" href="profile.html">
                    Ray - Nathan James{" "}
                  </a>{" "}
                  <p class="text-faded text-xsmall"> 3 hours ago </p>{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div class="thread">
              <div>
                <p>
                  <a href="thread.html"> Multifilling </a>{" "}
                </p>{" "}
                <p class="text-faded text-xsmall">
                  By <a href="profile.html"> Ray - Nathan James </a>, 6 days ago{" "}
                </p>{" "}
              </div>{" "}
              <div class="activity">
                <p class="replies-count"> 1 reply </p>{" "}
                <img
                  class="avatar-medium"
                  src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
                  alt=""
                />
                <span>
                  <a class="text-xsmall" href="profile.html">
                    Bruce Wayne{" "}
                  </a>{" "}
                  <p class="text-faded text-xsmall"> 6 days ago </p>{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div class="thread">
              <div>
                <p>
                  <a href="thread.html"> Egg replacer for bread dough ? </a>{" "}
                </p>{" "}
                <p class="text-faded text-xsmall">
                  By <a href="profile.html"> Theodor Jackson </a>, 2 weeks ago{" "}
                </p>{" "}
              </div>{" "}
              <div class="activity">
                <p class="replies-count"> 1 reply </p>{" "}
                <img
                  class="avatar-medium"
                  src="http://icons.iconarchive.com/icons/designbolts/free-male-avatars/128/Male-Avatar-icon.png"
                  alt=""
                />
                <span>
                  <a class="text-xsmall" href="profile.html">
                    Theodor Jackson{" "}
                  </a>{" "}
                  <p class="text-faded text-xsmall"> 2 weeks ago </p>{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div class="thread">
              <div>
                <p>
                  <a href="thread.html">
                    Which is your favorite carbohydrate ? 🤓
                  </a>{" "}
                </p>{" "}
                <p class="text-faded text-xsmall">
                  By <a href="profile.html"> Ray - Nathan James </a>, 1 month
                  ago{" "}
                </p>{" "}
              </div>{" "}
              <div class="activity">
                <p class="replies-count"> 0 replies </p>{" "}
                <img
                  class="avatar-medium"
                  src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
                  alt=""
                />
                <span>
                  <a class="text-xsmall" href="profile.html">
                    Ray - Nathan James{" "}
                  </a>{" "}
                  <p class="text-faded text-xsmall"> 1 month ago </p>{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>

          <Pagination />
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const SubOfSubCategories = Object.keys(state.categories.subCategories)
    .map((keyName, i) => {
      if (
        state.categories.subCategories[keyName].parentId ===
        ownProps.match.params.subCategoryId
      )
        // if (state.categories.subCategories[keyName] !== undefined)
        // return "equal";

        return state.categories.subCategories[keyName];
    })
    .filter(Boolean);

  return {
    category:
      state.categories.categories && ownProps.match.params
        ? state.categories.categories[ownProps.match.params.categoryId]
        : null,
    subCategory:
      state.categories.subCategories && ownProps.match.params
        ? state.categories.subCategories[ownProps.match.params.subCategoryId]
        : null,
    subOfSubCategory:
      state.categories.subCategories && ownProps.match.params
        ? state.categories.subCategories[
            ownProps.match.params.subOfSubCategoryId
          ]
        : null,
    SubOfSubCategories:
      state.categories.subCategories &&
      !ownProps.match.params.subOfSubCategoryId
        ? SubOfSubCategories
        : null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId)),
    fetchSubCategoriesById: subCategoryId =>
      dispatch(fetchSubCategoriesById(subCategoryId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadList);
