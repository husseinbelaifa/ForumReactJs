import React from "react";
import Category from "./Category";
import SubCategory from "../categories/SubCategory";
import ThreadCount from "../threads/ThreadCount";
import LastThread from "../threads/LastThread";
import "../style.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories } from "../../store/actions/CategoryActions";
class CategoryList extends React.Component {
  componentDidMount() {
    console.log("fetching categories");
    this.props.fetchCategories();
  }
  render() {
    return (
      <div className="container">
        <div className="col-full push-top">
          <h1> Discussions </h1>{" "}
        </div>{" "}
        <div className="col-full">
          <div className="forum-list">
            <Category category="FeedbackInformation" />
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
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
};
const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  };
};

export default connect(
  mapDispatchToProps,
  mapDispatchToProps
)(CategoryList);
