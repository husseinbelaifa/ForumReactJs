import React from "react";

const NewThread = props => {
  return (
    <div class="container">
      <div class="col-full push-top">
        <h1>
          Create new thread in <em>{props.category}</em>
        </h1>

        <form action="">
          <div class="form-group">
            <label for="thread_title">Title:</label>
            <input
              type="text"
              id="thread_title"
              class="form-input"
              name="title"
            />
          </div>

          <div class="form-group">
            <label for="thread_content">Content:</label>
            <textarea
              id="thread_content"
              class="form-input"
              name="content"
              rows="8"
              cols="140"
            />
          </div>

          <div class="btn-group">
            <button class="btn btn-ghost">Cancel</button>
            <button class="btn btn-blue" type="submit" name="Publish">
              Publish{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewThread;
