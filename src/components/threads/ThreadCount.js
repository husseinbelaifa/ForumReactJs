import React from "react";
import "../style.css";
import { threadCount } from "../../store/actions/ThreadAction";
import { connect } from "react-redux";
class ThreadCount extends React.Component {
  componentDidMount() {
    this.props.threadCount(this.props.forum.key);
  }
  render() {
    return (
      <div class="threads-count">
        <p class="count">
          {/* {Object.keys(this.props.thread).length === 0 &&
                          this.props.thread.constructor === Object
                            ? console.log("empty")
                            : this.props.thread[this.props.forum.key].threadCount} */

          typeof this.props.thread[this.props.forum.key] === "undefined"
            ? console.log("undifined")
            : this.props.thread[this.props.forum.key].threadCount}{" "}
        </p>{" "}
        thread{" "}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    threadCount: forumId => dispatch(threadCount(forumId))
  };
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state);

  return {
    thread: state.thread
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadCount);
