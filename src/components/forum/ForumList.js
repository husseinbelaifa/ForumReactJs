import React from "react";
import Category from "../categories/Category";
import SubCategory from "../categories/SubCategory";
import ThreadCount from "../threads/ThreadCount";

import LastThread from "../threads/LastThread";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchSubCategories
} from "../../store/actions/CategoryActions";

import { threadCount } from "../../store/actions/ThreadAction";

class ForumList extends React.Component {
  state = {
    subCategories: null
  };
  async componentDidMount() {
    await this.props.fetchCategories();

    await this.props.fetchSubCategories();

    await this.props.threadCount();
  }

  // shouldComponentUpdate(prevProps) {
  //   const categories = this.props.categories !== prevProps.categories;
  //   const subCategories = this.props.subCategories.length > 0;
  //   console.log("changed");
  //   console.log(this.state.subCategories);
  //   // console.log(this.props.subCategories.length);
  //   return categories;
  // }

  renderList() {
    return Object.keys(this.props.categories).map((keyname, i) => {
      return (
        <div class="forum-list">
          <Category category={this.props.categories[keyname].name} />

          {/* {this.renderSubCategories(keyname)} */}

          {this.renderSubCategories(keyname)}
        </div>
      );
    });
  }

  renderThreadCount(forums) {
    // console.log(forums);
    // return Object.keys(forums).map((keyname, i) => {
    //   console.log(forums[keyname]);
    //   return this.props.threadCount(forums[keyname]);
    // });
  }

  renderSubCategories(categoryId) {
    return Object.keys(this.props.subCategories).map((keyName, i) => {
      if (this.props.subCategories[keyName].categoryId === categoryId) {
        return (
          <div class="forum-listing">
            <SubCategory
              subcategory={this.props.subCategories[keyName].name}
              infosubcategory={this.props.subCategories[keyName].description}
            />{" "}
            {/* {this.props.threadCount(keyName)} */}
            {/* {console.log(this.props.threadCount)} */}{" "}
            <ThreadCount ThreadCount="1" />
            <LastThread
              threadTitle="Post Reactions"
              threadAuthorAvatar="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679"
              threadAuthor="Rolf Haug"
              threadTime="a month ago"
            />
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div class="container">
        <div class="col-full"> {this.renderList()} </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
    subCategories: state.categories.subCategories,
    threadCount: state.thread
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchSubCategories: () => dispatch(fetchSubCategories()),
    threadCount: () => dispatch(threadCount())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumList);
