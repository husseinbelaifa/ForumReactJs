import React from "react";

const Pagination = () => {
  return (
    <div class="pagination">
      <button class="btn-circle" disabled>
        <i class="fa fa-angle-left" />
      </button>
      1 of 3
      <button class="btn-circle">
        <i class="fa fa-angle-right" />
      </button>
    </div>
  );
};

export default Pagination;
