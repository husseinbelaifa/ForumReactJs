import React, { useState } from "react";

const Pagination = props => {
  const [currentPage, setCurrentPage] = useState(1);
  // props.threadPerPage
  // const [numberOfPage, setNumberOfPage] = useState(props.numberOfPage);
  // console.log(props);

  const numberOfPage =
    props.numberOfThread &&
    props.threadPerPage &&
    Math.ceil(props.numberOfThread / props.threadPerPage);

  const lastPage = currentPage === numberOfPage ? "disabled" : "";
  const firstPage = currentPage === 1 ? "disabled" : "";
  props.currentPage(currentPage);

  props.currentPage(currentPage);
  return (
    <div class="pagination">
      <button
        class="btn-circle"
        disabled={firstPage}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        <i class="fa fa-angle-left" />
      </button>{" "}
      {currentPage} of {numberOfPage}{" "}
      <button
        class="btn-circle"
        disabled={lastPage}
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        <i class="fa fa-angle-right" />
      </button>{" "}
    </div>
  );
};

export default Pagination;
