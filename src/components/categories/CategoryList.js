import React from "react";
import Category from "./Category";
import SubCategory from "../categories/SubCategory";
import ThreadCount from "../threads/ThreadCount";
import LastThread from "../threads/LastThread";
import "../style.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchCategory,
  fetchSubCategoriesByCategoryId
} from "../../store/actions/CategoryActions";
class CategoryList extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
    this.props.fetchSubCategoriesByCategoryId(this.props.match.params.id);
  }
  render() {
    // console.log(this.props.category);
    return (
      <div className="container">
        <div className="col-full push-top">
          <h1> {this.props.category && this.props.category.name} </h1>{" "}
        </div>{" "}
        <div className="col-full">
          {" "}
          <div className="forum-list">
            <Category category={this.props.category && this.props.category} />

            {Object.keys(this.props.subCategories).map((keyName, i) => {
              // console.log(this.props.subCategories[keyName].categoryId);
              if (
                this.props.subCategories[keyName].categoryId ===
                this.props.match.params.id
              ) {
                return (
                  <div className="forum-listing">
                    <SubCategory
                      subcategory={this.props.subCategories[keyName].name}
                      infosubcategory={
                        this.props.subCategories[keyName].description
                      }
                      subsOfSubCategory={
                        this.props.subCategories[keyName].forums
                          ? Object.values(
                              this.props.subCategories[keyName].forums
                            )
                          : ""
                      }
                    />
                    <ThreadCount
                      forum={keyName ? this.props.subCategories[keyName] : ""}
                    />{" "}
                    <LastThread
                      postId={this.props.subCategories[keyName].lastPostId}
                      threadTitle="Post Reactions"
                      threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
                      threadAuthor="Rolf Haug"
                      threadTime="a month ago"
                    />
                  </div>
                );
              }
            })}
            {/* <div className="forum-listing">
                      <SubCategory
                        subcategory="Announcements"
                        infosubcategory="Important announcements about the forum."
                      />
                      <ThreadCount threadCount="1" />
                      <LastThread
                        threadTitle="Post Reactions"
                        threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
                        threadAuthor="Rolf Haug"
                        threadTime="a month ago"
                      />
                    </div>{" "}
                    <div className="forum-listing">
                      <SubCategory
                        subcategory="Announcements"
                        infosubcategory="Important announcements about the forum."
                      />
                      <ThreadCount threadCount="1" />
                      <LastThread
                        threadTitle="Post Reactions"
                        threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
                        threadAuthor="Rolf Haug"
                        threadTime="a month ago"
                      />
                    </div>
                    <div className="forum-listing">
                      <SubCategory
                        subcategory="Announcements"
                        infosubcategory="Important announcements about the forum."
                        subsOfSubCategory="Recipes"
                      />
                      <ThreadCount threadCount="1" />
                      <LastThread
                        threadTitle="Post Reactions"
                        threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
                        threadAuthor="Rolf Haug"
                        threadTime="a month ago"
                      />
                    </div>{" "} */}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category:
      state.categories.categories && ownProps.match.params
        ? state.categories.categories[ownProps.match.params.id]
        : null,

    subCategories: state.categories.subCategories
      ? state.categories.subCategories
      : null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId)),
    fetchSubCategoriesByCategoryId: categoryId =>
      dispatch(fetchSubCategoriesByCategoryId(categoryId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
