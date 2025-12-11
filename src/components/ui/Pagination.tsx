/*Copyright © 2025 Chili Labs. All rights reserved.*/

import type { JSX } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

/**
 * Reusable Pagination component for displaying page navigation controls.
 * @param currentPage - The current active page
 * @param totalPages - Total number of pages
 * @param onPageChange - Callback function when page changes
 * @returns JSX.Element | null: Pagination component or null if no pages
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): JSX.Element | null => {
  if (totalPages === 0) {
    return null;
  }

  const goToPrevious = (): void => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const goToNext = (): void => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="cl-pagination-button"
        aria-label="Go to previous page"
      >
        Prev
      </button>
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="cl-pagination-button"
        aria-label="Go to previous page"
      >
        Prev
      </button>
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cl-pagination-button
                                ${page === currentPage ? "active" : ""}
                                `}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className="cl-pagination-button"
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
