import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (currentPage > 1) {
      pageNumbers.push(
        <button key={1} className="py-1 bg-gray-200 min-h-9 min-w-9 hover:bg-gray-300 rounded hidden lg:block" onClick={() => onPageChange(1)}>
          1
        </button>
      );
    }

    pageNumbers.push(
      <button key={currentPage} className="py-1 bg-blue-500 min-h-9 min-w-9 text-white rounded" onClick={() => onPageChange(currentPage)}>
        {currentPage}
      </button>
    );

    if (currentPage + 1 <= totalPages) {
      pageNumbers.push(
        <button key={currentPage + 1} className="py-1 bg-gray-200 min-h-9 min-w-9 hover:bg-gray-300 rounded hidden lg:block" onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage === 1 && totalPages > 3) {
      pageNumbers.push(
        <button key={currentPage + 2} className="py-1 bg-gray-200 min-h-9 min-w-9 hover:bg-gray-300 rounded hidden lg:block" onClick={() => onPageChange(currentPage + 2)}>
          {currentPage + 2}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <button key={totalPages} className="py-1 bg-gray-200 min-h-9 min-w-9 hover:bg-gray-300 rounded hidden lg:block" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button className="p-2 bg-gray-200 hover:bg-gray-300 min-h-9 min-w-9 rounded" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      {renderPageNumbers()}
      <button className="p-2 bg-gray-200 hover:bg-gray-300 min-h-9 min-w-9 rounded" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
