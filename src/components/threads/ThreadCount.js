import React from "react";
import "../style.css";
import { threadCount } from "../../store/actions/ThreadAction";
import { connect } from "react-redux";
class ThreadCount extends React.Component {
  componentDidMount() {
    this.props.forum && this.props.threadCount(this.props.forum.key);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forum !== this.props.forum) {
      nextProps.threadCount(nextProps.forum.key);
    }

    return nextProps.forum !== this.props.forum;
  }
  render() {
    // console.log(this.props.forum);
    return (
      <div class="threads-count">
        <p class="count">
          {" "}
          {/* {Object.keys(this.props.thread).length === 0 &&
                                                  this.props.thread.constructor === Object
                                                    ? console.log("empty")
                                                    : this.props.thread[this.props.forum.key].threadCount} */

          this.props.thread &&
            this.props.forum &&
            this.props.thread[this.props.forum.key] &&
            this.props.thread[this.props.forum.key].threadCount}{" "}
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
