import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronsLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(
      <button key={currentPage} className=" py-1 bg-blue-500 min-h-9 min-w-9 text-white rounded" onClick={() => onPageChange(currentPage)}>
        {currentPage}
      </button>
    );

    for (let i = 1; i <= 2; i++) {
      if (currentPage + i <= totalPages) {
        pageNumbers.push(
          <button key={currentPage + i} className=" py-1 bg-gray-200 min-h-9 min-w-9 hover:bg-gray-300 rounded" onClick={() => onPageChange(currentPage + i)}>
            {currentPage + i}
          </button>
        );
      }
    }

    if (currentPage + 3 < totalPages) {
      pageNumbers.push(
        <button key="ellipsis" className=" py-1 min-h-9 min-w-9" disabled>
          <MoreHorizontal className="h-5 w-5" />
        </button>
      );

      pageNumbers.push(
        <button key={totalPages} className=" py-1 bg-gray-200 min-h-9 min-w-9 hover:bg-gray-300 rounded" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center bg-white fixed bottom-0 py-2 left-0 w-full space-x-2 mt-4">
      <button className="p-2 bg-gray-200 hover:bg-gray-300 min-h-9 min-w-9 rounded" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      {currentPage > 2 && (
        <button className=" py-1 bg-gray-200 min-h-9 min-w-9 hover:bg-gray-300 rounded" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          1
        </button>
      )}
      {renderPageNumbers()}
      <button className="p-2 bg-gray-200 hover:bg-gray-300 min-h-9 min-w-9 rounded" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
