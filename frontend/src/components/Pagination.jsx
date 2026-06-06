import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Show up to 5 page numbers
  const visiblePages = Math.min(totalPages, 5);
  const pages = Array.from({ length: visiblePages }, (_, i) => i);

  return (
    <div className="pagination-wrapper">
      <nav aria-label="URL list pagination">
        <ul className="pagination pagination-sm mb-0">
          {/* Previous */}
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button
              id="pagination-prev"
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              &laquo;
            </button>
          </li>

          {/* Page numbers */}
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
            >
              <button
                id={`pagination-page-${page + 1}`}
                className="page-link"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page + 1}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {String(page + 1).padStart(2, '0')}
              </button>
            </li>
          ))}

          {/* Next */}
          <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
            <button
              id="pagination-next"
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              aria-label="Next page"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
