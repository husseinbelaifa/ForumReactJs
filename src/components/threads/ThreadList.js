import React from "react";
import Pagination from "../layout/Pagination";
import {
  fetchCategory,
  fetchSubCategoriesById
} from "../../store/actions/CategoryActions";
import {
  fetchThreadByForum,
  threadCount
} from "../../store/actions/ThreadAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SubCategory from "../categories/SubCategory";
import ThreadCount from "../threads/ThreadCount";
import LastThread from "../threads/LastThread";
import ShowThread from "../threads/ShowThread";
class ThreadList extends React.Component {
  state = {
    indexSubOfSubCategories: 0,
    currentPage: 1
  };
  componentDidMount() {
    //fetch Category

    console.log(this.props);
    this.props.fetchCategory(this.props.match.params.categoryId);
    this.props.fetchSubCategoriesById(this.props.match.params.subCategoryId);

    if (this.props.match.params.subOfSubCategoryId) {
      this.props.fetchSubCategoriesById(
        this.props.match.params.subOfSubCategoryId
      );
      //count number of thread

      this.props.threadCount(this.props.match.params.subOfSubCategoryId);
      //fetch all thread

      this.props.fetchThreadByForum(
        this.props.match.params.subOfSubCategoryId,
        this.state.currentPage,
        2
      );
    } else {
      this.props.fetchThreadByForum(
        this.props.match.params.subCategoryId,
        this.state.currentPage,
        2
      );

      this.props.threadCount(this.props.match.params.subCategoryId);
      //fetch all subofsubscategories

      this.props.subCategory &&
        this.props.subCategory.forums &&
        Object.values(this.props.subCategory.forums).map(subCategoryId => {
          this.props.fetchSubCategoriesById(subCategoryId);
        });
    }

    //fetch all subs of subscategories
  }

  receiveCurrentPage = currentPage => {
    // console.log(currentPage);
  };

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
              {" "}
              {this.props.subCategory ? this.props.subCategory.name : ""}{" "}
            </Link>{" "}
          </li>{" "}
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
              {" "}
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
            {" "}
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
            {" "}
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
              {" "}
              {this.props.subCategory && this.props.subCategory.name}{" "}
            </h2>{" "}
            {this.renderCategorie()}{" "}
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
                subofsubcategoryboolean="true"
                infosubcategory={
                  this.props.subOfSubCategory &&
                  this.props.subOfSubCategory.description
                }
                // subofsubcategoryboolean="true"
              />{" "}
              {/* {console.log(this.props.subOfSubCategory)} */}{" "}
              <ThreadCount forum={this.props.SubOfSubCategories[index]} />{" "}
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

  renderShowThread() {
    // console.log(this.props.threads);
    return (
      this.props.threads &&
      Object.keys(this.props.threads).map(keyName => {
        return (
          <ShowThread
            thread={this.props.threads && this.props.threads[keyName]}
            cateogry={this.props.category}
            subCategory={this.props.subCategory}
            subOfSubCategory={this.props.subOfSubCategory}
          />
        );
      })
    );
  }

  receiveCurrentPage = async currentPagination => {
    // console.log(currentPagination);
    if (currentPagination !== this.state.currentPage) {
      await this.setState({
        currentPage: currentPagination
      });
      // console.log(this.state.currentPage);
      // console.log("changing");
      if (this.props.match.params.subOfSubCategoryId) {
        //count number of thread

        this.props.fetchThreadByForum(
          this.props.match.params.subOfSubCategoryId,
          this.state.currentPage,
          2
        );
      } else {
        this.props.fetchThreadByForum(
          this.props.match.params.subCategoryId,
          this.state.currentPage,
          2
        );
      }

      console.log(this.props.threads);
    }
  };
  renderThread() {
    if (!this.props.threads) return null;
    return (
      <div class="col-full">
        <div class="thread-list">
          <h2 class="list-title"> Threads </h2> {this.renderShowThread()}{" "}
        </div>{" "}
        <Pagination
          numberOfThread={
            this.props.threadCountForum &&
            this.props.threadCountForum.threadCount
          }
          threadPerPage="2"
          currentPage={this.receiveCurrentPage}
        />{" "}
      </div>
    );
  }
  renderLinkNewThread() {
    if (this.props.auth)
      return (
        <Link
          className="btn-green btn-small"
          to={
            this.props.match.params.subOfSubCategoryId
              ? `/threads/${this.props.match.params.categoryId}/${
                  this.props.match.params.subCategoryId
                }/${this.props.match.params.subOfSubCategoryId}/create`
              : `/threads/${this.props.match.params.categoryId}/${
                  this.props.match.params.subCategoryId
                }/create`
          }
        >
          {" "}
          Start a thread{" "}
        </Link>
      );
  }
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div class="col-full push-top">
          {" "}
          {this.renderMenu()}{" "}
          <div class="forum-header">
            {" "}
            {this.renderFormDetail()} {this.renderLinkNewThread()}{" "}
          </div>{" "}
        </div>{" "}
        {this.renderCategorieOrNot()} {this.renderThread()}{" "}
        {/* <div class="col-full">
                                                    <div class="thread-list">
                                                      <h2 class="list-title"> Threads </h2>


                                                    </div>

                                                    <Pagination />
                                                  </div>{" "} */}{" "}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
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

  let threadCountForum = null;
  if (state.thread && !ownProps.match.params.subOfSubCategoryId) {
    threadCountForum = state.thread[ownProps.match.params.subCategoryId];
  } else if (state.thread && ownProps.match.params.subOfSubCategoryId) {
    threadCountForum = state.thread[ownProps.match.params.subOfSubCategoryId];
  }

  return {
    auth: state.firebase.auth.uid ? state.firebase.auth.uid : null,
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
        : null,

    threads: state.thread.threadCategorie ? state.thread.threadCategorie : null,
    threadCountForum: threadCountForum
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId)),
    fetchSubCategoriesById: subCategoryId =>
      dispatch(fetchSubCategoriesById(subCategoryId)),
    fetchThreadByForum: (forumId, currentPage, threadPerPage) =>
      dispatch(fetchThreadByForum(forumId, currentPage, threadPerPage)),
    threadCount: forumId => dispatch(threadCount(forumId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadList);
