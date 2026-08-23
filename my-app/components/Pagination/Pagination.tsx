import Link from "next/link";
import "./Pagination.css";
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
};

function getPages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

   return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  totalPages,
  limit,
}: PaginationProps) {
  const pages = getPages(currentPage, totalPages);

  return (
    <nav className="pagination">
      {currentPage === 1 ? (
        <span className="disabled">Previous</span>
      ) : (
        <Link href={`/articles?page=${currentPage - 1}&limit=${limit}`}>
          Previous
        </Link>
      )}

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`}>...</span>
        ) : page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            className="current-page"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={`/articles?page=${page}&limit=${limit}`}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage === totalPages ? (
        <span className="disabled">Next</span>
      ) : (
        <Link href={`/articles?page=${currentPage + 1}&limit=${limit}`}>
          Next
        </Link>
      )}
    </nav>
  );
}